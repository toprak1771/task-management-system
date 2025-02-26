import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsMongoId,
  IsBoolean,
} from "class-validator";
import { Task } from "src/task/schemas/task.schema";

export class CreateProjectDto {
  @IsOptional()
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  percentage: number;

  @IsOptional()
  @IsBoolean()
  is_complete: boolean;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tasks: string[];
}
