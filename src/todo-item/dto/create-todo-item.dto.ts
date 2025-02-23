import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsArray,
  IsDateString,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { TodoItemStatus } from '../../statuses/domain/todo-item-status';
import { PriorityEnum } from '../priority.enum';
import { Type } from 'class-transformer';
import { TodoItemStatusEnum } from '../../statuses/statuses.enum';

export class CreateTodoItemDto {
  @ApiProperty({
    type: String,
    example: 'My Todo Item',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
    example: 'My Todo Item Description',
  })
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiProperty({
    enum: PriorityEnum,
    example: PriorityEnum.High,
  })
  @IsEnum(PriorityEnum)
  priority: PriorityEnum;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  tags: string[];

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  media?: FileDto | null;

  @ApiProperty({
    enum: TodoItemStatusEnum,
    example: TodoItemStatusEnum.NotStart,
  })
  @IsEnum(TodoItemStatusEnum)
  status: TodoItemStatusEnum;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;
}
