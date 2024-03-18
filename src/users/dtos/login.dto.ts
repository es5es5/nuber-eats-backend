import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { MutationOutput } from 'src/common/dtos/output.dto'
import { User } from '../entities/user.entity'

@InputType()
export class LoginInput extends PickType(User, ['id', 'password']) {}

@ObjectType()
export class LoginOuput extends MutationOutput {
  @Field(type => String)
  token: string
}
