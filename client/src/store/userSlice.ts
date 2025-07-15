import { StateCreator } from "zustand"
import { checkUserStatus } from "@/hooks/auth/useIsAuthenticated"
import { StoreState } from "./store"
import { IUser } from "@/types/user.types"

interface UserState {
  user: {
    id: string | null
    email: string | null
    name: string | null
    role: IUser["role"]
  }
  isAuthorized: boolean
  error: string | null
  isLoading: boolean
}

interface UserActions {
  setUser: (
    id: string | null,
    email: string | null,
    name: string | null,
    role: string | null
  ) => void
  setIsAuthorized: (value: boolean) => void
  logoutUser: () => void
  fetchUserStatus: () => Promise<void>
}

export type UserSlice = UserState & UserActions

export const createUserSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: {
    id: null,
    email: null,
    name: null,
    role: null,
  },
  isAuthorized: false,
  isLoading: true,
  error: null,
  setUser: (
    id: string | null,
    email: string | null,
    name: string | null,
    role: string | null
  ) =>
    set((state) => ({
      ...state,
      user: {
        id,
        email,
        name,
        role,
      },
    })),
  setIsAuthorized: (value: boolean) =>
    set((state) => ({
      ...state,
      isAuthorized: value,
    })),
  logoutUser: () => {
    set(() => ({
      user: {
        id: null,
        email: null,
        name: null,
        role: null,
      },
      isAuthorized: false,
    }))
  },
  fetchUserStatus: async () => {
    set((state) => ({
      ...state,
      isLoading: true,
      error: null,
    }))

    try {
      const { data: apiResponse, isAuthorized } = await checkUserStatus()
      const user = apiResponse.data
      set((state) => ({
        ...state,
        isAuthorized,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        isLoading: false,
      }))
    } catch (error: unknown) {
      set((state) => ({
        ...state,
        error:
          (error instanceof Error ? error.message : "Unknown error") ||
          "Failed to fetch user status",
        isAuthorized: false,
        isLoading: false,
      }))
    }
  },
})
