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
      let page = req.query.page || 1
      if (page < 1) page = 1

      const pageSize = parseInt(req.query.pageSize) || this.config.pageSize
      const previousItems = (page - 1) * pageSize

      Session.find({ })
        .skip(previousItems)
        .limit(pageSize)
        .exec((error, result) => {
          if (error) res.status(500).send({ error })
          res.send(result)
        })
    })
  }
}

