import { RestaurantService } from "./restaurant.service.js";

const restaurantService = new RestaurantService();

export const restaurantExist = async(req, res, next) => {
    const { id } = req.params;
    const restaurant = await restaurantService.findOneRestaurant(id)
    if (!restaurant) {
        return next(new AppError(`restaurant with id id not found`))
    }
    req.restaurant = restaurant
    next()
}