import { Resolver, Mutation, Arg } from 'type-graphql'
import { hash } from 'bcryptjs'
import { User, UserModel } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'
import { createConfirmationUrl } from './confirmUser/createConfirmationUrl'

@Resolver()
export class RegisterResolver {
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

    createConfirmationUrl((user._id as unknown) as string)

    return user
  }
}
