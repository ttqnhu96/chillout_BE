import { Inject, Injectable, Logger } from "@nestjs/common";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { IProfileService } from "../iprofile.service";
import { IProfileRepository } from "../../repositories/iprofile.repository";
import { UpdateProfileRequest } from "../../dtos/requests/profile/update-profile.request";
import { IUserRepository } from "../../repositories/iuser.repository";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";
import { CommonUtil } from "../../utils/common.util";
import { UpdateAvatarRequest } from "../../dtos/requests/profile/update-avatar.request";
import { SearchRequest } from "../../dtos/requests/common/search.request";
import { IRelationshipRepository } from "../../repositories/irelationship.repository";
import { IFriendRequestRepository } from "../../repositories/ifriend-request.repository";
import { FirebaseUploadFileUtil } from "../../utils/firebase/firebase-upload-file.util";

@Injectable()
export class ProfileService extends BaseService implements IProfileService {
    private readonly _logger = new Logger(ProfileService.name);
    private _commonUtil: CommonUtil = new CommonUtil();
    constructor(@Inject(REPOSITORY_INTERFACE.IPROFILE_REPOSITORY) private _profileRepos: IProfileRepository,
        @Inject(REPOSITORY_INTERFACE.IUSER_REPOSITORY) private _userRepos: IUserRepository,
        @Inject(REPOSITORY_INTERFACE.IRELATIONSHIP_REPOSITORY) private _relationshipRepos: IRelationshipRepository,
        @Inject(REPOSITORY_INTERFACE.IFRIEND_REQUEST_REPOSITORY) private _friendRequestRepos: IFriendRequestRepository,
        private _uploadFileUtil: FirebaseUploadFileUtil) {
        super(_profileRepos);
        this._logger.log("============== Constructor ProfileService ==============");
    }

    /**
     * getProfileById
     * @param id
     */
    async getProfileById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Get profile by id ==============");
        const res = new ResponseDto();
        try {
            // Check profile existence
            const profile = await this._profileRepos.findOne(id);
            if (!profile) {
                return res.return(ErrorMap.E007.Code);
            }
            return res.return(ErrorMap.SUCCESSFUL.Code, profile);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getProfileDetailByUserId
     * @param userId
     */
    async getProfileDetailByUserId(userId: number): Promise<ResponseDto> {
        this._logger.log("============== Get profile detail by user id ==============");
        const res = new ResponseDto();
        try {
            // Get profile detail
            const profile = await this._profileRepos.getProfileDetailByUserId(userId);
            if (!profile) {
                return res.return(ErrorMap.E007.Code);
            }
            
            let result = profile[0];

            // Get user ids in friend list
            const friendList = await this._relationshipRepos.getFriendList({
                userId: profile[0].userId,
                isPaginated: false,
                pageIndex: 0,
                pageSize: 0
            })
            const friendListUserId = friendList?.map(item => { return item.userId })
            result['friendListUserId'] = friendListUserId;

            // // Get sender ids in received request list
            // const receivedRequestList = await this._friendRequestRepos.getReceivedFriendRequestList({
            //     receiverId: profile[0].userId,
            //     isPaginated: false,
            //     pageIndex: 0,
            //     pageSize: 0
            // })
            // const requestSenderId = receivedRequestList?.map(item => { return item.senderId })
            // let result = profile[0];
            // result['friendListUserId'] = friendListUserId;

            // // Get receiver ids in sent request list

            return res.return(ErrorMap.SUCCESSFUL.Code, result);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * updateProfile
     * @param id
     * @param request
     */
    async updateProfile(id: number, request: UpdateProfileRequest): Promise<ResponseDto> {
        this._logger.log("============== Update profile ==============");
        const res = new ResponseDto();
        try {
            // Check profile existence
            const checkedProfile = await this._profileRepos.findOne(id);
            if (!checkedProfile) {
                return res.return(ErrorMap.E007.Code);
            }

            // Check access permission
            const currentUserId = await this._commonUtil.getUserId();
            const currentUser = await this._userRepos.findOne(currentUserId);
            if (currentUser.profileId !== id) {
                return res.return(ErrorMap.E008.Code);
            }

            //Save data to Profile table
            if (request.phone !== '') {
                request.phone = this._commonUtil.createNationalPhone(request.phone);
            }
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.UPDATE_PROFILE_MAPPING, request);
            dataMapper.id = id;
            const profile = await this._profileRepos.update(dataMapper);

            return res.return(ErrorMap.SUCCESSFUL.Code, profile);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * updateAvatar
     * @param request
     */
    async updateAvatar(request: UpdateAvatarRequest): Promise<any> {
        this._logger.log("============== Update avatar ==============");
        const res = new ResponseDto();
        try {
            // Check profile existence
            const checkedProfile = await this._profileRepos.findOne(request.profileId);
            if (!checkedProfile) {
                return res.return(ErrorMap.E007.Code);
            }

            // Check access permission
            const currentUserId = await this._commonUtil.getUserId();
            const currentUser = await this._userRepos.findOne(currentUserId);
            if (currentUser.profileId !== request.profileId) {
                return res.return(ErrorMap.E008.Code);
            }

            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.UPDATE_AVATAR_MAPPING, request);
            const profile = await this._profileRepos.update(dataMapper);
            const user = await this._userRepos.findOne({ profileId: request.profileId });
            if(user) {
                profile['userId'] = user.id;
            }
            
            return res.return(ErrorMap.SUCCESSFUL.Code, profile);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * searchProfile
     * @param request 
     */
    async searchProfile(request: SearchRequest): Promise<any> {
        this._logger.log("============== Search news ==============");
        const res = new ResponseDto();
        try {
            const profileList = await this._profileRepos.searchProfile(request);
            return res.return(ErrorMap.SUCCESSFUL.Code, profileList);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}