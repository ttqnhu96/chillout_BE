import { CreateUserRequest } from "../dtos/requests/user/create-user.request";
import { LoginRequest } from "../dtos/requests/user/login.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IUserService extends IBaseService {
    /**
     * createUser
     * @param request
     */
    createUser(request: CreateUserRequest): Promise<ResponseDto>;

    /**
     * login
     * @param request
     */
    login(request: LoginRequest): Promise<any>;

    /**
     * getUserByUsername
     * @param username
     */
    getUserByUsername(username: string): Promise<ResponseDto>;
}