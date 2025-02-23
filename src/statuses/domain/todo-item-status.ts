import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TodoItemStatus {
  @ApiProperty()
  @IsNumber()
  id: number | string;
}
