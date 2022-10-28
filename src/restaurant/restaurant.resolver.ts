import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateRestaurantDto } from './dtos/create-restaurant.dto'
import { Restaurant } from './entities/restaurant.entity'
import { RestaurantService } from './restaurant.service'

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restrauntService: RestaurantService) {}
  @Query(() => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restrauntService.getAll()
  }

  @Mutation(() => Boolean)
  createRestaurants(@Args() restaurant: CreateRestaurantDto): boolean {
    return true
  }
}
