import { Request, Response } from 'express';
import AWS from "aws-sdk"
import ResponseUtility from '../utils/responseUtility';


class S3Module {
  private s3 = new AWS.S3({apiVersion: '2006-03-01'});

  constructor(){
    setTimeout(() => {
      this.s3 = new AWS.S3({apiVersion: '2006-03-01'});
    }, 2000);
  }
  public async create (req: Request | any, res: Response) {
		const resUtil: ResponseUtility = new ResponseUtility(res)

    try {
      let listRutes: any[]= []
      let uploadParams = {Bucket: "pruebanode", Key: '', Body: '', ContentType: ''};

      if (!!!req.files) {
			return resUtil.standar(404, 'Files not found', listRutes)
        
      }
      let claves = Object.keys(req.files)
      for (let _clave of claves) {
        uploadParams.Key = req.files[_clave].name
        uploadParams.Body = req.files[_clave].data
        uploadParams.ContentType = req.files[_clave].mimetype
        
        await new Promise<void>((resolve, reject) => {
          this.s3.upload (uploadParams, function (err: any, data: any) {
            if (err) {
              console.log("Error", err);
              reject()
            } if (data) {
              console.log("Upload Success", data.Location);
              listRutes.push(data.Location)
              resolve()
            }
          });
        })
      }




			return resUtil.standar(200, 'successful', listRutes)
    } catch (error) {
      return resUtil.fail(error)
    }
  }


  public async get (req: Request, res: Response) {
		const resUtil: ResponseUtility = new ResponseUtility(res)
    let {_id} = req.params
    

    this.s3.listBuckets(function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Buckets);
      }
    });

      return resUtil.standar(200, 'successful', '')
    }


  public async delete (req: Request, res: Response) {
		const resUtil: ResponseUtility = new ResponseUtility(res)
    let {_id} = req.params

    return resUtil.standar(200, 'successful', '')
  }
}
let s3Service = new S3Module();
class S3Controller {
  static async get(req: Request, res: Response) { s3Service.get(req, res) }
  static async create(req: Request, res: Response) { s3Service.create(req, res) }
  static async delete(req: Request, res: Response) { s3Service.delete(req, res) };
}


export default S3Controller;