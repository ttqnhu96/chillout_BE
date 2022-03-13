import { IBaseRepository } from "./ibase.repository";

export interface IProfileRepository extends IBaseRepository {
    /**
     * getProfileDetailById
     * @param id
     */
    getProfileDetailById(id: number);
}
