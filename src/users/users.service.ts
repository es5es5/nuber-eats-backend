import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { Injectable } from '@nestjs/common'
import { CreateAccountInput } from './dtos/create-account.dto'
import { error } from 'console'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async createAccount({ email, password, role }: CreateAccountInput): Promise<string | undefined> {
    try {
      const exists = await this.usersRepository.findOne({
        where: {
          email,
        },
      })
      if (exists) {
        return 'There is a user with that email Already'
      }
      await this.usersRepository.save(this.usersRepository.create({ email, password, role }))
    } catch (error) {
      return "Couldn't cerate Account"
    }
    // create user & hash the password
  }
}
