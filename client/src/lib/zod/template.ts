import { z } from "zod";

export const validateSchema = <T>(
  schema: z.ZodSchema<T>,
  inputData: unknown,
) => {
  const result = schema.safeParse(inputData);
  return result;
};