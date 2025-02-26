import { PartialType } from "@nestjs/mapped-types";
import { CreateSubTaskDto } from "./create.sub-task.dto";
import { IsOptional,IsMongoId } from "class-validator";

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto){
      @IsOptional()
      @IsMongoId()
      _id: string;
}