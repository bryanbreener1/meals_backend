import { catchAsync } from "../../errors/catchAsync.js";
import { validateMeal, validatePartialMeal } from "./meal.schema.js";
import { MealService } from "./meal.service.js";

const mealService = new MealService();

export const findAllMeal = catchAsync(async (req, res, next) => {
  const meals = await mealService.findAllMeal();
  return res.json(meals);
});

export const createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { hasError, errorMesages, mealData } = validateMeal(req.body);
  if (hasError) {
    return res.status(422).json({
      status: "error",
      messages: errorMesages,
    });
  }
  mealData.restaurantId = id;
  console.log(mealData);
  const meal = await mealService.createMeal(mealData);
  return res.status(201).json(meal);
});

export const findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  return res.status(200).json(meal);
});

export const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { hasError, errorMesages, mealData } = validatePartialMeal(req.body)
  if (hasError) {
    return res.status(422).json({
      status: "error",
      messages: errorMesages,
    });
  }
  const mealUpdated = await mealService.updateMeal(meal, mealData)
  return res.status(200).json(mealUpdated);
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await mealService.deleteMeal(meal);
  res.status(204).json(null);
});
