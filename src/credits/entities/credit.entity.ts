import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum RoleEnum {
  actor = 'ACTOR',
  director = 'DIRECTOR',
}

/**
 * Credit refers to an actor or a director associated with a movie or show
 */
@Entity({ name: 'credits' })
export class Credit {
  @PrimaryGeneratedColumn()
  key: number;

  @Column({ nullable: true })
  person_id: number;

  // title id
  @Column('text')
  id: string;

  @Column('text')
  name: string;

  @Column({ nullable: true })
  character: string;

  @Column({ nullable: true })
  role: RoleEnum;
}
