export interface IUser {
  email: string | null
  name: string | null
  role: 'customer' | 'partner' | 'admin' | null
}