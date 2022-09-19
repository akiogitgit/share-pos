const crypto = require('crypto')

// eslint-disable-next-line: no-explicit-any
// @ts-nocheck
const secret_key_base =
  '013fd51746165dfb5973dff132d672d4bc8bac2c08bb852b9d4bb8e1057e5f84f3771df79596076f2c3c8379087d9bfca6a367b3921daa59b6883dc659b71e43'
const encrypted_signed_cookie_salt = 'signed encrypted cookie'
const encrypted_cookie_salt = 'encrypted cookie'

const create_digest = (data: string) => {
  const sign_key = crypto.pbkdf2Sync(
    secret_key_base,
    encrypted_signed_cookie_salt,
    1000,
    64,
    'sha1',
  )
  const hmac = crypto.createHmac('sha1', sign_key)
  hmac.update(data)
  return hmac.digest('hex')
}

const decrypt_data = (encrypted_data: any, iv: any) => {
  const key = crypto.pbkdf2Sync(
    secret_key_base,
    encrypted_cookie_salt,
    1000,
    32,
    'sha1',
  )
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted_data = decipher.update(encrypted_data)
  decrypted_data = Buffer.concat([decrypted_data, decipher.final()])
  return decrypted_data.toString()
}

const encrypt_data = (decrypted_data: string) => {
  const key = crypto.pbkdf2Sync(
    secret_key_base,
    encrypted_cookie_salt,
    1000,
    32,
    'sha1',
  )
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted_data = cipher.update(decrypted_data)
  encrypted_data = Buffer.concat([encrypted_data, cipher.final()])
  return [encrypted_data, iv]
}

export const create_cookie = (decrypted_data: string) => {
  const [encrypted_data, iv] = encrypt_data(decrypted_data)
  const data = Buffer.from(
    encrypted_data.toString('base64') + '--' + iv.toString('base64'),
  ).toString('base64')
  const digest = create_digest(data)
  return data + '--' + digest
}

export const console_cookie = (cookie: string) => {
  const [data, digest] = cookie.split('--')
  const [encrypted_data, iv] = Buffer.from(data, 'base64')
    .toString()
    .split('--')
    .map((v) => Buffer.from(v, 'base64'))
  console.log('----------')
  console.log('create_digest', digest, digest === create_digest(data))
  console.log('decrypt_data', decrypt_data(encrypted_data, iv))
}
