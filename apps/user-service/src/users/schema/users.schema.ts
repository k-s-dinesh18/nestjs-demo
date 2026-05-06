import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Roles{
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    INTERN = 'intern'
}
@Schema({
    timestamps: true
})

export class Users{
    @Prop()
    name!: string;

    @Prop()
    age!: number;
    
    @Prop()
    email?: string;

    @Prop()
    role?: Roles;
}

export const userSchema = SchemaFactory.createForClass(Users);
