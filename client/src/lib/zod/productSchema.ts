import z from "zod";

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string().optional(),
    qty: z.number(),
})

export const updateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    imageUrl: z.string().optional(),    
    qty: z.number().optional(),
})