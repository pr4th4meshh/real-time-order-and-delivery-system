export interface IRegisterResponse {
  success: boolean
  message: string
  data: {
    id: string
    name: string
    email: string
    role: string
  }
}

export interface ILoginResponse {
    success: boolean
    message: string
    data: {
      id: string
      name: string
      email: string
      role: string
    }
  }