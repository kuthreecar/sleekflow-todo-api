import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

const idType = Number;

export class UserStatus {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'active',
  })
  name?: string;
}
