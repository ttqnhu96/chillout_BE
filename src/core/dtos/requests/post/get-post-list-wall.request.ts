import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class GetPostListWallRequest {
    @IsNotEmpty({message: 'User id is required'})
    @ApiProperty()
    userId: number;

    @IsNotEmpty({message: 'Page index is required'})
    @ApiProperty()
    pageIndex: number;

    @IsNotEmpty({message: 'Page size is required'})
    @ApiProperty()
    pageSize: number;
}