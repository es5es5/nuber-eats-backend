import { InternalServerErrorException } from '@nestjs/common'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import * as bcrypt from 'bcrypt'
import { IsEmail, IsEnum, isEnum } from 'class-validator'
import { CoreEntity } from 'src/common/entities/core.entity'
import { BeforeInsert, Column, Entity } from 'typeorm'

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsEmail()
  email: string

  @Column()
  @Field(type => String)
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password)
    } catch (error) {
      console.error(error)
    }
  }
}
