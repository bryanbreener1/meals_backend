import Meal from "./meal.model.js";
import Restaurant from "../restaurants/restaurant.model.js";

export class MealService {
  async findAllMeal() {
    return await Meal.findAll({
      where: {
        status: true,
      },
      include:{
        model: Restaurant,
        as:'mealBelongsRestaurant'
      }
    })
  }

  async createMeal(data) {
    return await Meal.create(data);
  }

  async findOneMeal(id) {
    return await Meal.findOne({
      where: {
        id,
        status: true,
      },
      include:{
        model: Restaurant,
        as:'mealBelongsRestaurant'
      }
    })
  }

  async updateMeal(meal, data) {
    return await meal.update(data);
  }

  async deleteMeal(meal) {
    return await meal.update({ status: false });
  }
}
