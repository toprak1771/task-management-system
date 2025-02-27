import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create.project.dto";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    
}

export class UpdateProjectDtoTask {
    @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
    @IsNotEmpty()
    @IsMongoId()
    _id:string

    @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
    @IsNotEmpty()
    task_id:Types.ObjectId
}