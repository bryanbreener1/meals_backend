import { Router } from "express";
import { router as reviewRouter } from "../modules/reviews/review.route.js";
import { router as restaurantRouter } from "../modules/restaurants/restaurant.route.js";
import { router as userRouter } from "../modules/users/user.route.js";



export const router = Router()


router.use('/reviews',reviewRouter)
router.use('/restaurants',restaurantRouter)
router.use('/users',userRouter)

