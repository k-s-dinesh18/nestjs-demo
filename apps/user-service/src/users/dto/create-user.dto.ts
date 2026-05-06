import { IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";
import { Roles } from "../../../../../libs/database/mongodb/schemas/users.schema"

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @IsNotEmpty()
    @IsEnum(Roles, {message: 'Enter a valid role'})
    readonly role!: Roles;
    
    @IsNotEmpty()
    @IsString()
    readonly email?: string;

    @IsNotEmpty()
    @IsNumber()
    readonly age!: number;
}