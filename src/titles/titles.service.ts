import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Title } from './entities/title.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TitlesService {
  constructor(
    @InjectRepository(Title)
    private titlesRepository: Repository<Title>,
  ) {}

  findOne(title: string): Promise<Title> {
    return this.titlesRepository
      .createQueryBuilder('titles')
      .where('LOWER(titles.title) = LOWER(:title)', { title })
      .getOne();
  }

  findAll(actor: string) {
    return `find Titles by actor`;
  }
}
