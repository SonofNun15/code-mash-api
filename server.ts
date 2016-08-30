import App from './src/app'
import { getConfig, IConfig } from './src/config'

getConfig().then((config: IConfig) => {
  let app = new App(config)
  app.start()
})

