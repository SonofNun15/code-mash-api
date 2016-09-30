import { Application } from 'express'
import { IConfig } from '../../config'
import { Person, setSaltLength } from './model'

export class PersonResource {
  app: Application
  config: IConfig

  constructor(app: Application, config: IConfig) {
    this.app = app
    this.config = config
  }

  register(path) {
    setSaltLength(this.config.passwordSaltLength)

    path = this.config.baseUrl + path

    this.app.get(path, (req, res) => {
      Person.find(req.query, (err, result) => {
        if (err) res.status(500).send({ error: err })
        res.send(result)
      })
    })
  }
}

