import { IsArray, IsNotEmpty,IsNumber,IsOptional,IsString } from "class-validator"
import { Task } from "src/task/schemas/task.schema";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsOptional()
    @IsNumber()
    percentage:number;

    @IsOptional()
    @IsArray()
    tasks:Task[]

}