import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateCommentRequest {
    @IsNotEmpty({message: 'Content is required'})
    @IsString()
    @MaxLength(5000, { message: 'Content must be less than or equal to 5000 characters.' })
    @ApiProperty()
    content: string;
}