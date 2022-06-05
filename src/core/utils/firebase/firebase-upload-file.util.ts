import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "../../../shared/services/config.service";
import admin, { ServiceAccount } from "firebase-admin";
import * as serviceAccount from './serviceAccountKey.json';

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

    public async upload(folder: string, file: any, fileName: string): Promise<string> {
        try {
            
            const key = this.generateFileName(fileName, folder);
            const options = {
                destination: key,
                predefinedAcl: 'publicRead',
              };
            const res = this._storage.file(key);
            await res.save(file,{
                metadata: {
                  contentType: 'image/png;image/jpeg',
                },
                predefinedAcl: 'publicRead'
            });
            const metaData = await res.getMetadata();
            const url = metaData[0].mediaLink;
            return url;
            // return this.generateSignedUrl(key);
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