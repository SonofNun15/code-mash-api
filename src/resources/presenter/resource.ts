import { Application } from 'express'
import { IConfig } from '../../config'
import { Presenter } from './model'

export class PresenterResource {
  app: Application
  config: IConfig

  constructor(app: Application, config: IConfig) {
    this.app = app
    this.config = config
  }

  register(path) {
    path = this.config.baseUrl + path

    this.app.get(path, (req, res) => {
      Presenter.find((err, result) => {
        if (err) res.status(500).send({ error: err })
        res.send(result)
      })
    })
  }
}

