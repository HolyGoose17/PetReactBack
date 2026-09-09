import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club';

@Entity()
export class League extends BaseEntity {
  @PrimaryGeneratedColumn()
  leagueID: number;

  @Column('varchar')
  leagueName: string;

  @OneToMany(() => Club, (club) => club.leagueName)
  leaguesName: Club[];
}
