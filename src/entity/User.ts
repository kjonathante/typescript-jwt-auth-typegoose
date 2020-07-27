// import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import {
  ObjectType,
  Field,
  ID,
  // Root
} from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID, { name: 'id' })
  readonly _id: ObjectId

  @Field()
  // @Column('text', { unique: true })
  @prop({ unique: true })
  email: string

  // @Column()
  @prop()
  password: string

  // @Column('int', { default: 0 })
  @prop({ default: 0 })
  tokenVersion: number

  // @Field()
  // name(@Root() parent: User): string {
  //   return `${parent.firstName} ${parent.lastName}`
  // }
}

export const UserModel = getModelForClass(User)
