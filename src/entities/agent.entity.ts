import { Column, Entity, OneToMany } from 'typeorm';
import { Player } from './player.entity';
import { SoftDeleteEntity } from './soft-delete.entity';

@Entity('agents')
export class Agent extends SoftDeleteEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Player, (player) => player.agent)
  players: Player[];
}
