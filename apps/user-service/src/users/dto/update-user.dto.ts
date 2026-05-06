import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Roles } from "../schema/users.schema"

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    readonly name!: string;

    @IsOptional()
    @IsEnum(Roles, {message: 'Enter a valid role'})
    readonly role!: Roles;

    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsNumber()
    readonly age!: number;
}