import { Controller, Inject, Logger, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { AuthUserInterceptor } from "src/interceptors/auth-user-interceptor.service";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { IUploadFileService } from "../services/iupload-file.service";

@Controller(CONTROLLER_CONSTANTS.UPLOAD_FILE)
@ApiTags(CONTROLLER_CONSTANTS.UPLOAD_FILE)
export class UploadFileController {
    public readonly _logger = new Logger(UploadFileController.name);
    constructor(@Inject(SERVICE_INTERFACE.IUPLOAD_SERVICE) private _uploadFileService: IUploadFileService) {
    }

    @Post(URL_CONSTANTS.UPLOAD_SINGLE_IMAGE)
    @ApiOperation({ summary: 'Upload single image to S3' })
    @ApiResponse({ status: 200, description: '', schema: {} })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    async uploadSingleImage(@UploadedFile() file, @Param('folderName') folderName: string) {
        this._logger.log('========== Upload single image to S3 ==========');
        return await this._uploadFileService.uploadSingleImage(file, folderName);
    }
}