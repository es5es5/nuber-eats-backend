import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateRestaurantDto } from './dtos/create-restaurant.dto'
import { Restaurant } from './entities/restaurant.entity'
import { RestaurantService } from './restaurant.service'
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto'

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restrauntService: RestaurantService) {}
  @Query(() => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restrauntService.getAll()
  }

  @Mutation(() => Boolean)
  async createRestaurants(@Args('input') restaurant: CreateRestaurantDto): Promise<boolean> {
    try {
      await this.restrauntService.createRestaurant(restaurant)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  @Mutation(() => Boolean)
  async updateRestaurant(@Args('input') updateRestaurant: UpdateRestaurantDto) {
    return true
  }
}
