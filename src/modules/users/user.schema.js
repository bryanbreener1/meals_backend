import z from "zod";
import { extractValidateData } from "../../common/extractValidateData.js";

export const userSchema = z.object({
  name: z.string().max(150),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["normal", "admin"]),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const updateSchema = z.object({
  email: z.string().email(),
  name: z.string().max(150),
});

export const validateUser = (data) => {
  const result = userSchema.safeParse(data);
  const {
    hasError,
    errorMesages,
    data: userData,
  } = extractValidateData(result);
  return {
    hasError,
    errorMesages,
    userData,
  };
};

export const validateUpdatelUser = (data) => {
  const result = updateSchema.partial().safeParse(data);
  const {
    hasError,
    errorMesages,
    data: userData,
  } = extractValidateData(result);
  return {
    hasError,
    errorMesages,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginSchema.safeParse(data);
  const {
    hasError,
    errorMesages,
    data: userData,
  } = extractValidateData(result);
  return {
    hasError,
    errorMesages,
    userData,
  };
};
