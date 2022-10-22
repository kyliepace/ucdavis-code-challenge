import { PipeTransform, Injectable } from '@nestjs/common';
import { RoleEnum } from '../types';

@Injectable()
export class CreditRolePipe implements PipeTransform {
  transform(role?: string) {
    return role?.toUpperCase() as RoleEnum;
  }
}
