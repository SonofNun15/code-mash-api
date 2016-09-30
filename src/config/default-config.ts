import { IConfig } from './index'

const defaultConfig: IConfig = {
  port: 3000,

  pageSize: 20,

  baseUrl: '/api',

  dbHost: 'localhost',
  dbName: 'code-mash',

  passwordSaltLength: 32,

  sessionAge: 604800000,
  sessionSecret: 'please replace me',
}

export default defaultConfig

