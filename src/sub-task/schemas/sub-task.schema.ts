import * as mongoose from 'mongoose';
import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubTaskDocument = HydratedDocument<SubTask>;

@Schema()
export class SubTask {
    @Prop({required:true})
    name:string

    @Prop({required:true})
    description:string;

    @Prop()
    percentage:number;

    @Prop()
    weight:number;
}

export const subTaskSchema = SchemaFactory.createForClass(SubTask);
