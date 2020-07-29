import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  // Root,
  // FieldResolver,
  UseMiddleware,
  Query,
} from 'type-graphql'
import { AppContext } from '../../type/AppContext'
import { RecipeModel, Recipe } from '../../entity/Recipe'
// import { UserModel, User } from '../../entity/User'
import { isAuth } from '../user/isAuth'

@Resolver(() => Recipe)
export class RecipeResolver {
  @Query(() => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return await RecipeModel.find({}).populate('author')
  }

  @Mutation(() => Recipe)
  @UseMiddleware(isAuth)
  async addRecipe(
    @Arg('title') title: string,
    @Ctx() { payload }: AppContext
  ): Promise<Recipe> {
    const recipe = await RecipeModel.create({ title, author: payload.userId })

    // return recipe
    // or
    return await RecipeModel.populate(recipe, { path: 'author' })
  }

  // @FieldResolver()
  // // async author(@Root() recipe: Recipe): Promise<User> {
  // async author(@Root() recipe: any): Promise<User> {
  //   // console.log('Inside FieldResolver')
  //   return await UserModel.findById(recipe.author)
  // }
}
