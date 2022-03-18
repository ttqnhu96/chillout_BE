import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CONTROLLER_CONSTANTS } from './core/common/constants/api.constant';

@Controller(CONTROLLER_CONSTANTS.APP)
@ApiTags(CONTROLLER_CONSTANTS.APP)
export class AppController {
  public readonly _logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
