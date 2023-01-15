import { Response, Request } from 'express';

export interface User {
    userId:string;

}

export interface Context  {
    res: Response;
    user: User;
    req: Request
  } 
  