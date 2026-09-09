import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Player } from './player';
import { Owner } from './owner';
import { League } from './league';

@Entity()
export class Club extends BaseEntity {
  @PrimaryGeneratedColumn()
  clubID: number;

  @Column('varchar')
  clubName: string;

  @OneToMany(() => Player, (player) => player.clubName)
  playersName: Player[];

  @ManyToOne(() => Owner, (owner) => owner.ownersName)
  @JoinColumn({ name: 'ownerNameOwnerID' })
  ownerName: Owner;

  @ManyToOne(() => League, (league) => league.leaguesName)
  @JoinColumn({ name: 'leagueNameLeagueID' })
  leagueName: League;

  @Column('varchar')
  pathLogo: string;

  @Column('varchar')
  pathLeague: string;
}
