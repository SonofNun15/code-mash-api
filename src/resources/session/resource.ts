import { Application } from 'express'
import { IConfig } from '../../config'
import { Session } from './model'

export class SessionResource {
  app: Application
  config: IConfig

  constructor(app: Application, config: IConfig) {
    this.app = app
    this.config = config
  }

  register(path) {
    path = this.config.baseUrl + path

    this.app.get(path, (req, res) => {
      Session.find((error, result) => {
        if (error) res.status(500).send({ error })
        res.send(result)
      })
    })
  }
}

