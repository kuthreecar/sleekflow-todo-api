import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTodoItemDto } from './create-todo-item.dto';

import { IsArray, IsDateString, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';

import { TodoItemStatusEnum } from '../../statuses/statuses.enum';
import { PriorityEnum } from '../priority.enum';

export class UpdateTodoItemDto extends PartialType(CreateTodoItemDto) {
  @ApiPropertyOptional({
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

  @ApiPropertyOptional({
    enum: PriorityEnum,
    example: PriorityEnum.High,
  })
  @IsEnum(PriorityEnum)
  priority: PriorityEnum;

  @ApiPropertyOptional({
    type: [String],
  })
  @IsArray()
  tags: string[];

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  media?: FileDto | null;

  @ApiPropertyOptional({
    enum: TodoItemStatusEnum,
    example: TodoItemStatusEnum.NotStart,
  })
  @IsEnum(TodoItemStatusEnum)
  status: TodoItemStatusEnum;

  @ApiPropertyOptional()
  @IsDateString()
  dueDate: Date;
}
