import { extractValidateData } from "../../common/extractValidateData.js";
import z from 'zod'


export const reviewSchema = z.object({
    userId: z.number().int(),
    comment: z.string(),
    restaurantId : z.number().int(),
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

export const validatePartialReview = (data) => {
 const result = reviewSchema.partial().safeParse(data);
 const {hasError, errorMesages, data: reviewData} = extractValidateData(result);
 return {
  hasError,
  errorMesages,
  reviewData
 }
}