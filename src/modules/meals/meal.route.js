import { Router } from 'express';
import {
    findAllMeal,
    findOneMeal,
    createMeal,
    updateMeal,
    deleteMeal,
} from './meal.controller.js';
import { mealExist } from './meal.middleware.js';
import { protect, restrictTo } from '../users/user.middleware.js';

export const router = Router();

router.get('/',findAllMeal)

router.post('/:id',protect, restrictTo('admin'), createMeal)

router
    .use('/:id', mealExist)
    .route('/:id')
    .get(findOneMeal)
    .patch(protect, restrictTo('admin'), updateMeal)
    .delete(protect, restrictTo('admin'), deleteMeal)
