import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateIf } from "class-validator";

export class GetRelationshipRequest {
    @IsNotEmpty({ message: 'User id is required' })
    @ApiProperty()
    userId: number;
}