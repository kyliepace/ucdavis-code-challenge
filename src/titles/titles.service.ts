import { Injectable } from '@nestjs/common';

@Injectable()
export class TitlesService {
  findOne(title: string) {
    return `find Title by title`;
  }

  findAll(actor: string) {
    return `find Titles by actor`;
  }
}
