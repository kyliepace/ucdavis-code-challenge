import { PipeTransform, Injectable } from '@nestjs/common';
import { TypeEnum } from '../types';

@Injectable()
export class TitleTypePipe implements PipeTransform {
  transform(type?: string) {
    return type?.toUpperCase() as TypeEnum;
  }
}
