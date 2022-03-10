import { CreateUserRequest } from "../dtos/requests/create-user.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IUserService extends IBaseService {
    /**
     * getUserByUsername
     * @param username
     */
    getUserByUsername(username: string): Promise<ResponseDto>;

    /**
     * createUser
     * @param request
     */
    createUser(request: CreateUserRequest): Promise<ResponseDto>;
}