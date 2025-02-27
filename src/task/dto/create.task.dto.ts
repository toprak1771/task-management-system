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
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @IsOptional()
  @IsMongoId()
  _id: string;

  @ApiProperty({ example: 'Task Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Some description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 17.17 })
  @IsOptional()
  @IsNumber()
  percentage: number;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  is_complete: boolean;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
  @IsNotEmpty()
  @IsMongoId()
  project_id: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  subTasks: string[];
}
