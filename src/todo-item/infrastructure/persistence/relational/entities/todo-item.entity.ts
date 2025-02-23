import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { TodoItemStatusEnum } from '../../../../../statuses/statuses.enum';
import { PriorityEnum } from '../../../../priority.enum';

@Entity({
  name: 'todo-item',
})
export class TodoItemEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: true })
  description: string | null;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({
    type: 'enum',
    enum: PriorityEnum,
    default: PriorityEnum.Medium,
  })
  priority: PriorityEnum;

  @Column({
    type: 'enum',
    enum: TodoItemStatusEnum,
    default: TodoItemStatusEnum.NotStart,
  })
  status: TodoItemStatusEnum;

  @Index()
  @Column({ type: String, nullable: false })
  ownerId: number;

  @CreateDateColumn()
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
