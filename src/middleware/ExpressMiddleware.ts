import { Express } from "express";

/**
 * Abstract definition of express middleware modules.
 * 
 * TODO: purify
 */
export default abstract class ExpressMiddleware {
  /**
   * Defines calls to setup the middleware modules.
   */
  public abstract configureMiddleware(
    app: Express,
    route: string
  ): Promise<void>;
}
