import { DeleteResult, Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { IBaseRepository } from "../ibase.repository";
import { CommonUtil } from "../../utils/common.util";

export class BaseRepository implements IBaseRepository {

    private _repos: Repository<any>;
    private _log = new Logger(BaseRepository.name);
    private _commonUtil: CommonUtil = new CommonUtil();

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

    /**
     * create
     * @param data 
     * @returns 
     */
    public async create(data: any): Promise<any> {
        const username = await this._commonUtil.getUsername();
        data.createdAt = this._commonUtil.currentDate();
        data.updatedAt = data.createdAt;
        data.createdBy = username;
        data.updatedBy = username;
        return await this._repos.save(data);
    }

    /**
     * update
     * @param data 
     * @returns 
     */
    public async update(data: any): Promise<any> {
        const username = await this._commonUtil.getUsername();
        data.updatedAt = this._commonUtil.currentDate();
        data.updatedBy = username;
        return await this._repos.save(data);
    }

    /**
     * remove
     * @param id 
     * @returns 
     */
    public async remove(id: any): Promise<DeleteResult> {
        // const entity = await this.findOne(id);
        return await this._repos.delete(id);
    }

    private convertObjectToJson(obj: any) {
        return JSON.stringify(obj);
    }
}