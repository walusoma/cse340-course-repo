-- Drop table if it exists
DROP TABLE IF EXISTS organization;

-- Create Organization Table
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- Insert Sample Data
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- Verify Data
SELECT * FROM organization;



-- Service Project Table
CREATE TABLE IF NOT EXISTS service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);

-- Sample Service Projects
INSERT INTO service_project 
(organization_id, title, description, location, project_date)
VALUES
(1,'Community Park Cleanup','Clean and repair a neighborhood park.','Jinja','2026-09-20'),
(1,'Bridge Painting','Repaint a pedestrian bridge.','Jinja','2026-09-25'),
(1,'School Fence Repair','Repair fencing around a school.','Buwenge','2026-10-01'),
(1,'Water Tank Installation','Install a community water tank.','Iganga','2026-10-10'),
(1,'Roadside Tree Planting','Plant shade trees along roads.','Jinja','2026-10-18'),
(2,'Urban Garden Workshop','Teach urban gardening techniques.','Jinja','2026-09-22'),
(2,'Community Compost Day','Build compost stations.','Buwenge','2026-09-28'),
(2,'Seed Distribution','Give vegetable seeds to families.','Mayuge','2026-10-05'),
(2,'School Garden Setup','Create a school garden.','Jinja','2026-10-12'),
(2,'Harvest Festival','Celebrate local food production.','Jinja','2026-10-20'),
(3,'Food Drive','Collect food for families.','Jinja','2026-09-24'),
(3,'Hospital Visit','Visit patients with volunteers.','Jinja','2026-09-30'),
(3,'Youth Mentoring','Mentor local youth.','Buwenge','2026-10-08'),
(3,'Clothing Donation','Distribute donated clothing.','Kamuli','2026-10-15'),
(3,'Community Sports Day','Organize sports for children.','Jinja','2026-10-25');