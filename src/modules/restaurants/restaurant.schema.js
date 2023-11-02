import { extractValidateData } from "../../common/extractValidateData.js";
import z from "zod";
export const restaurantSchema = z.object({
  name: z.string(150),
  address: z.string(255),
  rating: z.number().int().max(5),
});

export const restaurantSchemaUpdate = z.object({
  name: z.string(150),
  address: z.string(255),
});

export const validateRestaurant = (data) => {
  const result = restaurantSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidateData(result);
  return {
    hasError,
    errorMessages,
    restaurantData,
  };
};

export const validatePartialRestaurant = (data) => {
  const result = restaurantSchemaUpdate.partial().safeParse(data);
  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidateData(result);
  return {
    hasError,
    errorMessages,
    restaurantData,
  };
};
