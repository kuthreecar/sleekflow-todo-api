import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'todo-item-status',
})
export class TodoItemStatusEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
