import * as mongoose from 'mongoose';
import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from 'src/task/schemas/task.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
    @Prop({required:true})
    name:string

    @Prop({required:true})
    description:string;

    @Prop({default:0})
    percentage:number;

    // @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Task' })
    // tasks:mongoose.Types.ObjectId[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
    tasks: Task[];

    @Prop({default:false})
    is_complete:boolean;

    @Prop()
    files:[]
}

export const projectSchema = SchemaFactory.createForClass(Project);