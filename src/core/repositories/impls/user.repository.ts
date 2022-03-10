import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IUserRepository } from "../iuser.repository";

@Injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
    private readonly _logger = new Logger(UserRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.USER) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor UserRepository ==============");
    }
}