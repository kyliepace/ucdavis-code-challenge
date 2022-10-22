DROP TABLE titles;

CREATE TABLE titles (
  key SERIAL PRIMARY KEY,
  id TEXT,
  title TEXT,
  type TEXT,
  description TEXT,
  release_year INT,
  age_certification  TEXT,
  runtime INT,
  genres TEXT,
  production_countries TEXT,
  seasons REAL,
  imdb_id TEXT,
  imdb_score REAL,
  imdb_votes REAL,
  tmdb_popularity REAL,
  tmdb_score REAL
);

CREATE TABLE credits (
  key SERIAL PRIMARY KEY,
  person_id TEXT,
  id TEXT,
  name TEXT,
  character TEXT,
  role TEXT
);