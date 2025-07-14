import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { createUserSlice, UserSlice } from "./userSlice"
import { CartSlice, createCartSlice } from "./cartSlice"

export type StoreState = UserSlice & CartSlice

export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((set, get, store) => ({
        ...createUserSlice(set, get, store),
        ...createCartSlice(set, get, store)
      })),
      {
        name: "app-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user ?? null,
          cart: state.cart ?? [],
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.fetchUserStatus()
          }
        },
      }
    ),
    {
      name: "Real Time Delivery Updates",
    }
  )
)