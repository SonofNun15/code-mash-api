import { model, Schema } from 'mongoose'
import Types = Schema.Types

import * as _ from 'lodash'

import { testPassword, securePassword } from './passwords'

var saltLength = 16

export function setSaltLength(length: number) {
  saltLength = length
}

export interface IPerson {
  _id: string,
  password: string,
  salt: string,
  email: string,
  name: string,
  bio: string,

  checkPassword(string): boolean
}

const personTransform = (doc, person, options) => {
  delete person.password
  delete person.salt
  return person
}

export const PersonSchema = new Schema({
  email: {
    type: Types.String,
    required: true,
  },
  password: {
    type: Types.String,
    required: true,
  },
  salt: {
    type: Types.String,
    required: true,
  },
  name: {
    type: Types.String,
    required: true,
  },
  bio: {
    type: Types.String,
    required: false,
  },
}, { toJSON: { transform: personTransform } })

PersonSchema.methods.checkPassword = function(password: string): boolean {
  return testPassword(password, this)
}

export const Person = model('Person', PersonSchema)

export function createPerson(newPerson, callback) {
  if (!newPerson.password) callback({ message: 'Missing password' })
  const passwordData = securePassword(newPerson.password, saltLength)
  newPerson.password = passwordData.password
  newPerson.salt = passwordData.salt
  Person.create(newPerson, callback)
}
