import AWS from "aws-sdk"

export default class Aws{

  constructor() {
    this.newConnection()
  }

  newConnection(){
    AWS.config.update({
			accessKeyId: process.env.AWSaccessKeyId,
			secretAccessKey: process.env.AWSsecretAccessKey,
			region: process.env.AWSregion,
		});
  }
}