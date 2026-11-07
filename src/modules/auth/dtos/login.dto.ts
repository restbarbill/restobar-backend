import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@restobar.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin123*' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class PinLoginDto {
  @ApiProperty({ description: 'PIN numérico de 4 a 6 dígitos del empleado', example: '1234' })
  @IsString()
  @IsNotEmpty()
  pinCode: string;
}
