import { sign } from 'jsonwebtoken'
import { User } from '../../../entity/User'

export const createAccessToken = (user: User): string => {
  return sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

export const createRefreshToken = (user: User): string => {
  return sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  )
}
