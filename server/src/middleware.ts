import { Role, User } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { ApiResponse } from "./utils/apiResponse"
import jwt from "jsonwebtoken"
import { prisma } from "./lib/prisma"

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1]

  // Fall back to cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token
  }

  if (!token) {
    return ApiResponse({
      res,
      status: 401,
      success: false,
      message: "Unauthorized",
      data: null,
    })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    })

    if (!user) {
      return ApiResponse({
        res,
        status: 401,
        success: false,
        message: "Unauthorized",
        data: null,
      })
    }
    req.user = user
    next()
  } catch (error) {
    return ApiResponse({
      res,
      status: 401,
      success: false,
      message: "Unauthorized",
      data: null,
    })
  }
}

export const requireRole =
  (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" })
    }
    next()
  }
