import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRestaurantDto } from './dtos/create-restaurant.dto'
import { Restaurant } from './entities/restaurant.entity'
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto'

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurantsRepository.find()
  }
  createRestaurant(restaurant: CreateRestaurantDto) {
    const newRestaurant = this.restaurantsRepository.create(restaurant)
    return this.restaurantsRepository.save(newRestaurant)
  }
  async updateRestaurant({ id, data }: UpdateRestaurantDto) {
    return this.restaurantsRepository.update(id, { ...data })
  }
}
