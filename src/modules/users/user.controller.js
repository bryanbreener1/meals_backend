import { or } from "sequelize"
import { verifyPassword } from "../../config/plugins/encrypted-password.plugin.js"
import generateJWT from "../../config/plugins/generate-jwt.plugin.js"
import { AppError } from "../../errors/appError.js"
import { catchAsync } from "../../errors/catchAsync.js"
import { OrderService } from "../orders/order.service.js"
import { validateLogin, validateUpdatelUser, validateUser } from "./user.schema.js"
import { UserService } from "./user.service.js"

const userService = new UserService()
const orderService = new OrderService()

export const createUser = catchAsync(async(req, res, next) => {
    const {hasError, errorMessages, userData} = validateUser(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userService.createUser(userData)

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user:{
            name:user.name,
            email:user.emial,
            role:user.role,
            status:user.status
        }
    })
})


export const login = catchAsync(async(req,res,next) => {
    const {hasError, errorMessages, userData} = validateLogin(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userService.findUserByEmail(userData.email)

    if(!user) return next(new AppError('password or email incorrect', 401))

    const rightPassword = await verifyPassword(userData.password, user.password)

    if(!rightPassword) return next(new AppError('password or email incorrect', 401))

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user:{
            name:user.name,
            email:user.emial,
            role:user.role,
            status:user.status
        }
    })

})


export const updateUser = catchAsync(async(req,res,next)=>{
    const userSession = req.userSession
    const user = req.user 
    if(userSession.id !== user.id){
        return next(new AppError('you can not edit accounts that not belongs you', 400))
    }
    const{hasError, errorMessages, userData} = validateUpdatelUser(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            message: errorMessages
        })
    }
    await userService.updateUser(userSession, userData)
    
    return res.status(201).json({
        message: 'your information has been updated successfully'
    })
})


export const deleteUser = catchAsync(async(req,res,next)=>{
    const userSession = req.userSession
    const user = req.user 
    if(userSession.id !== user.id){
        return next(new AppError('you can not edit accounts that not belongs you', 400))
    }
    await userService.deleteUser(userSession)
    return res.status(204).json(null)
})

export const findAllReviewByUser = catchAsync(async(req,res,next)=>{
    const userSession = req.userSession
    const reviewsByUser = await userService.findAllReviewsByUser(userSession.id)
    if(!reviewsByUser){
        return next(new AppError(`you do not have reviews yet`, 404))
    }
    return res.status(200).json(reviewsByUser)
})

export const findOneReviewById = catchAsync(async(req,res,next)=>{
    const userSession = req.userSession
    const {id} = req.params
    const oneReviewById = await userService.findOneReviewById(userSession,id)
    if(!oneReviewById){
        return next(new AppError(`order with id: ${id} not found`, 404))
    }
    return res.status(200).json(oneReviewById)
})

export const findAllOrderByUser = catchAsync(async(req,res,next)=>{
    const userSession = req.userSession
    //const ordersByUser = await userService.findAllOrderByUser(userSession.id)
    const ordersByUser = await orderService.findAllOrderByUser(userSession.id)
    
    if(!ordersByUser){
        return next(new AppError(`you do not have reviews yet`, 404))
    }
    return res.status(200).json(ordersByUser)
})

export const findOneOrderById = catchAsync(async(req,res,next)=>{
    const userSession = req.userSession
    const {id} = req.params
    const oneOrderById = await orderService.findOneOrder(userSession.id,id)
    if(!oneOrderById){
        return next(new AppError(`order with id: ${id} not found`, 404))
    }
    return res.status(200).json(oneOrderById)
}) 