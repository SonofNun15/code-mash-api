import defaultConfig from './default-config'
import * as _ from 'lodash'
import * as fs from 'fs'
import * as path from 'path'
import * as Promise from 'bluebird'
const thenify = require('thenify')

const readFile = thenify(fs.readFile)

const defaultPath: string = path.join(__dirname, 'app-config.ts')

export interface IConfig {
  port: number,

  baseUrl: string,

  dbHost: string,
  dbName: string,
}

export function getConfig(path = defaultPath, encoding = 'utf8'): Promise<IConfig> {
  return readFile(path, encoding).then((data: string) => {
    const config = JSON.parse(data)
    return _.defaultsDeep(config, defaultConfig)
  }, (error) => {
    return defaultConfig
  })
}

