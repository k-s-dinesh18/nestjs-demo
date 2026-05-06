import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log{
    @Prop()
    event!: string;

    @Prop({type: MongooseSchema.Types.Mixed})
    data!: any;

    @Prop({default: Date.now})
    date!: Date;
}

export const logSchema = SchemaFactory.createForClass(Log);