import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Matches, MaxLength, Min } from "class-validator";
import { COMMON_CONSTANTS, GENDER_ENUM } from "../../../common/constants/common.constant";

export class UpdateProfileRequest {
    @IsNotEmpty({message: 'First name is required'})
    @MaxLength(255, { message: 'First name must be less than or equal to 255 characters.' })
    @ApiProperty()
    firstName: string;

    @IsNotEmpty({message: 'Last name is required'})
    @MaxLength(255, { message: 'Last name must be less than or equal to 255 characters.' })
    @ApiProperty()
    lastName: string;

    @IsNotEmpty({message: 'Gender is required'})
    @IsEnum(GENDER_ENUM, { message: 'Gender is invalid' })
    @ApiProperty()
    gender: GENDER_ENUM;

    @IsNotEmpty({message: 'Birthday is required'})
    @ApiProperty()
    birthday: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @Matches(COMMON_CONSTANTS.REGEX_EMAIL, { message: 'Email is invalid' })
    @ApiProperty()
    email: string;

    @MaxLength(150, { message: 'Bio must be less than or equal to 150 characters.' })
    @ApiProperty()
    bio: string;

    @ApiProperty()
    @IsInt()
    cityId: number;

    @ApiProperty()
    @IsInt()
    schoolId: number;

    @ApiProperty()
    @IsInt()
    collegeId: number;

    @ApiProperty()
    @IsInt()
    workplaceId: number;
}