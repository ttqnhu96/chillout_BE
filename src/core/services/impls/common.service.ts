import { Inject, Injectable, Logger } from "@nestjs/common";
import { ORDER_BY } from "../../common/constants/common.constant";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { ICommonService } from "../icommon.service";
import { SearchRequest } from "../../dtos/requests/common/search.request";
import { IProfileRepository } from "../../repositories/iprofile.repository";
import { IPostRepository } from "../../repositories/ipost.repository";
import { IPhotoRepository } from "../../repositories/iphoto.repository";

@Injectable()
export class CommonService extends BaseService implements ICommonService {
    private readonly _logger = new Logger(CommonService.name);
    constructor(@Inject(REPOSITORY_INTERFACE.IPROFILE_REPOSITORY) private _profileRepos: IProfileRepository,
        @Inject(REPOSITORY_INTERFACE.IPOST_REPOSITORY) private _postRepos: IPostRepository,
        @Inject(REPOSITORY_INTERFACE.IPHOTO_REPOSITORY) private _photoRepos: IPhotoRepository) {
        super(_profileRepos);
        this._logger.log("============== Constructor CommonService ==============");
    }
    /**
     * searchAll
     * @param
     */
    async searchAll(request: SearchRequest): Promise<ResponseDto> {
        this._logger.log("============== Search all ==============");
        const res = new ResponseDto();
        try {
            const result = {};

            //Get profile list
            const profileList = await this._profileRepos.searchProfile(request);

            //Get post list
            const postList = await this._postRepos.searchPost(request);
            for (let i = 0; i < postList.length; i++) {
                //Get photos in post
                const photoList = await this._photoRepos.findByCondition(
                    { postId: postList[i].id, isDeleted: false },
                    { createdAt: ORDER_BY.DESC });
                postList[i].photoList = photoList;
            }

            result['profileList'] = profileList;
            result['postList'] = postList;

            return res.return(ErrorMap.SUCCESSFUL.Code, result);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}