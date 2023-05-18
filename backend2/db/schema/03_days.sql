DROP TABLE IF EXISTS days CASCADE;

CREATE TABLE days (
  id SERIAL PRIMARY KEY NOT NULL,
  workout_id INTEGER UNIQUE REFERENCES workouts(id) ON DELETE CASCADE,
  date_actual date,
  is_empty boolean,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
