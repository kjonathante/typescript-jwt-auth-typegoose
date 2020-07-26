import {
  Resolver,
  UseMiddleware,
  Mutation,
  Ctx,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql'

import { Recipe, RecipeModel } from '../../entity/Recipe'
import { isAuth } from '../user/isAuth'
import { MyContext } from '../../types/MyContext'
import { UserModel, User } from '../../entity/User'

@Resolver(() => Recipe)
export class RecipeResolver {
  @Mutation(() => Recipe, { nullable: true })
  @UseMiddleware(isAuth)
  async addRecipe(
    @Arg('title') title: string,
    @Ctx() { payload }: MyContext
  ): Promise<Recipe> {
    console.log('addRecipe', payload)
    const recipe = new RecipeModel({
      title,
      author: payload.userId,
    })

    await recipe.save()

    return recipe
  }

  @FieldResolver()
  async author(@Root() parent: any): Promise<User> {
    console.log(parent)
    return await UserModel.findById(parent.author)
  }
}
