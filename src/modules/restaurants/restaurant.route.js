import { Router } from 'express';
import {
    findAllRestaurant,
    findOneRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createRestaurantReview,
    updateRestaurantReview,
    deleteRestaurantReview,
} from './restaurant.controller.js';
import { restaurantExist } from './restaurant.middleware.js'
import { protect, restrictTo } from '../users/user.middleware.js';

export const router = Router();

router
    .route('/')
    .get(findAllRestaurant)
    .post(protect,restrictTo('admin'),createRestaurant);

router
    .route('/:id')
    .patch(protect,restrictTo('admin'),restaurantExist, updateRestaurant)
    .get(restaurantExist,findOneRestaurant)
    .delete(protect,restrictTo('admin'),restaurantExist, deleteRestaurant)

router.post('/reviews/:id', protect, restaurantExist ,createRestaurantReview)

router
    .route('/reviews/:restaurantId/:id')
    .patch(protect,restaurantExist,updateRestaurantReview)
    .delete(protect,restaurantExist,deleteRestaurantReview)

