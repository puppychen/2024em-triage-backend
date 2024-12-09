import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * An implementation of the NestMiddleware interface that logs incoming requests.
 *
 * @implements {NestMiddleware}
 * @injectable
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request::', req.method, req.path);
    if (req.method === 'GET') {
      console.log('GET Data:', req.query);
    } else if (req.method === 'POST') {
      console.log('POST Data:', req.body);
    }

    next();
  }
}
