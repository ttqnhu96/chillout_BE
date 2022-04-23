import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateIf } from "class-validator";

export class GetRelationshipRequest {
    @IsNotEmpty({message: 'User id 1 is required'})
    @ApiProperty()
    userId1: number;

    @IsNotEmpty({message: 'User id 2 is required'})
    @ApiProperty()
    userId2: number;
}