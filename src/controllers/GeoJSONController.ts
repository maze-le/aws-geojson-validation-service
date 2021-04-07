import { Body, Controller, Post, Route } from "@tsoa/runtime";
import { record } from "pure-geojson-validation";
import { Inject } from "typescript-ioc";

import { validationResponse } from "../interfaces/GeoJSONInterfaces";
import { DynamoDbAwsService } from "../services/DynamoDbAwsService";
import { GeoJSONValidationService } from "../services/GeoJSONValidationService";

@Route("geojson")
export class GeoJSONController extends Controller {
  @Inject private readonly db: DynamoDbAwsService;
  @Inject private readonly verificationService: GeoJSONValidationService;

  @Post("validate")
  public async validate(@Body() gjson: record): Promise<validationResponse> {
    const { gid, valid, type } = this.verificationService.verify(gjson);

    this.db.put({ gid, valid, type });

    return { gid, valid, type };
  }
}
