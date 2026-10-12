import { Column, OneToMany, Entity } from 'typeorm';
import { Club } from '@/entities/club.entity';
import { SoftDeleteEntity } from '@/entities/soft-delete.entity';

@Entity('owners')
export class Owner extends SoftDeleteEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Club, (club) => club.owner)
  clubs: Club[];
}
