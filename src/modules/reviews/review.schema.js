import { extractValidateData } from "../../common/extractValidateData.js";
import z from 'zod'


export const reviewSchema = z.object({
    userId: z.number().int(),
    comment: z.string(),
    restaurantId : z.number().int(),
    rating: z.number().max(5)
})

export const reviewUpdateSchema = z.object({
    comment: z.string(),
    rating: z.number().max(5)
})

export const validateReview = (data) => {
 const result = reviewSchema.safeParse(data);
 const {hasError, errorMesages, data: reviewData} = extractValidateData(result);
 return {
  hasError,
  errorMesages,
  reviewData
 }
}

export const validateUpdateReview = (data) => {
    const result = reviewUpdateSchema.safeParse(data);
    const {hasError, errorMesages, data: reviewData} = extractValidateData(result);
    return {
     hasError,
     errorMesages,
     reviewData
    }
   }