import { ApiProperty } from "@nestjs/swagger";
import { IsEnum,  IsNotEmpty } from "class-validator";
import { LANGUAGE_ENUM } from "../../../common/constants/common.constant";

export class UpdateUserLanguageRequest {
    @IsNotEmpty({message: 'User id is required'})
    @ApiProperty()
    userId: number;

    @IsNotEmpty({message: 'Language is required'})
    @IsEnum(LANGUAGE_ENUM, { message: 'Language is invalid' })
    @ApiProperty()
    language: LANGUAGE_ENUM;
}