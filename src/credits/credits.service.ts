import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credit } from './entities/credit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private creditsRepository: Repository<Credit>,
  ) {}

  async findMany(title: string): Promise<Omit<Credit, 'title'>[]> {
    const credits = await this.creditsRepository
      .createQueryBuilder('credits')
      .leftJoinAndSelect('credits.title', 'title')
      .where('LOWER(title.title) = LOWER(:title)', { title })
      .getMany();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return credits.map(({ title, ...credit }) => credit);
  }
}
