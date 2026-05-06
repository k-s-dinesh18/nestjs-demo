import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Orders{
    @Prop({required: true})
    userId!: string;
    
    @Prop({required: true})
    product!: string;
    
    @Prop({required: true})
    amount!: number;
    
    @Prop({default: 'CREATED'})
    status!: string;
}

export const orderSchema = SchemaFactory.createForClass(Orders);