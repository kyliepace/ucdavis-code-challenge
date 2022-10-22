import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { SortPipe } from '../sort.pipe';
import { SortEnum, TypeEnum } from '../types';
import { TitlesInterceptor, TitleInterceptor } from './titles.interceptor';
import { TitleTypePipe } from './titles.pipe';
import { TitlesService } from './titles.service';

@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  // 1. Retrieve show or movie by title.
  @Get(':title')
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['asc', 'desc'],
    description:
      'sort by release year. defaults to "asc" to return the oldest movie or show',
  })
  @UseInterceptors(TitleInterceptor)
  findOneByTitle(
    @Param('title') title: string,
    @Query('sort', SortPipe) sort?: SortEnum,
  ) {
    return this.titlesService.findOne(title, sort);
  }

  // 3. Retrieve list of shows and movies by actor name.
  @Get()
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['movie', 'show'],
    description: 'optional filter results by type',
  })
  @UseInterceptors(TitlesInterceptor)
  findByActor(
    @Query('actor') actor: string,
    @Query('type', TitleTypePipe) type?: TypeEnum,
  ) {
    return this.titlesService.findMany(actor, type);
  }
}
