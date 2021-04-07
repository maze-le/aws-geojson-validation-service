import { Express } from "express";
import { RegisterRoutes } from "../routes";

import ExpressMiddleware from "./ExpressMiddleware";

export default class TsoaMiddleware implements ExpressMiddleware {
  /**
   * Configures the TSOA Router
   */
  public configureMiddleware = async (
    app: Express,
    _route: string
  ): Promise<void> => RegisterRoutes(app);
}
