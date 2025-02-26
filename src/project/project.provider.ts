import { Mongoose } from "mongoose";
import { projectSchema } from "./schemas/project.schema";

export const projectProviders = [
    {
        provide:'PROJECT_MODEL',
        useFactory:(mongoose:Mongoose) => mongoose.model('Project',projectSchema),
        inject:['DATABASE_CONNECTION']
    }
]