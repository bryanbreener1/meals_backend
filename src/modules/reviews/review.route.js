import { Router } from 'express';
import {
    findAllReview,
    findOneReview,
    createReview,
    updateReview,
    deleteReview,
} from './review.controller.js';
import { reviewExist } from './review.middleware.js'

export const router = Router();

router
    .route('/')
    .get(findAllReview)
    .post(createReview);

router
    .use('/:id', reviewExist)
    .route('/:id')
    .patch(updateReview)
    .get(findOneReview)
    .delete(deleteReview)
