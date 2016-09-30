import { Application } from 'express'
import * as passport from 'passport'

import { verifyAuthenticated } from './index'
import { Person, IPerson, createPerson } from '../resources/person'

export interface ILoginRoutes {
  profile: string,
  register: string,
  login: string,
  logout: string,
}

export function register(app: Application, paths: ILoginRoutes) {
  app.get(paths.profile, verifyAuthenticated, (req, res) => {
    res.send(req.user)
  })

  app.post(paths.register, (req, res) => {
    Person.findOne({ email: req.body.email }, (err, match: IPerson) => {
      if (err) res.status(500).send({ error: err })
      if (match) {
        res.status(422).send({ message: 'That email is already registered.' })
      } else {
        var person = req.body
        createPerson(person, (err, result) => {
          if (err) return res.status(422).send(err)
          req.login(result, (err) => {
            if (err) return res.status(500).send(err)
            res.send(result)
          })
        })
      }
    })
  })

  app.post(paths.login, passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.sendStatus(204)
  })

  app.post(paths.logout, (req, res) => {
    req.logout()
    res.sendStatus(204)
  })
}

