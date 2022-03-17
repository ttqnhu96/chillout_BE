import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IPostLikedUsersRepository } from "../ipost-liked-users.repository";

@Injectable()
export class PostLikedUsersRepository extends BaseRepository implements IPostLikedUsersRepository {
    private readonly _logger = new Logger(PostLikedUsersRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.POST_LIKED_USERS) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor PostLikedUsersRepository ==============");
    }
}