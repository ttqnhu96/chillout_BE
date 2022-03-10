import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IWorkplaceRepository } from "../iworkplace.repository";

@Injectable()
export class WorkplaceRepository extends BaseRepository implements IWorkplaceRepository {
    private readonly _logger = new Logger(WorkplaceRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.WORKPLACE) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor WorkplaceRepository ==============");
    }
}