import { Injectable } from '@nestjs/common';


@Injectable()
export class CreditsService {
  findMany(title: string) {
    return `retrieving actors and directors by title`;
  }

}
