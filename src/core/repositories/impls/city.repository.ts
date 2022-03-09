import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "../../repositories/impls/base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { ICityRepository } from "../icity.repository";

@Injectable()
export class CityRepository extends BaseRepository implements ICityRepository {
    private readonly _logger = new Logger(CityRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.CITY) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor CityRepository ==============");
    }
}