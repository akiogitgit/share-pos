import crypto from 'crypto-js'

export const encrypted = (text: string): string => {
  return crypto.AES.encrypt(text, 'asdfjaospfjosjfoasjfkjsdfljf').toString()
}

export const decrypted = (text: string): string => {
  return crypto.AES.decrypt(text, 'asdfjaospfjosjfoasjfkjsdfljf').toString(
    crypto.enc.Utf8,
  )
}
