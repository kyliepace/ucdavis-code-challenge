import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { RoleEnum } from '../types';
import { CreditRolePipe } from './credits.pipe';
import { CreditsService } from './credits.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  // 2. Retrieve list of actors and directors for a show or movie by title.
  @Get(':title')
  @ApiQuery({
    name: 'role',
    required: false,
    enum: ['actor', 'director'],
    description: 'optional filter by role',
  })
  findByTitle(
    @Param('title') title: string,
    @Query('role', CreditRolePipe) role?: RoleEnum,
  ) {
    return this.creditsService.findMany(title, role);
  }
}
