import { PartialType } from "@nestjs/mapped-types";
import { CreateSubTaskDto } from "./create.sub-task.dto";
import { IsOptional,IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto){
      @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
      @IsOptional()
      @IsMongoId()
      _id: string;
}