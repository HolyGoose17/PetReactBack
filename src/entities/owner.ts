import {
  BaseEntity,
  Column,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club';

@Entity()
export class Owner extends BaseEntity {
  @PrimaryGeneratedColumn()
  ownerID: number;

  @Column('varchar')
  ownerName: string;

  @OneToMany(() => Club, (club) => club.ownerName)
  ownersName: Club[];
}
