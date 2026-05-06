import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto{
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    product!: string;

    @IsNumber()
    @IsNotEmpty()
    amount!: number;
}