import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { hash, compare } from 'bcryptjs'

// import { User } from '../../entity/User'
import { User, UserModel } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'
import { LoginResponse } from './login/LoginResponse'
import { createAccessToken, createRefreshToken } from './auth'
import { AppContext } from '../../type/AppContext'
import { isAuth } from './isAuth'
import { sendRefreshToken } from './sendRefreshToken'

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello World'
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find()
  }

  @Mutation(() => User)
  async register(
    @Arg('data')
    { email, password }: RegisterInput
  ): Promise<User> {
    const hashPassword = await hash(password, 12)

    const user = new UserModel({
      email,
      password: hashPassword,
    })
    await user.save()
    return user
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: AppContext
  ): Promise<LoginResponse> {
    const user = await UserModel.findOne({ email })

    if (!user) throw new Error('User not found')

    const valid = await compare(password, user.password)

    if (!valid) throw new Error('Wrong password')

    sendRefreshToken(res, createRefreshToken(user))

    return { accessToken: createAccessToken(user) }
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  async bye(@Ctx() { payload }: AppContext): Promise<string> {
    return `your id is ${payload.userId}`
  }
}
