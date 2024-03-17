import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { Injectable } from '@nestjs/common'
import { CreateAccountInput } from './dtos/create-account.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async createAccount({ email, password, role }: CreateAccountInput) {
    try {
      const exists = await this.usersRepository.findOne({
        where: {
          email,
        },
      })
      if (exists) {
        // makes error
        return
      }
      await this.usersRepository.save(this.usersRepository.create({ email, password, role }))
      return true
    } catch (error) {
      console.error(error)
      return
    }
    // create user & hash the password
  }
}
