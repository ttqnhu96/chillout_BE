import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { NOTIFICATION_ACTION_ENUM, OBJECT_TYPE_ENUM } from "../../../common/constants/common.constant";

export class CreateNotificationRequest {
    @IsNotEmpty({message: 'Executor id is required'})
    @IsInt()
    @ApiProperty()
    executorId: number;

    @IsNotEmpty({message: 'Receiver id is required'})
    @IsInt()
    @ApiProperty()
    receiverId: number;

    @IsNotEmpty({message: 'Action is required'})
    @IsEnum(NOTIFICATION_ACTION_ENUM, { message: 'Action is invalid' })
    @ApiProperty()
    action: NOTIFICATION_ACTION_ENUM;

    @IsNotEmpty({message: 'Object type is required'})
    @IsEnum(OBJECT_TYPE_ENUM, { message: 'Object type is invalid' })
    @ApiProperty()
    objectType: OBJECT_TYPE_ENUM;

    @IsNotEmpty({message: 'Object id is required'})
    @IsInt()
    @ApiProperty()
    objectId: number;

    @IsNotEmpty({message: 'Message is required'})
    @IsString()
    @ApiProperty()
    message: string;
}