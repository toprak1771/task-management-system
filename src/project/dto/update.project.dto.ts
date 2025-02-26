import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create.project.dto";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    
}

export class UpdateProjectDtoTask {
    @IsNotEmpty()
    @IsMongoId()
    _id:string

    @IsNotEmpty()
    task_id:Types.ObjectId
}