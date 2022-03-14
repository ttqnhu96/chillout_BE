import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";
import { PRIVACY_SETTING } from "../../../common/constants/common.constant";

export class CreatePostRequest {
    @MaxLength(10000, { message: 'Content must be less than or equal to 10000 characters.' })
    @IsString()
    @ApiProperty()
    content: string;

    @IsNotEmpty({message: 'Privacy setting id is required'})
    @IsEnum(PRIVACY_SETTING, { message: 'Privacy setting id is invalid' })
    @ApiProperty()
    privacySettingId: PRIVACY_SETTING;

    @IsArray()
    @ApiProperty()
    photoList: string[];
}