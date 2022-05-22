import { GetNotificationListByReceiverIdRequest } from "../dtos/requests/notification/get-notification-list-by-receiver-id.request";
import { IBaseRepository } from "./ibase.repository";

export interface INotificationRepository extends IBaseRepository {
    /**
     * getNotificationListByReceiverId
     * @param request
     */
    getNotificationListByReceiverId(request: GetNotificationListByReceiverIdRequest);
}
