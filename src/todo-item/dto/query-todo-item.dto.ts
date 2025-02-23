import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { TodoItem } from '../domain/todo-item';
import { RoleDto } from '../../roles/dto/role.dto';
import { TodoItemStatus } from '../../statuses/domain/todo-item-status';
import { TodoItemStatusEnum } from '../../statuses/statuses.enum';
import { PriorityEnum } from '../priority.enum';

export class FilterTodoItemDto {
  @IsOptional()
  @Type(() => TodoItemStatus)
  status: TodoItemStatusEnum[] | null;

  @IsOptional()
  @Type(() => TodoItemStatus)
  priority: PriorityEnum[] | null;

  @IsOptional()
  @Type(() => TodoItemStatus)
  name: string;
}

export class SortTodoItemDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof TodoItem;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryTodoItemDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterTodoItemDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterTodoItemDto)
  filters?: FilterTodoItemDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortTodoItemDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortTodoItemDto)
  sort?: SortTodoItemDto[] | null;
}
