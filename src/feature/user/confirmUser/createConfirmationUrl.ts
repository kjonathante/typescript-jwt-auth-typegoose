import { sign } from 'jsonwebtoken'
export const createConfirmationUrl = (userId: string): string => {
  const token = sign({ userId }, process.env.CONFIRM_TOKEN_SECRET)
  const url = `http://localhost:3000/confirm#${token}`
  console.log(url)
  return url
}
