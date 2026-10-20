import { Column, OneToMany, Entity } from 'typeorm';
import { Club } from '@/entities/club.entity';
import { BaseEntity } from '@/entities/base.entity';

@Entity('owners')
export class Owner extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Club, (club) => club.owner)
  clubs: Club[];
}
