import * as mongoose from 'mongoose'
import * as Promise from 'bluebird'
import { IConfig } from '../config'

class Database {
  private config: IConfig

  constructor(config: IConfig) {
    this.config = config
  }

  connect(): Promise<{}> {
    const connectionString = `mongodb://${this.config.dbHost}/${this.config.dbName}`
    mongoose.connect(connectionString)
    const db = mongoose.connection

    return new Promise((resolve, reject) => {
      db.on('error', err => reject(err))
      db.once('open', () => resolve())
    })
  }
}

export default Database

