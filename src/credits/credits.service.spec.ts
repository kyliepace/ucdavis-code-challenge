import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleEnum } from '../types';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../../test/repository.mock';
import { CreditsService } from './credits.service';
import { Credit } from './entities/credit.entity';

describe('CreditsService', () => {
  let service: CreditsService;
  let database: Repository<Credit>;
  const testTitle = 'goodfellas';

  beforeEach(async () => {
    const repositoryService = getRepositoryToken(Credit);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditsService,
        {
          provide: repositoryService,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<CreditsService>(CreditsService);
    database = module.get<Repository<Credit>>(repositoryService);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findMany', () => {
    describe('no type argument provided', () => {
      it('queries only on title', async () => {
        await service.findMany(testTitle);
        expect(database.createQueryBuilder().where).toBeCalledWith(
          expect.stringContaining('title.title'),
          expect.objectContaining({}),
        );
        expect(database.createQueryBuilder().where).not.toBeCalledWith(
          expect.stringContaining('AND credits.role'),
        );
      });
      it('returns an array', async () => {
        const results = await service.findMany(testTitle);
        expect(Array.isArray(results)).toBe(true);
      });
    });

    describe('type argument provided', () => {
      beforeAll(() => jest.clearAllMocks());
      it('includes query on type if argument provided', async () => {
        const type = RoleEnum.actor;
        await service.findMany(testTitle, type);
        expect(database.createQueryBuilder().where).toBeCalledWith(
          expect.stringContaining('AND credits.role'),
          expect.objectContaining({}),
        );
      });
    });
  });
});
