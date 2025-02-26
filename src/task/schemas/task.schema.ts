import * as mongoose from 'mongoose';
import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SubTask } from 'src/sub-task/schemas/sub-task.schema';
import { Project } from 'src/project/schemas/project.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({required:true})
    name:string

    @Prop({required:true})
    description:string;

    @Prop({default:0})
    percentage:number;

    @Prop({required:true})
    weight:number;

    // @Prop({type:[mongoose.Schema.Types.ObjectId],ref:'SubTask'})
    // subTasks:mongoose.Types.ObjectId[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubTask' }] })
    subTasks: SubTask[];

    @Prop({default:false})
    is_complete:boolean;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Project",required:true})
    project_id:Project
}

export const taskSchema = SchemaFactory.createForClass(Task);
