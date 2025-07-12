import { BACKEND_URL } from "@/lib/config"
import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})