import { Router } from "express";
import { createOrder, deleteOrder, findAllOrderByUser, updateOrder } from "./order.controller.js";
import { protect } from "../users/user.middleware.js";



export const router = Router()

router.use(protect)

router.post('/', createOrder)

router.get('/me', findAllOrderByUser)

router.patch('/:id', updateOrder)

router.delete('/:id', deleteOrder)


