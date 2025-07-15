export interface IUser {
  id: string | null
  email: string | null
  name: string | null
  role: 'customer' | 'partner' | 'admin' | null
}

export interface IUserResponse {
  success: boolean
  message: string
  data: [
    {
      id: string
      name: string
      email: string
      role: string
    }
  ]
}