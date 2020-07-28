import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Root,
  FieldResolver,
  UseMiddleware,
} from 'type-graphql'
import { AppContext } from '../../type/AppContext'
import { RecipeModel, Recipe } from '../../entity/Recipe'
import { UserModel, User } from '../../entity/User'
import { isAuth } from '../user/isAuth'

@Resolver(() => Recipe)
export class RecipeResolver {
  @Mutation(() => Recipe)
  @UseMiddleware(isAuth)
  async addRecipe(
    @Arg('title') title: string,
    @Ctx() { payload }: AppContext
  ): Promise<Recipe> {
    // console.log('Inside addRecipe. payload=', payload)
    const recipe = await RecipeModel.create({ title, author: payload.userId })
    // console.log('Inside addRecipe. recipe=\n', recipe)
    return recipe
  }

  @FieldResolver()
  // async author(@Root() recipe: Recipe): Promise<User> {
  async author(@Root() recipe: any): Promise<User> {
    // console.log('Inside FieldResolver')
    return await UserModel.findById(recipe.author)
  }
}
