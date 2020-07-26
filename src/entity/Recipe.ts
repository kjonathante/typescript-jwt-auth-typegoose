import { prop, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { ObjectType, Field, ID } from 'type-graphql'

import { User } from './User'
import { Ref } from '../types/types'

@ObjectType()
export class Recipe {
  @Field(() => ID)
  readonly id: string

  readonly _id: ObjectId

  @Field()
  @prop({ required: true })
  title: string

  @Field(() => User)
  @prop({ ref: User, required: true })
  author: Ref<User>
}

export const RecipeModel = getModelForClass(Recipe)
