import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsMongoId,
  IsBoolean,
} from "class-validator";
import { SubTask } from "src/sub-task/schemas/sub-task.schema";

export class CreateTaskDto {
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

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsMongoId()
  project_id: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  subTasks: string[];
}
