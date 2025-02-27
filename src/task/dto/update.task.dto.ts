import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create.task.dto";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}

export class UpdateTaskDtoSubTask {
    @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
    @IsNotEmpty()
    @IsMongoId()
    _id:string

    @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
    @IsNotEmpty()
    subTask_id:Types.ObjectId
}