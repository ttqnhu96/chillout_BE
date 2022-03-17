import { Injectable, Logger } from "@nestjs/common";
import { ErrorMap } from "../../common/error.map";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { S3UploadFileUtil } from "../../utils/aws-s3/s3-upload-file.util";
import { IUploadFileService } from "../iupload-file.service";

@Injectable()
export class UploadFileService implements IUploadFileService {
    private readonly _logger = new Logger(UploadFileService.name);
    constructor(private _uploadFileUtil: S3UploadFileUtil) {
    }

    /**
     * uploadSingleImage
     * @param file 
     * @param folderName
     */
    async uploadSingleImage(file: any, folderName: string) {
        this._logger.log("============== Upload file ==============");
        const res = new ResponseDto;
        try {
            const result = await this._uploadFileUtil.upload(folderName, file.buffer, file.originalname);
            console.log(result)
            return res.return(ErrorMap.SUCCESSFUL.Code, result);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}