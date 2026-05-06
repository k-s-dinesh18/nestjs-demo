import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class UserAuth{
    @Prop()
    name!: string;

    @Prop({unique: [true, 'Duplicate Email Id']})
    email?: string;

    @Prop()
    password!:string
}

export const AuthUserSchema = SchemaFactory.createForClass(UserAuth);