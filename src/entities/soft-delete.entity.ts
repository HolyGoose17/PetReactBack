import { DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';

export abstract class SoftDeleteEntity extends BaseEntity {
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
