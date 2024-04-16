import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from 'src/jwt/jwt.module'
import { User } from './entities/user.entity'
import { UsersResolover } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [UsersResolover, UsersService],
})
export class UsersModule {}
