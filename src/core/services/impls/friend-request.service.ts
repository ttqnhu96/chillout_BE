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
import { RELATIONSHIP_TYPE_ENUM } from "../../common/constants/common.constant";
import { RelationshipEntity } from "../../entities/relationship.entity";
import { IRelationshipRepository } from "../../repositories/irelationship.repository";

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

            //Save to Relationship table (record 1)
            let newRelationship1 = new RelationshipEntity;
            newRelationship1.userId = friendRequest.senderId;
            newRelationship1.friendId = friendRequest.receiverId;
            newRelationship1.type = RELATIONSHIP_TYPE_ENUM.FRIEND_REQUEST_SENDER; //Role of current user
            newRelationship1.friendRequestId = friendRequest.id;
            newRelationship1.isDeleted = false;
            await this._relationshipRepos.create(newRelationship1);

            //Save to Relationship table (record 2)
            let newRelationship2 = new RelationshipEntity;
            newRelationship2.userId = friendRequest.receiverId;
            newRelationship2.friendId = friendRequest.senderId;
            newRelationship2.type = RELATIONSHIP_TYPE_ENUM.FRIEND_REQUEST_RECEIVER; //Role of current user
            newRelationship2.friendRequestId = friendRequest.id;
            newRelationship2.isDeleted = false;
            await this._relationshipRepos.create(newRelationship2);

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
            const listFriendRequest = await this._friendRequestRepos.getReceivedFriendRequestList(request);
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
                return res.return(ErrorMap.E014.Code);
            }

            //Save to Friend Request table
            friendRequest.id = id;
            friendRequest.isAccepted = true;
            await this._friendRequestRepos.update(friendRequest);

            //Check relationship existence
            const relationship1 = await this._relationshipRepos.findOne({
                userId: friendRequest.receiverId,
                friendId: friendRequest.senderId,
                isDeleted: false
            });
            const relationship2 = await this._relationshipRepos.findOne({
                userId: friendRequest.senderId,
                friendId: friendRequest.receiverId,
                isDeleted: false
            });

            //Update relationship type to "FRIEND"
            if (relationship1) {
                relationship1.type = RELATIONSHIP_TYPE_ENUM.FRIEND;
            }
            await this._relationshipRepos.update(relationship1);

            if (relationship2) {
                relationship2.type = RELATIONSHIP_TYPE_ENUM.FRIEND;
            }
            await this._relationshipRepos.update(relationship2);

            return res.return(ErrorMap.SUCCESSFUL.Code, friendRequest);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * deleteFriendRequestById
     * @param id
     */
    async deleteFriendRequestById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Delete friend request by id ==============");
        const res = new ResponseDto();
        try {
            //Check comment existence
            const currentUserId = await this._commonUtil.getUserId();
            const friendRequest = await this._friendRequestRepos.findOne({
                id: id,
                isAccepted: false,
                isDeleted: false
            });
            if (!friendRequest) {
                return res.return(ErrorMap.E014.Code);
            }
            if(friendRequest.receiverId !== currentUserId && friendRequest.senderId !== currentUserId) {
                return res.return(ErrorMap.E014.Code);
            }

            //Delete friend request
            friendRequest.isDeleted = true;
            await this._friendRequestRepos.update(friendRequest);

            //Check relationship existence
            const relationship1 = await this._relationshipRepos.findOne({
                userId: friendRequest.receiverId,
                friendId: friendRequest.senderId,
                isDeleted: false
            });
            const relationship2 = await this._relationshipRepos.findOne({
                userId: friendRequest.senderId,
                friendId: friendRequest.receiverId,
                isDeleted: false
            });
            //Delete record in relationship table
            if (relationship1) {
                relationship1.isDeleted = true;
                await this._relationshipRepos.update(relationship1);
            }
            if (relationship2) {
                relationship2.isDeleted = true;
                await this._relationshipRepos.update(relationship2);
            }

            return res.return(ErrorMap.SUCCESSFUL.Code, friendRequest);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}