import { Injectable, Logger } from "@nestjs/common";
import { FirebaseUploadFileUtil } from "../../utils/firebase/firebase-upload-file.util";
import { ErrorMap } from "../../common/error.map";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { IUploadFileService } from "../iupload-file.service";

@Injectable()
export class UploadFileService implements IUploadFileService {
    private readonly _logger = new Logger(UploadFileService.name);
    constructor(private _uploadFileUtil: FirebaseUploadFileUtil) {
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
            return res.return(ErrorMap.SUCCESSFUL.Code, result);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * uploadMultiImage
     * @param files 
     */
    async uploadMultiImage(files: any[], folderName: string) {
        this._logger.log("============== Upload multi file ==============");
        const res = new ResponseDto;
        try {
            let result = [];
            for(let i = 0; i < files.length ; i++){
                const fileName = await this._uploadFileUtil.upload(folderName, files[i].buffer, files[i].originalname);
                result.push(fileName);
            }
            return res.return(ErrorMap.SUCCESSFUL.Code, result);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}