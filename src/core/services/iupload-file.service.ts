export interface IUploadFileService {
    /**
     * uploadSingleImage
     * @param file 
     * @param folderName
     */
    uploadSingleImage(file: any, folderName: string);

    /**
     * uploadMultiImage
     * @param files 
     */
    uploadMultiImage(files: any[], folderName: string);
}