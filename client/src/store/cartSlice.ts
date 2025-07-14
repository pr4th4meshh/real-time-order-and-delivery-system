import { StateCreator } from "zustand"
import { StoreState } from "./store"
import { IProduct } from "@/types/product.types"

interface CartItem extends IProduct {
  quantity: number
}

export interface CartState {
  cart: CartItem[]
}

export interface CartActions {
  addToCart: (product: IProduct) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export type CartSlice = CartState & CartActions

export const createCartSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    }),
  removeFromCart: (id) =>
    set((state) => {
      const index = state.cart.findIndex((item) => item.id === id)
      if (index !== -1) {
        const item = state.cart[index]
        item.quantity -= 1
        if (item.quantity <= 0) {
          state.cart.splice(index, 1)
        }
      }
    }),
  clearCart: () =>
    set((state) => {
      state.cart = []
    }),
})
