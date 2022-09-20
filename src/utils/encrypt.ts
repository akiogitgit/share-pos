import crypto from 'crypto-js'

export const encrypted = (text: string): string => {
  return crypto.AES.encrypt(
    text,
    String(process.env.NEXT_PUBLIC_ENCRYPTED_KEY),
  ).toString()
}

export const decrypted = (text: string): string => {
  return crypto.AES.decrypt(
    text,
    String(process.env.NEXT_PUBLIC_ENCRYPTED_KEY),
  ).toString(crypto.enc.Utf8)
}
