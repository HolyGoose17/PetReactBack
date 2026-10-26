import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/entities/base.entity';
import { Player } from '@/entities/player.entity';

@Entity('agents')
export class Agent extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Player, (player) => player.agent)
  players: Player[];
}
