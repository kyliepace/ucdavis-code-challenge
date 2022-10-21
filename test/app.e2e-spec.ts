import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/healthcheck (GET)', () => {
    return request(app.getHttpServer()).get('/healthcheck').expect(200);
  });

  it('Retrieves show or movie by title', () => {
    const testTitle = 'unknown movie title';
    return request(app.getHttpServer()).get(`/titles/${testTitle}`).expect(200);
  });

  it('Retrieves list of actors and directors for a show or movie by title', () => {
    const testTitle = 'unknown movie title';

    return request(app.getHttpServer())
      .get(`/credits/${testTitle}`)
      .expect(200);
  });

  it('Retrieve list of shows and movies by actor name', () => {
    const testActorName = 'some actor';

    return request(app.getHttpServer())
      .get(`/titles/${testActorName}`)
      .expect(200);
  });
});
