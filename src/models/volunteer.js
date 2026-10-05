import db from './db.js';

// Add a user as a volunteer for a project
const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
        RETURNING user_id, project_id
    `;

    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};

// Remove a user from a project
const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1
        AND project_id = $2
        RETURNING user_id, project_id
    `;

    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};

// Get all projects a user has volunteered for
const getUserVolunteers = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date
        FROM volunteer v
        JOIN service_project sp
            ON v.project_id = sp.project_id
        WHERE v.user_id = $1
        ORDER BY sp.project_date ASC
    `;

    const queryParams = [userId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// Check whether a user is already volunteering for a project
const isUserVolunteer = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM volunteer
        WHERE user_id = $1
        AND project_id = $2
    `;

    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0;
};

export {
    addVolunteer,
    removeVolunteer,
    getUserVolunteers,
    isUserVolunteer
};