import AWS, { AWSError, DynamoDB } from "aws-sdk";
import { withGid } from "../interfaces/Dynamo";

import { AwsService } from "./AwsService";

type DynamoPut = DynamoDB.PutItemOutput;

export class DynamoDbAwsService extends AwsService {
  protected db: DynamoDB;

  constructor(selectedRegion: string, private selectedTable: string) {
    super(selectedRegion);
  }

  public initialize = (): void => {
    this.selectedTable = process.env.STARTUP_SIGNUP_TABLE || "";
    this.db = new AWS.DynamoDB();
  };

  public put = (item: withGid): void => {
    this.db.putItem(
      {
        TableName: this.selectedTable,
        Item: this.toDynamoItem(item),
        Expected: { gid: { Exists: false } },
      },
      this.dynamoPutHandler
    );
  };

  private toDynamoItem = (
    item: withGid
  ): DynamoDB.PutItemInputAttributeMap => ({
    gid: { S: item.gid },
    type: { S: item.type || "undefined" },
    valid: { BOOL: item.valid || false },
    validatedAt: { N: Date.now().toString() },
  });

  private dynamoPutHandler = (err: AWSError, _data: DynamoPut): void => {
    if (err) {
      var returnStatus = 500;

      if (err.code === "ConditionalCheckFailedException") {
        returnStatus = 409;
      }
      console.error("DDB Error " + returnStatus);
      console.info(err);
    } else {
      console.info("DDB Success");
    }
  };
}
