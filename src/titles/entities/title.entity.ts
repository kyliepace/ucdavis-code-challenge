import { Credit } from '../../credits/entities/credit.entity';
import { Entity, Column, OneToMany, JoinColumn, PrimaryColumn } from 'typeorm';

enum TypeEnum {
  movie = 'MOVIE',
  show = 'SHOW',
}

/**
 * Title refers to a movie or a show
 */
@Entity({ name: 'titles' })
export class Title {
  @PrimaryColumn('text')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  title: string;

  @Column('text')
  type: TypeEnum;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('int')
  release_year: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  age_certification: string;

  @Column('int')
  runtime: number;

  @Column('text')
  genres: string[];

  @Column('text')
  production_countries: string[];

  @Column({
    type: 'real',
    nullable: true,
  })
  seasons: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  imdb_id: string;

  @Column({
    type: 'real',
    nullable: true,
  })
  imdb_score: number;

  @Column({
    type: 'real',
    nullable: true,
  })
  imdb_votes: number;

  @Column({
    type: 'real',
    nullable: true,
  })
  tmdb_popularity: number;

  @Column({
    type: 'real',
    nullable: true,
  })
  tmdb_score: number;

  @OneToMany(() => Credit, (credit) => credit.title, { cascade: true })
  credits: Credit[];
}
