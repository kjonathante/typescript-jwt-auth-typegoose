import { Resolver, Mutation, Arg } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { UserModel } from '../../entity/User'

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    // const userId = redis.get(token)
    const payload = verify(token, process.env.CONFIRM_TOKEN_SECRET) as {
      userId: string
    }

    if (!payload.userId) return false

    await UserModel.updateOne({ _id: payload.userId }, { confirmed: true })
    // await redis.del(token)

    return true
  }
}
