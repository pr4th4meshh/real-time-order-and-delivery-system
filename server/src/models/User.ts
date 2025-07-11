import mongoose from "mongoose"

export interface IUser {
  name: string
  email: string
  passwordHash: string
  role: "customer" | "partner" | "admin"
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "partner", "admin"],
    default: "customer",
  },
})

export const User = mongoose.model<IUser>("User", UserSchema)
