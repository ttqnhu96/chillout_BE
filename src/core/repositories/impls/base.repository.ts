import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { IBaseRepository } from "../ibase.repository";

export class BaseRepository implements IBaseRepository {

    private _repos: Repository<any>;
    private _log = new Logger(BaseRepository.name);

    public constructor(repos) {
        this._repos = repos;
    }

    /**
     * findOne
     * @param condition 
     * @returns 
     */
    public async findOne(id: any): Promise<any> {
        this._log.log(`============== Call method findOne width parameters:${id} ==============`);
        return await this._repos.findOne(id);
    }

    /**
     * findByCondition
     * @param condition 
     * @param orderBy 
     * @returns 
     */
    public async findByCondition(condition: any, orderBy: any = null): Promise<any[]> {
        this._log.log(`============== Call method findOne width parameters: condition:${this.convertObjectToJson(condition)}, orderBy: ${this.convertObjectToJson(orderBy)} ==============`);
        const opt = { where: condition };
        if (orderBy) {
            opt["order"] = orderBy;
        }
        return await this._repos.find(opt);
    }

    /**
     * findAll
     * @param orderBy 
     * @returns 
     */
    public async findAll(orderBy?: any): Promise<any[]> {
        if (orderBy) {
            return await this._repos.find({ order: orderBy });
        } else {
            return await this._repos.find();
        }

    }

    private convertObjectToJson(obj: any) {
        return JSON.stringify(obj);
    }
}