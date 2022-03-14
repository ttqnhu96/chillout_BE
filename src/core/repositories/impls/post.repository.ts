import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IPostRepository } from "../ipost.repository";

@Injectable()
export class PostRepository extends BaseRepository implements IPostRepository {
    private readonly _logger = new Logger(PostRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.POST) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor PostRepository ==============");
    }

    // /**
    //  * getProfileDetailById
    //  * @param id
    //  */
    // async getProfileDetailById(id: number) {
    //     const sql = `SELECT p.full_name AS fullName, p.gender AS gender, p.birthday AS birthday,
    //         SUBSTR(p.phone, 
    //         -(CHAR_LENGTH(p.phone)-(SELECT CHAR_LENGTH('${this._nationalPhone}'))), 
    //         CHAR_LENGTH(p.phone)-(SELECT CHAR_LENGTH('${this._nationalPhone}'))) AS phone, p.email AS email, p.bio AS bio,
    //         p.city_id AS cityId, (SELECT name FROM city WHERE Id = p.city_id) AS cityName,
    //         p.school_id AS schoolId, (SELECT name FROM school WHERE Id = p.school_id) AS schoolName,
    //         p.college_id AS collegeId, (SELECT name FROM college WHERE Id = p.college_id) AS collegeName,
    //         p.workplace_id AS workplaceId, (SELECT name FROM workplace WHERE Id = p.workplace_id) AS workplaceName
    //     FROM Profile p
    //     WHERE p.Id = ?`;
    //     return await this.repos.query(sql, [id]);
    // }
}