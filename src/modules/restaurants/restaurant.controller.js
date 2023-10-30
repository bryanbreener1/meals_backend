import { catchAsync } from "../../errors/catchAsync.js"
import { validatePartialRestaurant, validateRestaurant } from "./restaurant.schema.js"
import { RestaurantService } from "./restaurant.service.js"

const restaurantService = new RestaurantService()

export const findAllRestaurant = catchAsync(async(req, res, next) => {
 const restaurants = await restaurantService.findAllRestaurant()
 return res.json(restaurants)
})

export const createRestaurant = catchAsync(async(req, res, next) => {
 const {hasError, errorMesages, restaurantData} = validateRestaurant(req.body)
 if(hasError){
  return res.status(422).json({
   status:'error',
   messages: errorMesages
  })
 }
 const restaurant = await restaurantService.createRestaurant(restaurantData)
 return res.status(201).json(restaurant)
})

export const findOneRestaurant = catchAsync(async(req, res, next) => {
 const {restaurant} = req
 return res.status(200).json(restaurant)
})

export const updateRestaurant= catchAsync(async(req, res, next) => {
 const {restaurant} = req
 const {hasError, errorMesages, restaurantData} = validatePartialRestaurant(req.body)
 if(hasError){
  return res.status(422).json({
   status:'error',
   messages: errorMesages
  })
 }
 const restaurantUpdated = await restaurantService.updateRestaurant(restaurant, restaurantData)
 return res.status(200).json(restaurantUpdated)
})

export const deleteRestaurant = catchAsync(async(req, res, next) => {
 const {restaurant} = req
 await restaurantService.deleteRestaurant(restaurant)
 res.status(204).json(null)
})