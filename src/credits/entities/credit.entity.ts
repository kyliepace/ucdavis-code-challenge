import { Entity, Column, PrimaryColumn } from 'typeorm';

enum RoleEnum {
  actor = 'ACTOR',
  director = 'DIRECTOR',
}

/**
 * Credit refers to an actor or a director associated with a movie or show
 */
@Entity()
export class Credit {
  @PrimaryColumn()
  person_id: number;

  // title id
  @Column('text')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  character: string;

  @Column()
  role: RoleEnum;
}
