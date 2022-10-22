import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * since data was dumped straight into database using typeorm definitions,
 * the arrays of strings were not cleaned as they ideally would be,
 * so I need to make them real arrays here.
 */
@Injectable()
export class TitleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          ...data,
          genres: parseStringedArray(data.genres),
          production_countries: parseStringedArray(data.production_countries),
        };
      }),
    );
  }
}

@Injectable()
export class TitlesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return [
          ...data.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ genres, production_countries, credits, ...item }) => ({
              ...item,
              genres: parseStringedArray(genres),
              production_countries: parseStringedArray(production_countries),
            }),
          ),
        ];
      }),
    );
  }
}

/**
 * convert "['value']" to ['value']
 */
function parseStringedArray(value: string): JSON {
  return JSON.parse(value.replace(/'/g, '"'));
}
