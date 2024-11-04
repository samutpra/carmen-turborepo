import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  id?: string;

  @ApiProperty({
    name: 'username',
  })
  username: string;
}

export class UserUpdateDto extends UserCreateDto {
  id: string;
}
