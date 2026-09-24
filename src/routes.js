import express from 'express';
import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

// Organizations
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Routes to handle assigning categories to a project
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Edit Organization
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Edit Project
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Categories
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Create Category
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);

// Edit Category
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// Service Projects
router.get('/projects', showProjectsPage);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/project/:id', showProjectDetailsPage);

// Testing & Error handling
router.get('/test-error', testErrorPage);

export default router;