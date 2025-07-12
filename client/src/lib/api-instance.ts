import { BACKEND_URL } from "@/lib/config"
import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})