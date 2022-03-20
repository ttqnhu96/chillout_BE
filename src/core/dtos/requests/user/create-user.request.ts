import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, Matches, MaxLength } from "class-validator";
import { COMMON_CONSTANTS, GENDER_ENUM } from "../../../common/constants/common.constant";

export class CreateUserRequest {
    @IsNotEmpty({message: 'Username is required'})
    @MaxLength(30, { message: 'Username must be less than or equal to 30 characters.' })
    @Matches(COMMON_CONSTANTS.REGEX_USERNAME, { message: 'Username must contains only letters, numbers and underscores' })
    @ApiProperty()
    username: string;

    @IsNotEmpty({message: 'Password is required'})
    @ApiProperty()
    password: string;

    @IsNotEmpty({message: 'First name is required'})
    @MaxLength(255, { message: 'First name must be less than or equal to 255 characters.' })
    @ApiProperty()
    firstName: string;

    @IsNotEmpty({message: 'Last name is required'})
    @MaxLength(255, { message: 'Last name must be less than or equal to 255 characters.' })
    @ApiProperty()
    lastName: string;

    @IsNotEmpty({message: 'Birthday is required'})
    @ApiProperty()
    birthday: string;

    @IsNotEmpty({message: 'Gender is required'})
    @IsEnum(GENDER_ENUM, { message: 'Gender is invalid' })
    @ApiProperty()
    gender: GENDER_ENUM;
}