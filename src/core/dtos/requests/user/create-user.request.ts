import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserRequest {
   
    @IsNotEmpty({message: 'Username is required'})
    @ApiProperty()
    username: string;

    @IsNotEmpty({message: 'Password is required'})
    @ApiProperty()
    password: string;
}