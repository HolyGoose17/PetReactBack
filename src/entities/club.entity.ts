import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Player } from './player.entity';
import { Owner } from './owner.entity';
import { League } from './league.entity';
import { SoftDeleteEntity } from './soft-delete.entity';

@Entity('clubs')
export class Club extends SoftDeleteEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Player, (player) => player.club)
  players: Player[];

  @ManyToOne(() => Owner, (owner) => owner.clubs, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @ManyToOne(() => League, (league) => league.clubs, { nullable: false })
  @JoinColumn({ name: 'league_id' })
  league: League;

  @Column({ type: 'varchar', length: 255 })
  logoPath: string;
}
