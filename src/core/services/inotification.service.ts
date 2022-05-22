import { CreateNotificationRequest } from "../dtos/requests/notification/create-notification.request";
import { GetNotificationListByReceiverIdRequest } from "../dtos/requests/notification/get-notification-list-by-receiver-id.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface INotificationService extends IBaseService {
    /**
     * getNotificationListByReceiverId
     * @param request
     */
    getNotificationListByReceiverId(request: GetNotificationListByReceiverIdRequest): Promise<ResponseDto>;

    /**
    * createNotification
    * @param request
    */
    createNotification(request: CreateNotificationRequest): Promise<ResponseDto>;
}