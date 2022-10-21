import { Controller, Get, Param } from '@nestjs/common';
import { TitlesService } from './titles.service';

@Controller('Titles')
export class TitlesController {
  constructor(private readonly TitlesService: TitlesService) {}

  // 1. Retrieve show or movie by title.
  @Get(':title')
  findOne(@Param('title') title: string) {
    return this.TitlesService.findOne(title);
  }

  // 3. Retrieve list of shows and movies by actor name.
  @Get(':actor')
  findAll(@Param('actor') actor: string) {
    return this.TitlesService.findAll(actor);
  }
}
