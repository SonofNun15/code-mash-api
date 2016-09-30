import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Application } from 'express'
import * as session from 'express-session'
import { IConfig } from '../config'

import { ILoginRoutes, register } from './routes'

import { Person, IPerson, createPerson } from '../resources/person'

class Security {
  app: Application
  private config: IConfig

  constructor(app: Application, config: IConfig) {
    this.app = app
    this.config = config
  }

  configure(paths: ILoginRoutes) {
    passport.use(this.buildStrategy())

    this.app.use(passport.initialize())
    this.app.use(passport.session())

    register(this.app, paths)

    passport.serializeUser((person: IPerson, done) => {
      done(null, person._id)
    });

    passport.deserializeUser((id, done) => {
      Person.findById(id, function(err, user) {
        done(err, user)
      });
    });
  }

  buildStrategy() {
    return new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
      }, (email: string, password: string, callback) => {
        Person.findOne({ email }, (err, match: IPerson) => {
          if (err) return callback(err)
          if (!match) {
            return callback(null, false, { message: 'Incorrect email' })
          }
          if (!match.checkPassword(password)) {
            return callback(null, false, { message: 'Incorrect password.' })
          }
          return callback(null, match)
        })
      })
  }
}

export function verifyAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.sendStatus(403)
}

export default Security