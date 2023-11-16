import { Router } from 'express';
import {
    createUser, 
    deleteUser, 
    findAllOrderByUser, 
    findAllReviewByUser, 
    findOneOrderById, 
    findOneReviewById, 
    login,
    updateUser

} from './user.controller.js';
import { protect, validExistUser } from './user.middleware.js';


export const router = Router();

router.post('/signup', createUser)
router.post('/login', login)

router.patch('/:id', protect, validExistUser ,updateUser)
router.delete('/:id', protect, validExistUser ,deleteUser)
router.get('/orders', protect, findAllOrderByUser)
router.get('/orders/:id', protect, findOneOrderById)


router.get('/reviews',protect, findAllReviewByUser)
router.get('/reviews/:id',protect, findOneReviewById) 




