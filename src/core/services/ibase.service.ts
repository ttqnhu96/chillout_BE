import { ResponseDto } from "../dtos/response.dto";

export interface IBaseService {

    /**
     * findOne
     * @param id 
     */
    findOne(id: any): Promise<ResponseDto>;

    /**
     * findByCondition
     * @param filterCondition 
     * @param orderBy 
     */
    findByCondition(filterCondition: any, orderBy: any): Promise<ResponseDto>;

    /**
     * findAll
     * @param orderBy 
     */
    findAll(orderBy?: any): Promise<ResponseDto>;
}