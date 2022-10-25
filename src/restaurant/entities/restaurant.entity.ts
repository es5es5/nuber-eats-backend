import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number

  @Field(() => String)
  @Column()
  name: string

  @Field(() => Boolean, { nullable: true })
  @Column()
  isVegan: boolean

  @Field(() => String)
  @Column()
  address: string

  @Field(() => String)
  @Column()
  ownersName: string
}
