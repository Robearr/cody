DROP TABLE IF EXISTS cd_users;

CREATE TABLE cd_users (
  id    BIGINT SERIAL PRIMARY KEY NOT NULL,
  uuid VARCHAR(255)              NOT NULL,
  username VARCHAR(255)              NOT NULL,
  full_name VARCHAR(1000)              NOT NULL,
  email VARCHAR(1000)              NOT NULL
);