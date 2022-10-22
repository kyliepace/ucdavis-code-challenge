import { Controller, Get, Param } from '@nestjs/common';
import { CreditsService } from './credits.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  // 2. Retrieve list of actors and directors for a show or movie by title.
  @Get(':title')
  findByTitle(@Param('title') title: string) {
    return this.creditsService.findMany(title);
  }
}
