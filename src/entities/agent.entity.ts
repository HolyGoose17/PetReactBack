import { Column, Entity, OneToMany } from 'typeorm';
import { Player } from '@/entities/player.entity';
import { SoftDeleteEntity } from '@/entities/soft-delete.entity';

@Entity('agents')
export class Agent extends SoftDeleteEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Player, (player) => player.agent)
  players: Player[];
}
