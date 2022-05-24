import { Request, Response } from 'express';
import AWS from "aws-sdk"
import ResponseUtility from '../utils/responseUtility';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

class DynamoModule {

  private docClient: DocumentClient = new AWS.DynamoDB.DocumentClient();

  constructor(){
    setTimeout(() => {
      this.docClient = new AWS.DynamoDB.DocumentClient();
    }, 2000);
  }
  
  public async create(req: Request, res: Response) {
    const resUtil: ResponseUtility = new ResponseUtility(res)

    let table = "usersKeys";

    let params = {
      TableName: table,
      Item: {
        "userKey": "3",
        "date": new Date(),
        "edad": "11",
        "name": "Harold"
      }
    };

    console.log("Adding a new item...");
    this.docClient.put(params, function (err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });

    return resUtil.standar(200, 'successful', '')
  }


  public async get(req: Request, res: Response) {
    const resUtil: ResponseUtility = new ResponseUtility(res)
    try {
      let { _id } = req.params

      let params = {
        TableName: "usersKeys",
        Key: {
          userKey: `${_id}`,
        },
      };
      this.docClient.get(params).promise()
        .then((result) => {
          console.log("Successfull", result);
          return resUtil.standar(200, 'successful', result)
        }).catch((err) => {
          return resUtil.fail(err)
        });
    } catch (error) {
      return resUtil.fail(error)
    }
  }


  public async delete(req: Request, res: Response) {
    const resUtil: ResponseUtility = new ResponseUtility(res)
    let { _id } = req.params

    let params = {
      TableName: "usersKeys",
      Key: {
        userKey: `${_id}`,
      },
    };

    console.log("Attempting a conditional delete...");
    this.docClient.delete(params, function (err, data) {
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
      }
    });
    return resUtil.standar(200, 'successful', '')
  }
}

let dynamoService = new DynamoModule();
class DynamoController {
  static async get(req: Request, res: Response) { dynamoService.get(req, res) }
  static async create(req: Request, res: Response) { dynamoService.create(req, res) }
  static async delete(req: Request, res: Response) { dynamoService.delete(req, res) };
}


export default DynamoController;