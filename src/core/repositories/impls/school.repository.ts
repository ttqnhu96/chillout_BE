import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { ISchoolRepository } from "../ischool.repository";

@Injectable()
export class SchoolRepository extends BaseRepository implements ISchoolRepository {
    private readonly _logger = new Logger(SchoolRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.SCHOOL) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor SchoolRepository ==============");
    }
}