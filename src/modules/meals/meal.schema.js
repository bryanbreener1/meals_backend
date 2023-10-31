import z from 'zod'
import { extractValidateData } from '../../common/extractValidateData.js';

export const mealSchema = z.object({
    name: z.string(),
    price: z.number(),
});

export const validateMeal = (data) => {
 const result = mealSchema.safeParse(data);
 const {hasError, errorMesages, data: mealData} = extractValidateData(result);
 return {
  hasError,
  errorMesages,
  mealData
 };
};

export const validatePartialMeal = (data) => {
 const result = mealSchema.partial().safeParse(data);
 const {hasError, errorMesages, data: mealData} = extractValidateData(result);
 return {
  hasError,
  errorMesages,
  mealData
 };
};