Although not needed if using the hosted postgres instance, this folder contains the inputs I used to set up the database.

To recreate, unzip the .csv files and change the synchronize value in `src/app.module.ts` from `false` to `true`. When the app is started, typeorm will create the tables in the connected database based on the entity definitions.

```
psql -h HOST -U USERNAME -d DB_NAME -f [PATH]/setup/database.sql

psql -h HOST -U USERNAME -d DB_NAME -c "\copy credits (person_id, id, name, character, role) from '[PATH]/setup/credits.csv' delimiter ',' csv header;"

psql -h HOST -U USERNAME -d DB_NAME -c "\copy titles (id, title, type, description, release_year, age_certification, runtime, genres, production_countries, seasons, imdb_id, imdb_score, imdb_votes, tmdb_popularity, tmdb_score) from '[PATH]/setup/titles.csv' delimiter ',' csv header;"
```
