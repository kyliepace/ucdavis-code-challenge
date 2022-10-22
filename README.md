# netflix via kaggle.com csv REST API

## Solution:

I wanted to go ahead and use a database to handle this data, especially since it involves a join.

Instead of making us both spin up identical local databases, I created a remote postgres instance.

I used a REST framework to build 3 GET endpoints [documented with OpenAPI once you're up and running](http://localhost:3000/api):

`/titles/:title` returns a show or a movie by title.

- Defaults to returning the oldest match, but accepts an optional ?sort=desc query parameter that lets the user return the newest match

`/credits/:title` returns a list of actors and directors by show or movie title.

- Accepts an optional `?role=` query parameter that accepts either `actor` or `director` to let the user filter results by the person type.

`/titles?actor={name}` returns a list of shows and movies by the name of an actor.

Accepts an optional `?type=` query parameter that accepts either `movie` or `show` to let the user filter results.

## Installation

- have node (at least version 16) and ppnpm installed
- create a `.env` file based on `.env.example` file. You will need the postgres password that I will send by email.

```bash
$ ppnpm install
```

## Running the app

```bash
$ pnpm run start

# watch mode
$ pnpm run start:dev
# API will run on localhost:3000 and documentation will be available at localhost:3000/api

# production mode
$ pnpm run start:prod
```

Running the app makes 3 endpoints available (not counting the /healthcheck), as documented in swagger

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

```

I've also [set up github to run the tests from there](https://github.com/kyliepace/ucdavis-code-challenge/actions)

## Tools used

### [nestjs](docs.nestjs.com)

JavaScript framework that is all about dependency injection so testing and code organization becomes even easier, and encourages a good separation of controller/service code so that business logic can be isolated to one part of the codebase.

### REST framework

This API could be a good candidate for GraphQL if it is used by many different clients who each are interested in different aspects of the returned data - for example, client A searches for actors because they want to get an image of each actor, while client B searches for actors but only wants the name and age of each actor. GraphQL would be useful in that situation because the client could be in the driver's seat, so to speak, when it comes to controlling exactly what fields should be passed along to them. This could reduce the query demands and payload size for this API service.

However, the job description says that this position would be designing REST APIs, so this demo follows the REST framework. :)

### Typescript

To catch potential errors due to data typing early

### PostgreSQL

I could just read the data from the .csv files, but databases were literally designed for what I need here, and I'd rather avoid the tech debt.

### Typeorm

When working with SQL databases an ORM is especially useful. Typeorm works well with typescript and postgres so I chose it.
