import mongoose from "mongoose"

export interface IOrder {
  customer: mongoose.Types.ObjectId
  items: { productId: string; qty: number }[]
  status: "placed" | "accepted" | "picked" | "delivered"
  partner: mongoose.Types.ObjectId | null
  createdAt: Date
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [{ productId: String, qty: Number }],
    status: {
      type: String,
      enum: ["placed", "accepted", "picked", "delivered"],
      default: "placed",
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
)

export const Order = mongoose.model<IOrder>("Order", OrderSchema)
