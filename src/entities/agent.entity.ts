import { Column, Entity, OneToMany } from 'typeorm';
import { Player } from '@/entities/player.entity';
import { BaseEntity } from '@/entities/base.entity';

@Entity('agents')
export class Agent extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Player, (player) => player.agent)
  players: Player[];
}
