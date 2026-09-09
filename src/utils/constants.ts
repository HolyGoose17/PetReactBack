import dotenv from 'dotenv';
// console.log(dotenv.config());

export const SECRET_KEY = process.env.SECRET_KEY;
export enum STATUS_CODE {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  NOT_AUTHORYIZED = 401,  
  FORBBIDEN = 403,
  CREATED = 201,
  OK = 200,
  INTERNAL_ERROR = 500,
}
