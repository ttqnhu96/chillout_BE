import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty} from "class-validator";

export class UpdateLikesRequest {
    @IsNotEmpty({message: 'Post id is required'})
    @ApiProperty()
    postId: number;
}