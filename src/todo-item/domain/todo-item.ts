import { TodoItemStatus } from '../../statuses/domain/todo-item-status';
import { ApiProperty } from '@nestjs/swagger';
import { PriorityEnum } from '../priority.enum';
import { TodoItemStatusEnum } from '../../statuses/statuses.enum';

const idType = Number;

export class TodoItem {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'My Todo Item',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'My Todo Item Description',
  })
  description: string | null;

  @ApiProperty({
    enum: PriorityEnum,
    example: PriorityEnum.Medium,
  })
  priority: PriorityEnum;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  tags: string[];

  @ApiProperty({
    enum: TodoItemStatusEnum,
    example: TodoItemStatusEnum.NotStart,
  })
  status: TodoItemStatusEnum;

  @ApiProperty({
    type: idType,
  })
  ownerId: number;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
