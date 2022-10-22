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

  async findOne(title: string): Promise<Title> {
    return await this.titlesRepository
      .createQueryBuilder('titles')
      .where('LOWER(titles.title) = LOWER(:title)', { title })
      .getOne();
  }

  async findMany(name: string): Promise<Omit<Title, 'credits'>[]> {
    const titles = await this.titlesRepository
      .createQueryBuilder('titles')
      .leftJoinAndSelect('titles.credits', 'credits')
      .where('LOWER(credits.name) = LOWER(:name)', { name })
      .getMany();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return titles.map(({ credits, ...title }) => title);
  }
}
