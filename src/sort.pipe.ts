import { PipeTransform, Injectable } from '@nestjs/common';
import { SortEnum } from './types';

@Injectable()
export class SortPipe implements PipeTransform {
  transform(sort?: string) {
    return sort?.toUpperCase() as SortEnum;
  }
}
