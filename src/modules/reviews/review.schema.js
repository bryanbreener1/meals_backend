import { extractValidateData } from "../../common/extractValidateData.js";
import z from 'zod'


export const reviewSchema = z.object({
    comment: z.string(),
    rating: z.number().int().max(5)
})



export const validateReview = (data) => {
 const result = reviewSchema.safeParse(data);
 const {hasError, errorMessages, data: reviewData} = extractValidateData(result);
 return {
  hasError,
  errorMessages,
  reviewData
 }
}

export const validateUpdateReview = (data) => {
    const result = reviewSchema.partial().safeParse(data);
    const {hasError, errorMessages, data: reviewData} = extractValidateData(result);
    return {
     hasError,
     errorMessages,
     reviewData
    }
   }