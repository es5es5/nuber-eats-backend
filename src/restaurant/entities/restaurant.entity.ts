import { Field, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsString, Length } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number

  @Field(() => String)
  @Column()
  @Length(5)
  @IsString()
  name: string

  @Field(() => Boolean, { nullable: true })
  @Column()
  @IsBoolean()
  isVegan: boolean

  @Field(() => String)
  @Column()
  @IsString()
  address: string

  @Field(() => String)
  @Column()
  @IsString()
  ownersName: string

  @Field(() => String)
  @Column()
  @IsString()
  categoryName: string
}
