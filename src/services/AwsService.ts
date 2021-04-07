import AWS from "aws-sdk";

export class AwsService {
  constructor(protected region: string) {}
  protected setup = (): void => {
    AWS.config.region = this.region;
  };
}
