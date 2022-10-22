import { Controller, Get, Param } from '@nestjs/common';
import { TitlesService } from './titles.service';

@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  // 1. Retrieve show or movie by title.
  @Get(':title')
  async findOne(@Param('title') title: string) {
    return await this.titlesService.findOne(title);
  }

  // 3. Retrieve list of shows and movies by actor name.
  @Get(':actor')
  findAll(@Param('actor') actor: string) {
    return this.titlesService.findAll(actor);
  }
}
