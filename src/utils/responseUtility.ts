import { Response } from 'express';

interface Iresponse{
  res: Response,
  status: 200 | 400 | 401 | 201 | 404 | 500,
  msg: string,
  data?: any
}

export default class ResponseUtility {

  private res: Response

  constructor(_res: Response) {
    this.res = _res
  }

  standar(
    status: 200 | 400 | 401 | 201 | 404 | 500,
    msg: string,
    data: any = {}  
    ) {
    return this.res.status(status).json({
      msg: msg,
      data: data
    })
  }

  fail(error: any) {
    console.error(error);
    return this.res.status(500).json({
      msg: 'Internal Server Error'
    })
  }
}
