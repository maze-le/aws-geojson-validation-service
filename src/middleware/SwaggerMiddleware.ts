import { Express } from "express";
import swagger from "swagger-ui-express";

import { existsSync, readFile } from "fs";
import { resolve } from "path";

import ExpressMiddleware from "./ExpressMiddleware";

/**
 * Swagger Middleware Module.
 */
export default class SwaggerMiddleware implements ExpressMiddleware {
  private swaggerFsPath: string;

  constructor(swaggerFsPath: string) {
    this.swaggerFsPath = swaggerFsPath;
  }

  /**
   * Configures the swagger middleware for the given express app and route.
   */
  public async configureMiddleware(app: Express, route: string): Promise<void> {
    const swaggerPath = resolve(this.swaggerFsPath);
    if (!existsSync(swaggerPath)) {
      console.error("swagger doc not found!");
    } else {
      try {
        await this.setupSwaggerMiddleware(app, route, swaggerPath);
      } catch (error) {
        console.error("invalid swagger spec file");
      }
    }
  }

  private async setupSwaggerMiddleware(
    app: Express,
    route: string,
    path: string
  ): Promise<void> {
    const swaggerDoc = await this.readSwagger(path);

    app.use(
      route,
      swagger.serve,
      swagger.setup(swaggerDoc, {
        swaggerOptions: {
          displayRequestDuration: true,
          filter: true,
        },
      })
    );
  }

  /**
   * @returns {object} the JSON object of the swagger file.
   * @param path the path to the swagger file
   */
  private async readSwagger(path: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      readFile(path, (err, data) => {
        if (err) {
          reject(err);
        }
        try {
          const content = JSON.parse(data.toString());
          resolve(content);
        } catch {
          reject(err);
        }
      });
    });
  }
}
