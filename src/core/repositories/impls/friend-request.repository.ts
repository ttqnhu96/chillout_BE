import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IFriendRequestRepository } from "../ifriend-request.repository";

@Injectable()
export class FriendRequestRepository extends BaseRepository implements IFriendRequestRepository {
    private readonly _logger = new Logger(FriendRequestRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.FRIEND_REQUEST) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor FriendRequestRepository ==============");
    }
}