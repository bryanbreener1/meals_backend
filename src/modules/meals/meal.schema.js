import z from 'zod'
import { extractValidateData } from '../../common/extractValidateData.js';

export const mealSchema = z.object({
    name: z.string(),
    price: z.number(),
});

export const validateMeal = (data) => {
 const result = mealSchema.safeParse(data);
 const {hasError, errorMessages, data: mealData} = extractValidateData(result);
 return {
  hasError,
  errorMessages,
  mealData
 };
};

export const validatePartialMeal = (data) => {
 const result = mealSchema.partial().safeParse(data);
 const {hasError, errorMessages, data: mealData} = extractValidateData(result);
 return {
  hasError,
  errorMessages,
  mealData
 };
};