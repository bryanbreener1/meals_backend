import z from 'zod'
import { extractValidateData } from '../../common/extractValidateData.js'

export const orderSchema = z.object({
    mealId: z.number().int(),
    quantity: z.number().int(),
});

export const validateOrder = (data) => {
 const result = orderSchema.safeParse(data);
 const {hasError, errorMessages, data: orderData} = extractValidateData(result);
 return {
  hasError,
  errorMessages,
  orderData
 };
};

export const validatePartialOrder = (data) => {
 const result = orderSchema.partial().safeParse(data);
 const {hasError, errorMessages, data: orderData} = extractValidateData(result);
 return {
  hasError,
  errorMessages,
  orderData
 };
};