import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Title } from './entities/title.entity';
import { Repository } from 'typeorm';
import { SortEnum, TypeEnum } from '../types';

@Injectable()
export class TitlesService {
  constructor(
    @InjectRepository(Title)
    private titlesRepository: Repository<Title>,
  ) {}

  async findOne(title: string, sort = SortEnum.asc): Promise<Title> {
    return await this.titlesRepository
      .createQueryBuilder('titles')
      .where('LOWER(titles.title) = LOWER(:title)', { title })
      .orderBy('release_year', sort)
      .getOne();
  }

  async findMany(
    name: string,
    type?: TypeEnum,
  ): Promise<Omit<Title, 'credits'>[]> {
    let where = 'LOWER(credits.name) = LOWER(:name)';
    if (type) {
      where = where.concat('AND titles.type = :type');
    }
    const query = this.titlesRepository
      .createQueryBuilder('titles')
      .leftJoinAndSelect('titles.credits', 'credits')
      .where(where, { name, type });

    const titles = await query.getMany();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return titles.map(({ credits, ...title }) => title);
  }
}
