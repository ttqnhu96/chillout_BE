import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdatePhotoInPostRequest {
    @IsInt()
    @ApiProperty()
    id: number;

    @IsNotEmpty({message: 'File name is required'})
    @ApiProperty()
    fileName: string;

    @IsNotEmpty({message: 'Is deleted flag is required'})
    @ApiProperty()
    isDeleted: boolean;
}