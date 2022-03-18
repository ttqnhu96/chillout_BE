import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IProfileRepository } from "../iprofile.repository";
import { ConfigService } from "../../../shared/services/config.service";
import { SearchRequest } from "../../dtos/requests/common/search.request";
import { COMMON_CONSTANTS, USER_STATUS_ENUM } from "../../common/constants/common.constant";

@Injectable()
export class ProfileRepository extends BaseRepository implements IProfileRepository {
    private readonly _logger = new Logger(ProfileRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.PROFILE) private readonly repos: Repository<ObjectLiteral>,
        private configService: ConfigService) {
        super(repos);
        this._nationalPhone = this.configService.get('NATIONAL_PHONE');
        this._logger.log("============== Constructor ProfileRepository ==============");
    }
    _nationalPhone: string;

    /**
     * getProfileDetailById
     * @param id
     */
    async getProfileDetailById(id: number) {
        const sql = `SELECT p.full_name AS fullName, p.gender AS gender, p.birthday AS birthday,
            SUBSTR(p.phone, 
            -(CHAR_LENGTH(p.phone)-(SELECT CHAR_LENGTH('${this._nationalPhone}'))), 
            CHAR_LENGTH(p.phone)-(SELECT CHAR_LENGTH('${this._nationalPhone}'))) AS phone, p.email AS email, p.bio AS bio,
            p.city_id AS cityId, (SELECT name FROM city WHERE Id = p.city_id) AS cityName,
            p.school_id AS schoolId, (SELECT name FROM school WHERE Id = p.school_id) AS schoolName,
            p.college_id AS collegeId, (SELECT name FROM college WHERE Id = p.college_id) AS collegeName,
            p.workplace_id AS workplaceId, (SELECT name FROM workplace WHERE Id = p.workplace_id) AS workplaceName
        FROM Profile p
        WHERE p.Id = ?`;
        return await this.repos.query(sql, [id]);
    }

    /**
     * searchProfile
     * @param request 
     */
    async searchProfile(request: SearchRequest) {
        let params = [];
        let sql: string = `SELECT p.Id AS id, p.full_name AS fullName, p.avatar AS avatar, (SELECT Name FROM City WHERE Id = p.city_id) AS cityName 
        FROM profile p
            INNER JOIN user u ON u.profile_id = p.id AND u.user_status = '${USER_STATUS_ENUM.ACTIVE}'
        WHERE p.id > 0`;
        if (request.attribute && request.attribute.trim().length > 0) {
            sql += ` AND (p.full_name LIKE ? ESCAPE '${COMMON_CONSTANTS.PIPE_CHAR}')`;
            params.push(COMMON_CONSTANTS.PERCENT_CHAR + COMMON_CONSTANTS.PIPE_CHAR + request.attribute + COMMON_CONSTANTS.PERCENT_CHAR);
        }

        sql += " ORDER BY p.full_name ASC LIMIT ? OFFSET ?";
        params.push(request.pageSize);
        params.push(request.pageIndex * request.pageSize);

        return await this.repos.query(sql, params);
    }
}