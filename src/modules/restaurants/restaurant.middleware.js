import { AppError } from "../../errors/appError.js";
import { RestaurantService } from "./restaurant.service.js";

const restaurantService = new RestaurantService();

export const restaurantExist = async(req, res, next) => {

    const { id, restaurantId } = req.params;
    const restaurant = await restaurantService.findOneRestaurant(id, restaurantId)
    if (!restaurant) {
        return next(new AppError(`restaurant with id id not found`))
    }
    req.restaurant = restaurant
    next()
}