import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { createUserSlice, UserSlice } from "./userSlice"

export type StoreState = UserSlice 

export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((set, get, store) => ({
        ...createUserSlice(set, get, store),
      })),
      {
        name: "app-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user ?? null,
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