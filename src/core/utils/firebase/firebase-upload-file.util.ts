import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "../../../shared/services/config.service";
import admin from "firebase-admin";
const serviceAccount = require('./serviceAccountKey.json');

@Injectable()
export class FirebaseUploadFileUtil {
    private _storage: any;
    private _bucket: string;
    private readonly _logger = new Logger(FirebaseUploadFileUtil.name);
    constructor(public _configService: ConfigService) {
        this._logger.log("============== Constructor FirebaseUploadFileUtil ==============");
        this._bucket = _configService.get("FIREBASE_BUCKET_NAME");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: this._bucket
        });
        this._storage = admin.storage().bucket();
    }

    public async generateSignedUrl(fileName: string) {
        if(!fileName) {
            return '';
        }

        try {
            // These options will allow temporary read access to the file
            const options = {
                version: 'v2', // defaults to 'v2' if missing.
                action: 'read',
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };
    
            // Get a v2 signed URL for the file
            const [url] = await this._storage.file(fileName)
                .getSignedUrl(options);
    
            console.log(`The signed url for ${fileName} is ${url}.`);
            return url;
        } catch (error) {
            this._logger.error(`Error: ${error}`);
            this._logger.error(`File name: ${fileName}`);
            return '';
        }
    }

    public async upload(folder: string, file: any, fileName: string): Promise<string> {
        try {
            const key = this.generateFileName(fileName, folder);
            await this._storage.file(key).save(file);
            console.log(`${fileName} uploaded.`);
            return key;
        } catch (error) {
            this.throwError(error);
        }
    }

    private generateFileName = (fileName: string, folder: string) => {
        const replaceName = this.replaceImgName(fileName);
        const key = `${folder}/${(new Date()).getTime().toString()}_${replaceName}`;
        return key;
    };

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