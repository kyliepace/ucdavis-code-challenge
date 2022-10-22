import { Title } from '../../titles/entities/title.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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
  @Column({
    type: 'text',
    nullable: true,
  })
  id: string;

  @Column('text')
  name: string;

  @Column({ nullable: true })
  character: string;

  @Column({ nullable: true })
  role: RoleEnum;

  @ManyToOne(() => Title, (title) => title.credits)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'id',
  })
  title: Title;
}
