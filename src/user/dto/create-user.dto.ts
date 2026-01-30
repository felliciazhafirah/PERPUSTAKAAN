import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    MinLength,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsInt()
    memberId?: number;
}