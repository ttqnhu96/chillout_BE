import { Inject, Injectable, Logger } from "@nestjs/common";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { BaseService } from "./base.service";
import { IPhotoService } from "../iphoto.service";
import { IPhotoRepository } from "../../repositories/iphoto.repository";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { ErrorMap } from "../../common/error.map";
import { IPostRepository } from "../../repositories/ipost.repository";
import { CommonUtil } from "../../utils/common.util";
import { PRIVACY_SETTING } from "../../common/constants/common.constant";
import { GetPhotoListByUserIdRequest } from "../../dtos/requests/photo/get-photo-list-by-user-id.request";

@Injectable()
export class PhotoService extends BaseService implements IPhotoService {
    private readonly _logger = new Logger(PhotoService.name);
    private _commonUtil: CommonUtil = new CommonUtil();
    constructor(@Inject(REPOSITORY_INTERFACE.IPHOTO_REPOSITORY) private _photoRepos: IPhotoRepository,
        @Inject(REPOSITORY_INTERFACE.IPOST_REPOSITORY) private _postRepos: IPostRepository) {
        super(_photoRepos);
        this._logger.log("============== Constructor PhotoService ==============");
    }

    /**
     * getPhotoListByUserId
     * @param request
     */
    async getPhotoListByUserId(request: GetPhotoListByUserIdRequest): Promise<ResponseDto> {
        this._logger.log("============== Get photo list by user id ==============");
        const res = new ResponseDto();
        try {
            const photoList = await this._photoRepos.getPhotoListByUserId(request);

            return res.return(ErrorMap.SUCCESSFUL.Code, photoList);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * deletePhotoById
     * @param id
     */
    async deletePhotoById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Delete photo by id ==============");
        const res = new ResponseDto();
        try {
            //Check photo existence
            const photo = await this._photoRepos.findOne({
                id: id,
                isDeleted: false
            });
            if (!photo) {
                return res.return(ErrorMap.E010.Code);
            }

            //Get post containing photo
            const currentUserId = await this._commonUtil.getUserId();
            const post = await this._postRepos.findOne({
                id: photo.postId,
                userId: currentUserId,
                isDeleted: false
            });
            if (!post) {
                return res.return(ErrorMap.E010.Code);
            }

            //Delete photo
            photo.isDeleted = true;
            await this._photoRepos.update(photo);

            return res.return(ErrorMap.SUCCESSFUL.Code, photo);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getPhotoById
     * @param id
     */
    async getPhotoById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Get photo by id ==============");
        const res = new ResponseDto();
        try {
            //Get photo by id
            const photo = await this._photoRepos.findOne({
                id: id,
                isDeleted: false
            });
            if (!photo) {
                return res.return(ErrorMap.E010.Code);
            }

            //Get post containing photo
            const post = await this._postRepos.findOne({
                id: photo.postId,
                isDeleted: false
            });
            if (!post) {
                return res.return(ErrorMap.E010.Code);
            }

            const currentUserId = await this._commonUtil.getUserId();
            const cannotAccessPostOnlyMe = post.privacySettingId === PRIVACY_SETTING.ONLY_ME && currentUserId !== post.userId;
            if (cannotAccessPostOnlyMe) {
                return res.return(ErrorMap.E010.Code);
            }

            return res.return(ErrorMap.SUCCESSFUL.Code, photo);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}