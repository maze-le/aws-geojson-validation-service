export type TsoaBBox = number[];

export interface TsoaGeoJsonObject {
  type: TsoaGeoJsonTypes;
  bbox?: TsoaBBox;
}

export type TsoaGeoJsonTypes = TsoaGeoJSON["type"];

export type TsoaPosition = number[];
export type TsoaGeoJSON = TsoaGeometry | TsoaFeature | TsoaFeatureCollection;

export type TsoaGeometry =
  | TsoaPoint
  | TsoaMultiPoint
  | TsoaLineString
  | TsoaMultiLineString
  | TsoaPolygon
  | TsoaMultiPolygon
  | TsoaGeometryCollection;

export type TsoaGeometryObject = TsoaGeometry;

export interface TsoaPoint extends TsoaGeoJsonObject {
  type: "Point";
  coordinates: TsoaPosition;
}

export interface TsoaMultiPoint extends TsoaGeoJsonObject {
  type: "MultiPoint";
  coordinates: TsoaPosition[];
}

export interface TsoaLineString extends TsoaGeoJsonObject {
  type: "LineString";
  coordinates: TsoaPosition[];
}

export interface TsoaMultiLineString extends TsoaGeoJsonObject {
  type: "MultiLineString";
  coordinates: TsoaPosition[][];
}

export interface TsoaPolygon extends TsoaGeoJsonObject {
  type: "Polygon";
  coordinates: TsoaPosition[][];
}

export interface TsoaMultiPolygon extends TsoaGeoJsonObject {
  type: "MultiPolygon";
  coordinates: TsoaPosition[][][];
}

export interface TsoaGeometryCollection extends TsoaGeoJsonObject {
  type: "GeometryCollection";
  geometries: TsoaGeometry[];
}

export type TsoaGeoJsonProperties = { [name: string]: any } | null;

export interface TsoaFeature<
  G extends TsoaGeometry | null = TsoaGeometry,
  P = TsoaGeoJsonProperties
> extends TsoaGeoJsonObject {
  id?: string | number;

  type: "Feature";
  geometry: G;
  properties: P;
}

export interface TsoaFeatureCollection<
  G extends TsoaGeometry | null = TsoaGeometry,
  P = TsoaGeoJsonProperties
> extends TsoaGeoJsonObject {
  type: "FeatureCollection";
  features: Array<TsoaFeature<G, P>>;
}
