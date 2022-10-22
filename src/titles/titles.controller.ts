import { Controller, Get, Param, Query } from '@nestjs/common';
import { TitlesService } from './titles.service';

@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  // 1. Retrieve show or movie by title.
  @Get(':title')
  findOneByTitle(@Param('title') title: string) {
    return this.titlesService.findOne(title);
  }

  // 3. Retrieve list of shows and movies by actor name.
  @Get()
  findByActor(@Query() { actor }: { actor: string }) {
    return this.titlesService.findMany(actor);
  }
}
