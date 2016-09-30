import * as crypto from 'crypto'

import { IPerson } from './model'

export interface ISecurePassword {
  salt: string,
  password: string,
}

function generateSalt(length): string {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
}

export function hashPassword(password, salt): string {
  const hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
  hash.update(password)
  var value = hash.digest('hex')
  return value
}

export function securePassword(insecurePassword, saltLength): ISecurePassword {
  var salt = generateSalt(saltLength)
  var password = hashPassword(insecurePassword, salt)

  return { salt, password }
}

export function testPassword(password, person: IPerson): boolean {
  const hashedPassword = hashPassword(password, person.salt)
  return hashedPassword == person.password
}
