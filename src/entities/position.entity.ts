import { Column, Entity, OneToMany } from 'typeorm';
import { Player } from './player.entity';
import { BaseEntity } from './base.entity';

@Entity('positions')
export class Position extends BaseEntity {
  @Column({ type: 'varchar', length: 20, unique: true })
  name: string;

  @OneToMany(() => Player, (player) => player.position)
  players: Player[];
}
