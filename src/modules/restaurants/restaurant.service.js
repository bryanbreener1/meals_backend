import Restaurant from "./restaurant.model.js"
import Review from '../reviews/review.model.js'

export class RestaurantService {

    async findAllRestaurant(){
        return await Restaurant.findAll({
            where:{
                status: true
            },
            attributes:['id', 'name','address','rating'],
            include:{
                model: Review,
                as: 'restaurantHasReviews',
                attributes:['userId','comment','rating']
            }
        })
    }

    async createRestaurant(data){
        return await Restaurant.create(data)
    }

    async findOneRestaurant(id, restaurantId){

        return await Restaurant.findOne({
            where:{
                id: restaurantId || id,
                status:true
            },
            attributes:['id', 'name','address','rating'],
            include:{
                model: Review,
                as: 'restaurantHasReviews',
                attributes:['userId','comment','rating']
            }
        })
    }

    async updateRestaurant(restaurant ,data){
        return await restaurant.update(data)
    }

    async deleteRestaurant(restaurant){
        return await restaurant.update({status:false})
    }

    async updateReview(restaurantId,reviewId){
        return await Restaurant.findOne({
            where:{
                id:restaurantId
            },
            include:{
                model: Review({
                    where:{
                        id:reviewId
                    }
                })
            }
        })
    }

}