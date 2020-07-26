// import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { ObjectType, Field, ID, Root } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id: string

  readonly _id: ObjectId

  @Field()
  @prop({ required: true, unique: true })
  email: string

  @prop({ required: true })
  password: string

  @prop({ default: 0 })
  tokenVersion: number

  @Field()
  name(@Root() parent: User): string {
    return `${parent.email}`
  }
}

export const UserModel = getModelForClass(User)
