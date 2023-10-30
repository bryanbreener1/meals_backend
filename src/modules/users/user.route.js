import { Router } from 'express';
import {
    createUser, 
    deleteUser, 
    login,
    updateUser

} from './user.controller.js';
import { protect, validExistUser } from './user.middleware.js';


export const router = Router();

router.post('/signup', createUser)
router.post('/login', login)
router.patch('/:id', protect, validExistUser ,updateUser)
router.delete('/:id', protect, validExistUser ,deleteUser)




