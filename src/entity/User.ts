import { prop, getModelForClass } from '@typegoose/typegoose'
import { ObjectType, Field } from 'type-graphql'
import { Base } from './Base'

@ObjectType()
export class User extends Base {
  @Field()
  @prop({ unique: true })
  email: string

  @prop()
  password: string

  @prop({ default: 0 })
  tokenVersion: number

  @prop({ default: false })
  confirmed: boolean
}

export const UserModel = getModelForClass(User)
