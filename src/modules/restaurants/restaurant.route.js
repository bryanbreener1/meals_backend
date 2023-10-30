import { Router } from 'express';
import {
    findAllRestaurant,
    findOneRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from './restaurant.controller.js';
import { restaurantExist } from './restaurant.middleware.js'

export const router = Router();

router
    .route('/')
    .get(findAllRestaurant)
    .post(createRestaurant);

router
    .use('/:id', restaurantExist)
    .route('/:id')
    .patch(updateRestaurant)
    .get(findOneRestaurant)
    .delete(deleteRestaurant)
