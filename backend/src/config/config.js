import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}`,encoding: 'utf8',debug:true});

const port = parseInt(process.env.DB_PORT);
const hostname = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PW;
const dbName = process.env.DB_NAME;
const waitForConnections = true;
const connectionLimit = 2;
const queueLimit = 0;

export const config ={
  hostname,
  port,
  user,
  pass,
  dbName,
  waitForConnections,
  connectionLimit,
  queueLimit
};