import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import { IConfig } from './config'
import Database from './db'
import Login from './login'
import { PresenterResource } from './resources/presenter'
import { SessionResource } from './resources/session'
import { PersonResource } from './resources/person'

// tslint:disable:no-console

class App {
  private app: express.Application
  private db: Database
  private login: Login
  private config: IConfig

  constructor(config: IConfig) {
    this.app = express()
    this.config = config
    this.db = new Database(config)
    this.login = new Login(this.app, config)
  }

  start() {
    this.middleware()
    this.configure()
    this.login.configure({
      profile: '/profile',
      register: '/register',
      login: '/login',
      logout: '/logout',
    })
    this.routes()

    this.db.connect().then(() => {
      this.app.listen(this.config.port, () => {
        console.log('Application listening on port ' + this.config.port)
      })
    }, err => {
      console.log(`Failed to load application: ${err}`)
    })
  }

  middleware() {
    this.app.use(bodyParser.json())
  }

  configure() {
    this.app.use(session({
      secret: this.config.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: this.config.sessionAge,
      }
    }))
  }

  routes() {
    const presenter = new PresenterResource(this.app, this.config)
    presenter.register('/presenter')

    const session = new SessionResource(this.app, this.config)
    session.register('/session')

    const person = new PersonResource(this.app, this.config)
    person.register('/person')
  }
}

export default App

