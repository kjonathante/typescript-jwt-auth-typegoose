import { prop, getModelForClass, defaultClasses } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User extends defaultClasses.TimeStamps {
  @Field(() => ID, { name: 'id' })
  readonly _id: ObjectId

  @Field()
  @prop({ unique: true })
  email: string

  @prop()
  password: string

  @prop({ default: 0 })
  tokenVersion: number

  @prop({ default: false })
  confirmed: boolean

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const UserModel = getModelForClass(User)
