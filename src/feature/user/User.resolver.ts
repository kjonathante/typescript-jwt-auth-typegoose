import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql'

import { User, UserModel } from '../../entity/User'
import { AppContext } from '../../type/AppContext'
import { isAuth } from './common/isAuth'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find()
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  async bye(@Ctx() { payload }: AppContext): Promise<string> {
    return `your id is ${payload.userId}`
  }
}
