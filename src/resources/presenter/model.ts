import { model, Schema } from 'mongoose'

export interface IPresenter {
  name: string,
}

export const PresenterSchema = new Schema({
  name: String,
  bio: String,
  twitter: String,
  github: String,
  linkedin: String,
  webpage: String,
})

export const Presenter = model('Presenter', PresenterSchema)

