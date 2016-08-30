import { model, Schema } from 'mongoose'

export interface ISession {
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
}

export const SessionSchema = new Schema({
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
})

export const Session = model('Session', SessionSchema)

