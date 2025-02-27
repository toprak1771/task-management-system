import { IsNotEmpty,IsNumber,IsOptional,IsString,IsMongoId,IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubTaskDto {
    @ApiProperty({ example: 'SubTask Name' })
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty({ example: 'Some description' })
    @IsNotEmpty()
    @IsString()
    description:string;

    @IsOptional()
    @IsNumber()
    percentage:number;

    @ApiProperty({ example: 2 })
    @IsNotEmpty()
    @IsNumber()
    weight:number;

    @ApiProperty({ example: false })
    @IsOptional()
    @IsBoolean()
    is_complete: boolean;

    @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
    @IsNotEmpty()
    @IsMongoId()
    task_id:string;
}