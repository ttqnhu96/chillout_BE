import { DeleteResult } from "typeorm";

export interface IBaseRepository {

    /**
     * findOne
     * @param id 
     */
    findOne(id: any): Promise<any>;

    /**
     * findByCondition
     * @param filterCondition 
     * @param orderBy 
     */
    findByCondition(filterCondition: any, orderBy: any): Promise<any[]>;

    /**
     * findAll
     * @param orderBy 
     */
    findAll(orderBy?: any): Promise<any[]>;

    /**
     * create
     * @param data 
     */
    create(data: any | any): Promise<any>;

    /**
     * update
     * @param data 
     */
    update(data: any | any): Promise<any>

    /**
     * remove
     * @param id 
     */
    remove(id: any): Promise<DeleteResult>;
}