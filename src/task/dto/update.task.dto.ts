import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create.task.dto";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}

export class UpdateTaskDtoSubTask {
    @IsNotEmpty()
    @IsMongoId()
    _id:string

    @IsNotEmpty()
    subTask_id:Types.ObjectId
}