import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty} from "class-validator";

export class UpdateLikesRequest {
    @IsNotEmpty({message: 'Post id is required'})
    @ApiProperty()
    postId: number;

    @IsNotEmpty({message: 'Is like flag is required'})
    @IsBoolean()
    @ApiProperty()
    isLike: boolean; //like - true / unlike - false
}