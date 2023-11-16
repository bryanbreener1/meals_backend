import { AppError } from "../../errors/appError.js";
import { catchAsync } from "../../errors/catchAsync.js";
import { MealService } from "../meals/meal.service.js";
import { validateOrder } from "./order.schema.js";
import { OrderService } from "./order.service.js";


const mealService = new MealService()
const orderService = new OrderService()

export const createOrder = catchAsync(async(req,res,next)=>{
    const {userSession} = req
    //buscar la comida MEAL si no, enviar error
    const {hasError, errorMessages, orderData} = validateOrder(req.body)

    if(hasError){
        return res.status(403).json({
            status: 'error',
            message: errorMessages
        })
    }

    const meal = await mealService.findOneMeal(orderData.mealId)
    

    if(!meal){
        return next(new AppError(`meal with id ${orderData.mealId} not found`,404))
    }

    // Calcular el precio para el usuario, multiplicar el precio de la comida (meal) encontrada previamente,por la cantidad solicitada por el usuario.
    
    const totalPrice = meal.price * orderData.quantity

    //Crear una nueva orden, pasando el precio calculado, el mealId de la comida ya encontrada y la cantidad solicitada por el usuario.
    orderData.userId = userSession.id
    orderData.totalPrice = totalPrice

    const order = await orderService.createOrder(orderData)

    return res.status(200).json(order)
})


export const updateOrder = catchAsync(async(req,res,next)=>{
    const {userSession} = req
    const {id} = req.params
    const order = await orderService.findOneOrder(userSession.id,id)
    
    if(!order){
        return next(new AppError(`order with id ${id} not found`,404))
    }
    if(userSession.id !== order.userId){
        return next(new AppError(`you can not update order that do not belongs you`,401))
    }
    if(order.status !== 'active'){
        return next(new AppError(`order with id ${id} found, but its status is not active, it can not be updated`,404))
    }

    const mealUpdated = await orderService.updateOrder(order)

    return res.status(200).json(mealUpdated)
})



export const deleteOrder = catchAsync(async(req,res,next)=>{
    const {userSession} = req
    const {id} = req.params
    const order = await orderService.findOneOrder(userSession.id,id)
    if(!order){
        return next(new AppError(`order with id ${id} not found`,404))
    }
    if(userSession.id !== order.userId){
        return next(new AppError(`you can not update order that do not belongs you`,401))
    }
    if(order.status !== 'active'){
        return next(new AppError(`order with id ${id} found, but its status is not active, it can not be deleted`,404))
    }
    await orderService.deleteOrder(order)

    return res.status(200).json(null)
})

export const findAllOrderByUser = catchAsync(async(req,res,next)=>{
    const {userSession} = req
    const orders = await orderService.findAllOrderByUser(userSession.id)
    return res.json(orders)
})