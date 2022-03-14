import { Inject, Injectable, Logger } from "@nestjs/common";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { BaseService } from "./base.service";
import { IPhotoService } from "../iphoto.service";
import { IPhotoRepository } from "../../repositories/iphoto.repository";

@Injectable()
export class PhotoService extends BaseService implements IPhotoService {
    private readonly _logger = new Logger(PhotoService.name);
    constructor(@Inject(REPOSITORY_INTERFACE.IPHOTO_REPOSITORY) private _photoRepos: IPhotoRepository){
        super(_photoRepos);
        this._logger.log("============== Constructor PhotoService ==============");
    }
}