# netflix via kaggle.com csv REST API

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


## Installation

- have node and ppnpm installed

```bash
$ ppnpm install
```

## Running the app


```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
# API will run on localhost:3000 and documentation will be available at localhost:3000/api

# production mode
$ pnpm run start:prod

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

```
