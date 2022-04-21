import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateIf } from "class-validator";

export class CreateFriendRequestRequest {
    @IsNotEmpty({message: 'Receiver id is required'})
    @ApiProperty()
    receiverId: number;
}