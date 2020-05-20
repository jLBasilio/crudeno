DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO users (
  first_name,
  last_name,
  description
) VALUES
  ('Thomas', 'Shelby', 'Head of the Peaky Blinders'),
  ('Arthur', 'Shelby', 'Tommy''s red right hand'),
  ('John', 'Shelby', 'In charge of London'),
  ('Finn', 'Shelby', 'Runner boy'),
  ('Ada', 'Shelby-Thorne', 'Ex-communist'),
  ('Elizabeth', 'Gray', 'Company Treasurer');


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO crudeno;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to crudeno;
