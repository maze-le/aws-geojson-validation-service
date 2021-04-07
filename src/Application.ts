import { Inject } from "typescript-ioc";
import express, { Express } from "express";

import SwaggerMiddleware from "./middleware/SwaggerMiddleware";
import TsoaMiddleware from "./middleware/TsoaMiddleware";

export default class Application {
  @Inject private readonly tsoa: TsoaMiddleware;
  @Inject private readonly swagger: SwaggerMiddleware;

  /** starts the application. */
  public async start(): Promise<void> {
    const app = express();
    await this.setupApplication(app);

    const port = process.env.PORT || 3000;

    app.listen(port, () =>
      console.log("Express is up: http://127.0.0.1:" + port + "/")
    );
  }

  /** sets up all middleware modules. */
  private async setupApplication(app: Express): Promise<void> {
    const jsonParser = express.json();
    app.use(jsonParser);

    this.initializeMiddleware(app);
  }

  /** initializes all express middleware modules */
  private async initializeMiddleware(app: Express): Promise<void> {
    await this.swagger.configureMiddleware(app, "/api");
    await this.tsoa.configureMiddleware(app, "/");
  }
}
