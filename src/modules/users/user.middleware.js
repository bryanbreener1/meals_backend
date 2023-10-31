import { catchAsync } from "../../errors/catchAsync.js";
import {promisify} from 'util';
import jwt from 'jsonwebtoken'
import { envs } from "../../config/enviroments/enviroments.js";
import { UserService } from "./user.service.js";
import { AppError } from "../../errors/appError.js";

const userService = new UserService()

export const protect = catchAsync(async(req,res,next)=>{
    let token;
    
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next(
            new AppError('You are not logged in!, Please log in to get access', 401)
          )
    }

    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWT_SEED
    )

    const user = await userService.findOneUserById(decoded.id)

    if(!user){
        return next(
          new AppError('The owner of this token is not longer available', 401)
        )
    }

    req.userSession = user
    next()
})

export const validExistUser = catchAsync(async(req,res,next) => {
    const { id } = req.params;
  
    const user = await userService.findOneUserById(id)
  
    if(!user){
      return next(new AppError('User not found', 404))
    }
  
    req.user = user;
    next()
})

export const restrictTo = (...roles) => {
    return (req, res, next) => {
      if(!roles.includes(req.sessionUser.role)){
        return next(new AppError('You do not have permission to perform this action', 403))
      }
      next();
    }
  }