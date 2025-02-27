import { ApiProperty } from "@nestjs/swagger";

export class ProjectDto {
    @ApiProperty({ example: '60c72b2f9b1d4c001c8e4d46' })
  _id: string;

  @ApiProperty({ example: 'Project Name' })
  name: string;

  @ApiProperty({ example: 'Some description' })
  description: string;

  @ApiProperty({ example: 17.17 })
  percentage: number;

  @ApiProperty({ example: false })
  is_complete: boolean;

  @ApiProperty({ example: [] })
  tasks: string[];
}
