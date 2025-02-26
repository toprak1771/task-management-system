import { IsNotEmpty,IsNumber,IsOptional,IsString,IsMongoId,IsBoolean } from "class-validator"


export class CreateSubTaskDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsOptional()
    @IsNumber()
    percentage:number;

    @IsNotEmpty()
    @IsNumber()
    weight:number;

    @IsOptional()
    @IsBoolean()
    is_complete: boolean;

    @IsNotEmpty()
    @IsMongoId()
    task_id:string;
}