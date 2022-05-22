import { Inject, Injectable, Logger } from "@nestjs/common";
import { ORDER_BY } from "../../common/constants/common.constant";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";
import { INotificationService } from "../inotification.service";
import { INotificationRepository } from "src/core/repositories/inotification.repository";
import { GetNotificationListByReceiverIdRequest } from "../../dtos/requests/notification/get-notification-list-by-receiver-id.request";
import { CreateNotificationRequest } from "../../dtos/requests/notification/create-notification.request";

@Injectable()
export class NotificationService extends BaseService implements INotificationService {
    private readonly _logger = new Logger(NotificationService.name);
    constructor(@Inject(REPOSITORY_INTERFACE.INOTIFICATION_REPOSITORY) private _notificationRepos: INotificationRepository){
        super(_notificationRepos);
        this._logger.log("============== Constructor NotificationService ==============");
    }

    /**
     * getNotificationListByReceiverId
     * @param request
     */
    async getNotificationListByReceiverId(request: GetNotificationListByReceiverIdRequest): Promise<ResponseDto> {
        this._logger.log("============== Get notification list by receiver id ==============");
        const res = new ResponseDto();
        try {
            //get notification list
            const listNotification = await this._notificationRepos.getNotificationListByReceiverId(request);

            return res.return(ErrorMap.SUCCESSFUL.Code, listNotification);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * createNotification
     * @param request
     */
    async createNotification(request: CreateNotificationRequest): Promise<ResponseDto> {
        this._logger.log("============== Create notification ==============");
        const res = new ResponseDto();
        try {
            //Save to City table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_NOTIFICATION_MAPPING, request);
            dataMapper.isDeleted = false;
            const notification = await this._notificationRepos.create(dataMapper);
            return res.return(ErrorMap.SUCCESSFUL.Code, notification);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}