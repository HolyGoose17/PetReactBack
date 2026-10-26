import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/entities/base.entity';
import { Player } from '@/entities/player.entity';

@Entity('positions')
export class Position extends BaseEntity {
  @Column({ type: 'varchar', length: 20, unique: true })
  name: string;

  @OneToMany(() => Player, (player) => player.position)
  players: Player[];
}
