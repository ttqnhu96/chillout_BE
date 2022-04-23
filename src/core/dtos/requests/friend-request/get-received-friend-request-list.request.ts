import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateIf } from "class-validator";

export class GetReceivedFriendRequestListRequest {
    @IsNotEmpty({message: 'Receiver id is required'})
    @ApiProperty()
    receiverId: number;

    @IsNotEmpty({message: 'Is paginated is required'})
    @ApiProperty()
    isPaginated: boolean;

    @ValidateIf(o => o.isPaginated)
    @IsNotEmpty({message: 'Page index is required'})
    @ApiProperty()
    pageIndex: number;

    @ValidateIf(o => o.isPaginated)
    @IsNotEmpty({message: 'Page size is required'})
    @ApiProperty()
    pageSize: number;
}