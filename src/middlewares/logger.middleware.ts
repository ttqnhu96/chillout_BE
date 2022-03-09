import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
//import { TMPLogger } from '../common/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //private readonly logger = new TMPLogger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: () => void) {
    //this.logger.log('=============== New request ===============');
    //this.logger.log(JSON.stringify(req.body));
    next();
  }
}
