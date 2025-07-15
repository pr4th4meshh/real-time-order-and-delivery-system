export interface IPartnerResponse {
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