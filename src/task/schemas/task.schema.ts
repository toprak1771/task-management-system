import * as mongoose from 'mongoose';
import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SubTask } from 'src/sub-task/schemas/sub-task.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({required:true})
    name:string

    @Prop({required:true})
    description:string;

    @Prop()
    percentage:number;

    @Prop()
    weight:number;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'SubTask'})
    subTasks:SubTask[]
}

export const taskSchema = SchemaFactory.createForClass(Task);
