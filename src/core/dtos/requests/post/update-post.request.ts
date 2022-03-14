import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";
import { PRIVACY_SETTING } from "../../../common/constants/common.constant";
import { UpdatePhotoInPostRequest } from "./update-photo-in-post.request";

export class UpdatePostRequest {
    @MaxLength(10000, { message: 'Content must be less than or equal to 10000 characters.' })
    @IsString()
    @ApiProperty()
    content: string;

    @IsNotEmpty({message: 'Privacy setting id is required'})
    @IsEnum(PRIVACY_SETTING, { message: 'Privacy setting id is invalid' })
    @ApiProperty()
    privacySettingId: PRIVACY_SETTING;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdatePhotoInPostRequest)
    @ApiProperty()
    photoList: UpdatePhotoInPostRequest[];
}