import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Player } from '@/entities/player.entity';
import { Owner } from '@/entities/owner.entity';
import { League } from '@/entities/league.entity';
import { BaseEntity } from '@/entities/base.entity';

@Entity('clubs')
export class Club extends BaseEntity {
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
