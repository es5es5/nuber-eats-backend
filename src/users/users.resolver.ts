import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { LoginInput, LoginOuput } from './dtos/login.dto'

@Resolver(of => User)
export class UsersResolover {
  constructor(private readonly usersService: UsersService) {}
  @Query(returns => Boolean)
  hi() {
    return true
  }

  @Mutation(returns => CreateAccountOutput)
  async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.usersService.createAccount(createAccountInput)
      if (error) {
        return {
          ok,
          error,
        }
      }
      return {
        ok,
      }
    } catch (error) {
      return {
        ok: false,
        error,
      }
    }
  }
  @Mutation(returns => LoginOuput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOuput> {}
}
