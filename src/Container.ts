import { Container, ObjectFactory, Scope } from "typescript-ioc";

import SwaggerMiddleware from "./middleware/SwaggerMiddleware";
import { GeoJSONValidationService } from "./services/GeoJSONValidationService";
import { DynamoDbAwsService } from "./services/DynamoDbAwsService";

export const swaggerFactory: ObjectFactory = () => {
  const swaggerPath = "docs/swagger.json";
  return new SwaggerMiddleware(swaggerPath);
};

export const geojsonValidation: ObjectFactory = () => {
  return new GeoJSONValidationService();
};

export const dynamoFactory: ObjectFactory = () => {
  const dynamoTable = process.env.STARTUP_SIGNUP_TABLE || "no-table";
  const awsRegion = process.env.REGION || "no-region";

  const service = new DynamoDbAwsService(awsRegion, dynamoTable);
  service.initialize();

  return service;
};

export const initIoc = () => {
  Container.bind(SwaggerMiddleware)
    .factory(swaggerFactory)
    .scope(Scope.Singleton);

  Container.bind(GeoJSONValidationService).factory(geojsonValidation);
  Container.bind(DynamoDbAwsService).factory(dynamoFactory);
};
