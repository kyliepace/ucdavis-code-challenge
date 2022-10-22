import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test/repository.mock';
import { Title } from './entities/title.entity';
import { TitlesController } from './titles.controller';
import { TitlesService } from './titles.service';

describe('TitlesController', () => {
  let controller: TitlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitlesController],
      providers: [
        TitlesService,
        {
          provide: getRepositoryToken(Title),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<TitlesController>(TitlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
