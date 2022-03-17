import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCityRequest {
    @IsNotEmpty({message: 'Name is required'})
    @IsString()
    @MaxLength(255, { message: 'Name must be less than or equal to 255 characters.' })
    @ApiProperty()
    name: string;
}