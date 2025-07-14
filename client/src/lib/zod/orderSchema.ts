import z from "zod"

export const placeOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      qty: z.number(),
    })
  ),
})
