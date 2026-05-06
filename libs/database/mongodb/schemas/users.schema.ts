import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Roles{
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    INTERN = 'intern'
}


export type UserDocument = User & Document;

@Schema({
    timestamps: true
})

export class User{
    @Prop()
    name!: string;

    @Prop()
    age!: number;
    
    @Prop()
    email?: string;

    @Prop()
    role?: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);
