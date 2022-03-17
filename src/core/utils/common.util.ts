import { ConfigService, ENV_CONFIG } from "../../shared/services/config.service";
import { COMMON_CONSTANTS } from "../common/constants/common.constant";
import { UserService } from "../services/impls/user.service";
const moment = require('moment-timezone');

export class CommonUtil {
    private configService: ConfigService = new ConfigService();
    constructor() {
        this._nationalPhone = this.configService.get('NATIONAL_PHONE');
    }
    _nationalPhone: string;

    /**
     * Create national phone
     * @param phone 
     * @returns 
     */
    public createNationalPhone(phone: string): string {
        return (this._nationalPhone + phone);
    }

    /**
     * currentDate
     * @param 
     */
    public currentDate(): Date {
        let timezone = ENV_CONFIG.TIMEZONE;
        if (ENV_CONFIG.TIMEZONE === "undefined") {
            timezone = COMMON_CONSTANTS.TIMEZONE;
        }

        const date = new Date();
        const momentDate = moment().tz(timezone);
        const utcOffset = momentDate.utcOffset();
        const newDate = new Date(date.getTime() + (utcOffset) * 60 * 1000);
        return newDate;
    }

    /**
     * getUsername
     * @returns 
     */
    async getUsername(): Promise<string> {
        const currentUser = await UserService.getAuthUser();
        if (currentUser) {
            const username = currentUser["username"];
            return username;
        } else {
            return "";
        }
    }

    /**
     * getUserId
     * @returns 
     */
    async getUserId(): Promise<number> {
        const currentUser = await UserService.getAuthUser();
        if (currentUser) {
            const userId = currentUser["id"];
            return Number(userId);
        } else {
            return 0;
        }
    }
}