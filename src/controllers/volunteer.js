import {
    addVolunteer,
    removeVolunteer
} from '../models/volunteer.js';

// Add the logged-in user as a volunteer
const processVolunteer = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = parseInt(req.params.projectId);

    try {
        await addVolunteer(userId, projectId);

        req.flash('success', 'You are now volunteering for this project.');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error adding volunteer:', error);

        req.flash('error', 'Unable to volunteer for this project.');
        res.redirect(`/project/${projectId}`);
    }
};

// Remove the logged-in user as a volunteer
const processRemoveVolunteer = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = parseInt(req.params.projectId);

    try {
        await removeVolunteer(userId, projectId);

        req.flash('success', 'You are no longer volunteering for this project.');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error removing volunteer:', error);

        req.flash('error', 'Unable to remove your volunteer signup.');
        res.redirect(`/project/${projectId}`);
    }
};

export {
    processVolunteer,
    processRemoveVolunteer
};