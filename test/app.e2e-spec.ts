import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/healthcheck (GET)', () => {
    return request(app.getHttpServer()).get('/healthcheck').expect(200);
  });

  describe('retrieves a show or movie by title', () => {
    const testTitle = 'taxi driver';

    it('returns a single title', () => {
      return request(app.getHttpServer())
        .get(`/titles/${testTitle}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(false);
          expect(res.body).toMatchObject({
            id: 'tm84618',
            title: 'Taxi Driver',
            type: 'MOVIE',
            description: expect.stringContaining('New York City'),
            release_year: 1976,
            age_certification: 'R',
            genres: ['drama', 'crime'],
            production_countries: ['US'],
          });
        });
    });

    it('accepts optional sort', () => {
      return request(app.getHttpServer())
        .get(`/titles/${testTitle}?sort=desc`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(false);
          expect(res.body).toMatchObject({
            id: 'tm248010',
            title: 'Taxi Driver',
            type: 'MOVIE',
            description: expect.stringContaining('Lagos'),
            release_year: 2015,
            genres: ['comedy', 'crime', 'drama'],
            production_countries: ['NG'],
          });
        });
    });
  });

  describe('retrieves list of actors and directors for a show or movie by title', () => {
    const testTitle = 'taxi driver';
    it('gets all actors and directors', () => {
      return request(app.getHttpServer())
        .get(`/credits/${testTitle}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toEqual(40);
          expect(res.body[0]).toMatchObject({
            person_id: expect.any(Number),
            id: expect.stringContaining(''),
            name: expect.stringContaining(''),
            role: 'ACTOR',
          });
        });
    });

    it('accepts optional filter on role', () => {
      const testRoleType = 'director';
      return request(app.getHttpServer())
        .get(`/credits/${testTitle}?role=${testRoleType}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toEqual(2);
          expect(res.body[0]).toMatchObject({
            person_id: expect.any(Number),
            id: expect.stringContaining(''),
            name: expect.stringContaining(''),
            role: 'DIRECTOR',
          });
        });
    });
  });

  describe('retrieves list of shows and movies by actor name', () => {
    const testActorName = 'John Cleese';
    it('gets all results for that actor', () => {
      return request(app.getHttpServer())
        .get(`/titles?actor=${testActorName}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toEqual(15);
          expect(res.body[0]).toMatchObject({
            age_certification: expect.stringContaining('PG'),
            description: expect.stringContaining('King Arthur'),
            genres: ['fantasy', 'action', 'comedy'],
            id: 'tm127384',
            type: 'MOVIE',
            imdb_id: expect.stringContaining(''),
            imdb_score: expect.any(Number),
            imdb_votes: expect.any(Number),
            production_countries: ['GB'],
            release_year: 1975,
            runtime: expect.any(Number),
            seasons: null,
            title: 'Monty Python and the Holy Grail',
            tmdb_popularity: expect.any(Number),
            tmdb_score: expect.any(Number),
          });
        });
    });

    it('can be filtered by type', () => {
      const testType = 'show';
      return request(app.getHttpServer())
        .get(`/titles?actor=${testActorName}&type=${testType}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toEqual(3);
          expect(res.body[0]).toMatchObject({
            age_certification: expect.stringContaining('TV-MA'),
            description: expect.stringContaining('Monty Python'),
            genres: ['comedy'],
            id: 'ts45948',
            type: 'SHOW',
            imdb_id: expect.stringContaining(''),
            imdb_score: expect.any(Number),
            imdb_votes: expect.any(Number),
            production_countries: [],
            release_year: 1972,
            runtime: expect.any(Number),
            seasons: 1,
            title: "Monty Python's Fliegender Zirkus",
            tmdb_popularity: expect.any(Number),
            tmdb_score: expect.any(Number),
          });
        });
    });
  });
});
