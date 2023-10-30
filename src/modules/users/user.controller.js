import { verifyPassword } from "../../config/plugins/encrypted-password.plugin.js"
import generateJWT from "../../config/plugins/generate-jwt.plugin.js"
import { AppError } from "../../errors/appError.js"
import { catchAsync } from "../../errors/catchAsync.js"
import { validateLogin, validateUpdatelUser, validateUser } from "./user.schema.js"
import { UserService } from "./user.service.js"

const userService = new UserService()


export const createUser = catchAsync(async(req, res, next) => {
    const {hasError, errorMesages, userData} = validateUser(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            message: errorMesages
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
    const {hasError, errorMesages, userData} = validateLogin(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            message: errorMesages
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
    const{hasError, errorMesages, userData} = validateUpdatelUser(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            message: errorMesages
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