import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { Injectable } from '@nestjs/common'
import { CreateAccountInput } from './dtos/create-account.dto'
import { error } from 'console'
import { LoginInput } from './dtos/login.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async createAccount({ email, password, role }: CreateAccountInput): Promise<{
    ok: boolean
    error?: string
  }> {
    try {
      const exists = await this.usersRepository.findOne({
        where: {
          email,
        },
      })
      if (exists) {
        return { ok: false, error: 'There is a user with that email Already' }
      }
      await this.usersRepository.save(this.usersRepository.create({ email, password, role }))
      return {
        ok: true,
      }
    } catch (error) {
      return { ok: false, error: "Couldn't cerate Account" }
    }
    // create user & hash the password
  }

  async login({ email, password }: LoginInput): Promise<{
    ok: boolean
    error?: string
    token?: string
  }> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
      })
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        }
      }
      const passwordCollect = await user.checkPassword(password)
      if (!passwordCollect) {
        return {
          ok: false,
          error: 'Wrong Password',
        }
      }
      return {
        ok: true,
        token: 'ddd',
      }
    } catch (error) {
      return {
        ok: false,
        error,
      }
    }
  }
}
