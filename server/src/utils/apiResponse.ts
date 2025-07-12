import { Response } from "express"

type ApiResponseOptions = {
  res: Response
  status?: number
  success: boolean
  message: string
  data?: any
}

export function ApiResponse({
  res,
  status = 200,
  success,
  message,
  data = null,
}: ApiResponseOptions) {
  return res.status(status).json({
    success,
    message,
    data,
  })
}