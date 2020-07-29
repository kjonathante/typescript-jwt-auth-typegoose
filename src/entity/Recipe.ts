import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType, ID } from 'type-graphql'

import { User } from './User'
import { Ref } from '../type/Ref'

@ObjectType()
export class Recipe {
  @Field(() => ID, { name: 'id' })
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  title: string

  @Field(() => User)
  @Property({ ref: User, required: true })
  author: Ref<User>
}

export const RecipeModel = getModelForClass(Recipe)
