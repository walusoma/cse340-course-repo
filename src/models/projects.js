import db from './db.js';

// Get all projects
const getAllProjects = async () => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o ON sp.organization_id = o.organization_id
        ORDER BY sp.project_date;
    `;
    const result = await db.query(query);
    return result.rows;
};

// Get projects by organization ID
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date AS date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY project_date;
    `;
    const result = await db.query(query, [organizationId]);
    return result.rows;
};

// Get upcoming projects
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1;
    `;
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

// Get single project details by ID
const getProjectDetails = async (id) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// NEW: Get all service projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT 
            sp.project_id, 
            sp.title, 
            sp.description, 
            sp.project_date AS date, 
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        JOIN public.project_category pc ON sp.project_id = pc.project_id
        JOIN public.organization o ON sp.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY sp.project_date;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
};

const updateProject = async (
    projectId,
    title,
    description,
    location,
    projectDate,
    organizationId
) => {
    const query = `
        UPDATE public.service_project
        SET
            title = $1,
            description = $2,
            location = $3,
            project_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING *;
    `;

    const values = [
        title,
        description,
        location,
        projectDate,
        organizationId,
        projectId
    ];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
        throw new Error("Project not found.");
    }

    return result.rows[0];
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO public.service_project (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByCategoryId,
    createProject,
    updateProject
};