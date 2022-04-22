import { Body, Controller, Inject, Logger, Param, Post, Put, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { IFriendRequestService } from "../services/ifriend-request.service";
import { CreateFriendRequestRequest } from "../dtos/requests/friend-request/create-friend-request.request";
import { GetReceivedFriendRequestListRequest } from "../dtos/requests/friend-request/get-received-friend-request-list.request";

@Controller(CONTROLLER_CONSTANTS.FRIEND_REQUEST)
@ApiTags(CONTROLLER_CONSTANTS.FRIEND_REQUEST)
export class FriendRequestController {
    public readonly _logger = new Logger(FriendRequestController.name);
    constructor(@Inject(SERVICE_INTERFACE.IFRIEND_REQUEST_SERVICE) private _friendRequestService: IFriendRequestService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create friend request' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async createFriendRequest(@Body() request: CreateFriendRequestRequest) {
        this._logger.log('========== Create friend request ==========');
        return await this._friendRequestService.createFriendRequest(request);
    }

    @Post(URL_CONSTANTS.GET_RECEIVED_FRIEND_REQUEST_LIST)
    @ApiOperation({ summary: 'Get received friend request list' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getCommentListByPostId(@Body() request: GetReceivedFriendRequestListRequest) {
        this._logger.log('========== Get received friend request list ==========');
        return await this._friendRequestService.getReceivedFriendRequestList(request);
    }

    @Put(URL_CONSTANTS.ACCEPT_FRIEND_REQUEST)
    @ApiOperation({ summary: 'Accept friend request' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async acceptFriendRequest(@Param('id') id: number) {
        this._logger.log('========== Accept friend request ==========');
        return await this._friendRequestService.acceptFriendRequest(id);
    }
}