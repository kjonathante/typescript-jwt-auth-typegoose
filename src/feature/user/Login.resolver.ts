import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { compare } from 'bcryptjs'

import { LoginResponse } from './login/LoginResponse'
import { AppContext } from '../../type/AppContext'
import { UserModel } from '../../entity/User'
import { sendRefreshToken } from './common/sendRefreshToken'
import { createRefreshToken, createAccessToken } from './common/auth'

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: AppContext
  ): Promise<LoginResponse> {
    const user = await UserModel.findOne({ email })

    if (!user) throw new Error('User not found')

    if (!user.confirmed) throw new Error('Not Confirmed')

    const valid = await compare(password, user.password)

    if (!valid) throw new Error('Wrong password')

    sendRefreshToken(res, createRefreshToken(user))

    return { accessToken: createAccessToken(user) }
  }
}
