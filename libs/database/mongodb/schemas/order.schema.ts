import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order{
    @Prop({required: true})
    userId!: string;
    
    @Prop({required: true})
    product!: string;
    
    @Prop({required: true})
    amount!: number;
    
    @Prop({default: 'CREATED'})
    status!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);