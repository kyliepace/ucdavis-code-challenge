import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credit } from './entities/credit.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from '../types';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private creditsRepository: Repository<Credit>,
  ) {}

  async findMany(
    title: string,
    role?: RoleEnum,
  ): Promise<Omit<Omit<Credit, 'title'>, 'key'>[]> {
    let where = 'LOWER(title.title) = LOWER(:title)';
    if (role) {
      where = where.concat('AND credits.role = :role');
    }
    const query = this.creditsRepository
      .createQueryBuilder('credits')
      .leftJoinAndSelect('credits.title', 'title')
      .where(where, { title, role });

    const credits = await query.getMany();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return credits?.map(({ title, key, ...credit }) => credit);
  }
}
