import { GeoJsonObject } from "geojson";
import { nanoid } from "nanoid";
import { maybeGeoJSON } from "pure-geojson-validation";

import { validationResponse } from "../interfaces/GeoJSONInterfaces";

export interface validationResult extends validationResponse {}

const asValidationResult = (valid: boolean, type: string) => ({
  gid: nanoid(9),
  valid,
  type,
});

export class GeoJSONValidationService {
  public verify = (geoJson: unknown): validationResult =>
    maybeGeoJSON(JSON.stringify(geoJson)).caseOf({
      Just: (geojson: GeoJsonObject) => asValidationResult(true, geojson.type),
      Nothing: () => asValidationResult(false, "undefined"),
    });
}
