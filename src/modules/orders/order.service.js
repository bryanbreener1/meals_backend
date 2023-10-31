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
    async findOneOrder(id){
        return await Order.findOne({
            where:{
                id,
                status:'active'
            }
        })
    }
    async findAllOrderByUser(id){
        return await Order.findOne({
            where:{
                id,
                status:'active'
            },
            include:[
                {
                    model: Meal,
                    as: 'mealHasOneOrder',
                    include:{
                        model: Restaurant,
                        as: 'mealBelongsRestaurant'
                    }
                }
            ]
        })
    }
}