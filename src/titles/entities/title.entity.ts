import { Entity, Column, PrimaryColumn } from 'typeorm';

enum TypeEnum {
  movie = 'MOVIE',
  show = 'SHOW',
}

/**
 * Title refers to a movie or a show
 */
@Entity()
export class Title {
  @PrimaryColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  type: TypeEnum;

  @Column('text')
  description: string;

  @Column('int')
  release_year: number;

  @Column('text')
  age_certification: string;

  @Column('int')
  runtime: number;

  @Column('text')
  genres: string[];

  @Column('text')
  production_countries: string[];

  @Column('int')
  seasons: number;
}
