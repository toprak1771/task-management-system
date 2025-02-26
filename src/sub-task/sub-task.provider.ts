import { Mongoose } from "mongoose";
import { subTaskSchema } from "./schemas/sub-task.schema";

export const subTaskProviders = [
    {
        provide:'SUBTASK_MODEL',
        useFactory:(mongoose:Mongoose) => mongoose.model('SubTask',subTaskSchema),
        inject:['DATABASE_CONNECTION']
    }
]