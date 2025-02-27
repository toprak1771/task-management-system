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
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
  @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
  @IsOptional()
  @IsMongoId()
  _id: string;

  @ApiProperty({ example: 'Project Name' })
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

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tasks: string[];
}
