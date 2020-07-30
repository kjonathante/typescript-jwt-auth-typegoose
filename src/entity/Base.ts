import { defaultClasses } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Base extends defaultClasses.TimeStamps {
  @Field(() => ID, { name: 'id' })
  readonly _id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
