import { extractValidateData } from "../../common/extractValidateData.js";
import z from "zod";
export const restaurantSchema = z.object({
  name: z.string(150),
  address: z.string(255),
  rating: z.number(),
});

export const restaurantSchemaUpdate = z.object({
  name: z.string(150),
  address: z.string(255),
});

export const validateRestaurant = (data) => {
  const result = restaurantSchema.safeParse(data);
  const {
    hasError,
    errorMesages,
    data: restaurantData,
  } = extractValidateData(result);
  return {
    hasError,
    errorMesages,
    restaurantData,
  };
};

export const validatePartialRestaurant = (data) => {
  const result = restaurantSchemaUpdate.safeParse(data);
  const {
    hasError,
    errorMesages,
    data: restaurantData,
  } = extractValidateData(result);
  return {
    hasError,
    errorMesages,
    restaurantData,
  };
};
