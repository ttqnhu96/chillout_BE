import { Body, Controller, Inject, Logger, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { CreateNotificationRequest } from "../dtos/requests/notification/create-notification.request";
import { GetNotificationListByReceiverIdRequest } from "../dtos/requests/notification/get-notification-list-by-receiver-id.request";
import { INotificationService } from "../services/inotification.service";

@Controller(CONTROLLER_CONSTANTS.NOTIFICATION)
@ApiTags(CONTROLLER_CONSTANTS.NOTIFICATION)
export class NotificationController {
    public readonly _logger = new Logger(NotificationController.name);
    constructor(@Inject(SERVICE_INTERFACE.INOTIFICATION_SERVICE) private _notificationService: INotificationService
    ) { }

    @Post(URL_CONSTANTS.GET_NOTIFICATION_LIST_BY_RECEIVER_ID)
    @ApiOperation({ summary: 'Get notification list' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    async getNotificationListByReceiverId(@Body() request: GetNotificationListByReceiverIdRequest) {
        this._logger.log('========== Get notification list ==========');
        return await this._notificationService.getNotificationListByReceiverId(request);
    }

    @Post()
    @ApiOperation({ summary: 'Create notification' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async createNotification(@Body() request: CreateNotificationRequest) {
        this._logger.log('========== Create notification ==========');
        return await this._notificationService.createNotification(request);
    }
}