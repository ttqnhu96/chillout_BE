import { Inject, Injectable, Logger } from "@nestjs/common";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { CommonUtil } from "../../utils/common.util";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";
import { IFriendRequestService } from "../ifriend-request.service";
import { CreateFriendRequestRequest } from "../../dtos/requests/friend-request/create-friend-request.request";
import { IFriendRequestRepository } from "../../repositories/ifriend-request.repository";
import { GetReceivedFriendRequestListRequest } from "../../dtos/requests/friend-request/get-received-friend-request-list.request";
import { ORDER_BY } from "../../common/constants/common.constant";
import { RelationshipEntity } from "src/core/entities/relationship.entity";
import { IRelationshipRepository } from "src/core/repositories/irelationship.repository";

@Injectable()
export class FriendRequestService extends BaseService implements IFriendRequestService {
    private readonly _logger = new Logger(FriendRequestService.name);
    private _commonUtil: CommonUtil = new CommonUtil();
    constructor(@Inject(REPOSITORY_INTERFACE.IFRIEND_REQUEST_REPOSITORY) private _friendRequestRepos: IFriendRequestRepository,
        @Inject(REPOSITORY_INTERFACE.IRELATIONSHIP_REPOSITORY) private _relationshipRepos: IRelationshipRepository) {
        super(_friendRequestRepos);
        this._logger.log("============== Constructor FriendRequestService ==============");
    }

    /**
     * createFriendRequest
     * @param request
     */
    async createFriendRequest(request: CreateFriendRequestRequest): Promise<ResponseDto> {
        this._logger.log("============== Create friend request ==============");
        const res = new ResponseDto();
        try {
            //Check friend request existence
            const currentUserId = await this._commonUtil.getUserId();
            const checkedFriendRequest = await this._friendRequestRepos.findOne({
                senderId: currentUserId,
                receiverId: request.receiverId,
                isDeleted: false
            });
            if (checkedFriendRequest) {
                return res.return(ErrorMap.E013.Code);
            }

            //Save to Friend Request table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_FRIEND_REQUEST_MAPPING, request);
            dataMapper.senderId = currentUserId;
            dataMapper.isAccepted = false;
            dataMapper.isDeleted = false;

            const friendRequest = await this._friendRequestRepos.create(dataMapper);
            return res.return(ErrorMap.SUCCESSFUL.Code, friendRequest);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getReceivedFriendRequestList
     * @param request
     */
    async getReceivedFriendRequestList(request: GetReceivedFriendRequestListRequest): Promise<ResponseDto> {
        this._logger.log("============== Get friend request list by user id ==============");
        const res = new ResponseDto();
        try {
            //get friend request list
            const listFriendRequest = await this._friendRequestRepos.findByCondition(
                {
                    receiverId: request.receiverId,
                    isAccepted: false,
                    isDeleted: false
                },
                { createdAt: ORDER_BY.DESC });

            return res.return(ErrorMap.SUCCESSFUL.Code, listFriendRequest);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * acceptFriendRequest
     * @param id
     */
    async acceptFriendRequest(id: number): Promise<ResponseDto> {
        this._logger.log("============== Accept friend request ==============");
        const res = new ResponseDto();
        try {
            // Check friend request existence
            const currentUserId = await this._commonUtil.getUserId();
            const friendRequest = await this._friendRequestRepos.findOne({
                id: id,
                receiverId: currentUserId,
                isAccepted: false,
                isDeleted: false
            });
            if (!friendRequest) {
                return res.return(ErrorMap.E011.Code);
            }

            //Save to Friend Request table
            friendRequest.id = id;
            friendRequest.isAccepted = true;
            await this._friendRequestRepos.update(friendRequest);

            //Save to Relationship table
            let relationship = new RelationshipEntity;
            relationship.userId1 = friendRequest.receiverId;
            relationship.userId2 = friendRequest.senderId;
            await this._relationshipRepos.create(relationship);

            return res.return(ErrorMap.SUCCESSFUL.Code, friendRequest);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}