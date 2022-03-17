import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetListUsersLikePostRequest {
    @IsNotEmpty({message: 'Post id is required'})
    @ApiProperty()
    postId: number;

    @IsNotEmpty({message: 'Page index is required'})
    @ApiProperty()
    pageIndex: number;

    @IsNotEmpty({message: 'Page size is required'})
    @ApiProperty()
    pageSize: number;
}