import { AppError } from "../../errors/appError.js";
import { MealService } from "./meal.service.js";

const mealService = new MealService();

export const mealExist = async(req, res, next) => {
    const { id } = req.params;
    const meal = await mealService.findOneMeal(id)
    if (!meal) {
        return next(new AppError(`meal with id ${id} not found`))
    }
    req.meal = meal
    next()
}

