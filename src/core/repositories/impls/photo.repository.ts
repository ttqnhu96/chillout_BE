import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IPhotoRepository } from "../iphoto.repository";

@Injectable()
export class PhotoRepository extends BaseRepository implements IPhotoRepository {
    private readonly _logger = new Logger(PhotoRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.PHOTO) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor PhotoRepository ==============");
    }
}