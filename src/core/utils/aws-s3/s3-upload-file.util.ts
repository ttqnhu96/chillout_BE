import { Injectable } from "@nestjs/common";
import { ConfigService } from "../../../shared/services/config.service";
import * as AWS from "aws-sdk";

@Injectable()
export class S3UploadFileUtil {
    private _s3: AWS.S3;
    private _bucket: string;
    private _secretkey: string;
    private _accesskey: string;
    constructor(public _configService: ConfigService) {
        this._bucket = _configService.get("AWS_BUCKET_NAME");
        this._secretkey = _configService.get("AWS_SECRET_ACCESS_KEY");
        this._accesskey = _configService.get("AWS_ACCESS_KEY_ID");
        this._s3 = new AWS.S3({
            accessKeyId: this._accesskey,
            secretAccessKey: this._secretkey,
            region: _configService.get("AWS_REGION")
        });
    }

    /**
     * upload
     * @param folder 
     * @param file 
     * @param filename 
     * @returns 
     */
    public async upload(folder: string, file: any, fileName: string): Promise<string> {
        const replaceName = this.replaceImgName(fileName);
        const key = `${folder}/${(new Date()).getTime()}_${replaceName}`;
        const params = {
            Bucket: this._bucket,
            Key: key,
            Body: file,
        };

        await this._s3.putObject(params, (err, data) => {
            this.throwError(err);
        });
        return key;
    }

    /**
     * throwError
     * @param err 
     */
    private throwError(err: any) {
        if (err) {
            throw new Error(err);
        }
    }

    /**
     * replaceImgName
     * @param name 
     */
    private replaceImgName(name: string) {
        return name.split(' ').join('').split('%').join('_');
    }
}