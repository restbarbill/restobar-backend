import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Carlos Mendoza' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'carlos@restobar.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Segura123*' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: 'PIN numérico rápido de 4 a 6 dígitos para cambio de mesero/cajero en terminal táctil',
    example: '1234',
  })
  @IsOptional()
  @IsString()
  @Length(4, 6)
  pinCode?: string;

  @ApiProperty({ enum: UserRole, default: UserRole.WAITER })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
