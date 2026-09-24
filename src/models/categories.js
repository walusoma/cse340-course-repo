import db from './db.js';

// Get all categories
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;
    const result = await db.query(query);
    return result.rows;
};

// Get single category details
const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Get categories for a specific service project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT 
            c.category_id, 
            c.name
        FROM public.category c
        JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

// Assign one category to one project
const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

// Replace all category assignments for a project
const updateCategoryAssignments = async (projectId, categoryIds) => {
    // Remove existing assignments
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    // Add the selected categories back
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

// Create a new category
const createCategory = async (name) => {
    const query = `
        INSERT INTO public.category (name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const result = await db.query(query, [name]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};

// Update an existing category
const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE public.category
        SET name = $1
        WHERE category_id = $2
        RETURNING *;
    `;

    const result = await db.query(query, [name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    return result.rows[0];
};

export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
};