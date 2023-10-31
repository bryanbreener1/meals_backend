import User from "./user.model.js"
import Reviews from '../reviews/review.model.js'
import Order from "../orders/order.model.js"
import Restaurant from "../restaurants/restaurant.model.js"
import Meal from "../meals/meal.model.js"


export class UserService {

    async createUser(data){
        return await User.create(data)
    }

    async findUserByEmail(email){
        return await User.findOne({
            where:{
                email,
                status: true
            }
        })
    }

    async findOneUserById(id){
        return await User.findOne({
            where:{
                id,
                status:true
            }
        })
    }

    async updateUser(user,data){
        return await user.update(data)
    }

    async deleteUser(user){
        return await user.update({status:false})
    }

    async findAllReviewsByUser(id){
        return await User.findOne({
            where:{
                id,
                status: true
            },
            include:{
                model:Reviews,
                as:'userCreateReview'
            }
        })
    }
    async findOneReviewById(user,id){
        return await User.findOne({
            where:{
                id:user.id,
                status: true
            },
            include:{
                model:Reviews,
                as:'userCreateReview',
                where:{
                    id
                }
            }
        })
    }


    async findAllOrderByUser(id){
        return await User.findOne({
            where:{
                id,
                status: true
            },
            include:{
                model:Order,
                as:'userHasOrders',
                include:{
                    model: Meal,
                    as:'mealHasOneOrder',
                    include:{
                        model:Restaurant,
                        as:'mealBelongsRestaurant'
                    }
                }
            }
        })
    }
    async findOneOrderById(user,id){
        return await User.findOne({
            where:{
                id:user.id,
                status: true
            },
            include:{
                model:Order,
                as:'userHasOrders',
                where:{
                    id
                },
                include:{
                    model: Meal,
                    as:'mealHasOneOrder',
                    include:{
                        model:Restaurant,
                        as:'mealBelongsRestaurant'
                    }
                }
            }
        })
    }
}
