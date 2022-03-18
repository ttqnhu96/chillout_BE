import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SearchRequest {
    @IsString()
    @ApiProperty()
    attribute: string;

    @IsNotEmpty({message: 'Page index is required'})
    @ApiProperty()
    pageIndex: number;

    @IsNotEmpty({message: 'Page size is required'})
    @ApiProperty()
    pageSize: number;
}