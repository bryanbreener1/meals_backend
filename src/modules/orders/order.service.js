import Order from "./order.model.js";
import Meal from "../meals/meal.model.js";
import Restaurant from "../restaurants/restaurant.model.js";

export class OrderService{

    async createOrder(data){
        return await Order.create(data)
    }
    
    async updateOrder(order){
        return await order.update({status:'completed'})
    }
    async deleteOrder(order){
        return await order.update({status:'cancelled'})
    }
    async findOneOrder(userId, id){
        return await Order.findOne({
            where:{
                id,
                status:'active',
                userId:userId
            },
            attributes:['order_id','userId', 'mealId'],
            include:[
                {
                    model: Meal,
                    as: 'mealHasOneOrder',
                    attributes: ['name', 'price', 'restaurantId'],
                    include:{
                        model: Restaurant,
                        as: 'mealBelongsRestaurant',
                        attributes: ['name', 'address','rating']
                    }
                }
            ]
        })
    }
    async findAllOrderByUser(id){
        return await Order.findAll({
            where:{
                userId:id,
                status:'active',
            },
            attributes:['order_id','userId', 'mealId'],
            include:[
                {
                    model: Meal,
                    as: 'mealHasOneOrder',
                    attributes: ['name', 'price', 'restaurantId'],
                    include:{
                        model: Restaurant,
                        as: 'mealBelongsRestaurant',
                        attributes: ['name', 'address','rating']
                    }
                }
            ]
        })
    }
}