import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as logger from 'morgan';

/**
 * Blue print from the main express-powered application
 * @class App
 */

export class App {
  // Ref to expres app instance
  public app: express.Application;

  /**
   * construct express-powered app instance
   */
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }
  /**
   * Configure app middlewares
   * @private
   * @memberof App
   */
  private middleware(): void {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  /**
 * Set up a default app's router's handler
 * @private
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @memberof App
 */
  private mainRouterHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.status(200).json({ status: 200, message: 'Welcome To Our Website!' });
  }
  /**
 * Configure the API endpoints
 * @private
 * @memberof App
 */
  private routes(): void {
    // default router
    const router = express.Router();
    router.get('/', this.mainRouterHandler);
    this.app.use('/', router);
  }
}

const app = new App();

export default app.app;
