import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test/repository.mock';
import { Title } from './entities/title.entity';
import { TitlesService } from './titles.service';

describe('TitlesService', () => {
  let service: TitlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TitlesService,
        {
          provide: getRepositoryToken(Title),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TitlesService>(TitlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
