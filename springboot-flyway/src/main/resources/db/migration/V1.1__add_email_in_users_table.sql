ALTER TABLE users ADD COLUMN email varchar(100) NOT NULL;
ALTER TABLE users ADD CONSTRAINT uc_users_email UNIQUE (email);