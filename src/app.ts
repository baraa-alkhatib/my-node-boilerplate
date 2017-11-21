import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as logger from 'morgan';
import * as path from 'path';

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
    // Logger
    this.app.use(logger('dev'));
    // Parsers
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // Angular DIST output folder
    const oneDay = 86400000; // in milliseconds
    this.app.use(
      express.static(path.join(__dirname, '../../frontend/dist'), {
        setHeaders: (res, path) => {
          if (path.indexOf('download') !== -1) res.attachment(path);
        }
      })
    );
  }

  /**
 * Configure the API endpoints
 * @private
 * @memberof App
 */
  private routes(): void {
    // default router
    this.app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
    });
  }
}

const app = new App();

export default app.app;
