import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TodoItemDto {
  @ApiProperty({
    type: String,
    example: 'todoId',
  })
  @IsNotEmpty()
  id: string | number;
}
