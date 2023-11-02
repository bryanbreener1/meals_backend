import { AppError } from "../../errors/appError.js";
import { catchAsync } from "../../errors/catchAsync.js";
import { validateReview, validateUpdateReview } from "../reviews/review.schema.js";
import { ReviewService } from "../reviews/review.service.js";
import {
  validatePartialRestaurant,
  validateRestaurant,
} from "./restaurant.schema.js";
import { RestaurantService } from "./restaurant.service.js";

const restaurantService = new RestaurantService();
const reviewService = new ReviewService()

export const findAllRestaurant = catchAsync(async (req, res, next) => {
  const restaurants = await restaurantService.findAllRestaurant()
  return res.json(restaurants);
})

export const createRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, restaurantData } = validateRestaurant(req.body)
  if (hasError) {
    return res.status(422).json({
      status: "error",
      messages: errorMessages,
    })
  }
  const restaurant = await restaurantService.createRestaurant(restaurantData);
  return res.status(201).json(restaurant);
})

export const findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  return res.status(200).json(restaurant);
})

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { hasError, errorMessages, restaurantData } = validatePartialRestaurant(req.body)
  if (hasError) {
    return res.status(422).json({
      status: "error",
      messages: errorMessages,
    })
  }
  const restaurantUpdated = await restaurantService.updateRestaurant(
    restaurant,
    restaurantData
  )
  return res.status(200).json(restaurantUpdated);
})

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await restaurantService.deleteRestaurant(restaurant);
  res.status(204).json(null);
})

export const createRestaurantReview = catchAsync(async(req,res,next)=>{
    const {restaurant} = req
    const {userSession} = req
    const {hasError, errorMessages, reviewData} = validateReview(req.body)

    if(hasError){
      return res.status(403).json({
        status: 'error',
        message: errorMessages
      })
    }
    reviewData.restaurantId = restaurant.id
    reviewData.userId = userSession.id
    const review = await reviewService.createReview(reviewData)

    return res.status(200).json(review)

})

export const updateRestaurantReview = catchAsync(async(req,res,next)=>{
    const {restaurant} = req
    const {userSession} = req
    const {id} = req.params

    const review = await reviewService.findOneReview(id)
    
    if(!review){
      return next(new AppError(`review with id: ${id} not found`))
    }

    if(restaurant.id !== review.restaurantId){
      return next(new AppError(`review with id: ${id} not found in the restaurant ${restaurant.name}`))
    }

    if(userSession.id !== review.userId){
      return next(new AppError(`you are not the owner of this review`))
    }

    const {hasError, errorMessages, reviewData} = validateUpdateReview(req.body)
    if(hasError){
      return res.status(403).json({
        status: 'error',
        message: errorMessages
      })
    }
    
    const reviewUpdated = await reviewService.updateReview(review, reviewData)
    return res.status(200).json(reviewUpdated)
})

export const deleteRestaurantReview = catchAsync(async(req,res,next)=>{
  const {restaurant} = req
  const {userSession} = req
  const {id} = req.params

  const review = await reviewService.findOneReview(id)
  
  if(!review){
    return next(new AppError(`review with id: ${id} not found`))
  }

  if(restaurant.id ==! review.restaurantId){
    return next(new AppError(`review with id: ${id} not found in the restaurant ${restaurant.name}`))
  }

  if(userSession.id !== review.userId){
    return next(new AppError(`you are not the owner of this review`))
  }

  await reviewService.deleteReview(review)
  return res.status(200).json(null)
})
