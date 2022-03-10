import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { ICollegeRepository } from "../icollege.repository";

@Injectable()
export class CollegeRepository extends BaseRepository implements ICollegeRepository {
    private readonly _logger = new Logger(CollegeRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.COLLEGE) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor CollegeRepository ==============");
    }
}