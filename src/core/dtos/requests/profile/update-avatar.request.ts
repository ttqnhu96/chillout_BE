import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Min } from "class-validator";

export class UpdateAvatarRequest {
    @IsNotEmpty({message: 'Profile id is required'})
    @ApiProperty()
    profileId: number;

    @IsNotEmpty({message: 'Avatar is required'})
    @IsString()
    @ApiProperty()
    avatar: string;
}