import * as mongoose from 'mongoose';
import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from 'src/task/schemas/task.schema';

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

    @Prop({default:false})
    is_complete:boolean;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Task',required:true})
    task_id:Task
}

export const subTaskSchema = SchemaFactory.createForClass(SubTask);
