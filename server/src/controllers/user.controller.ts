import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { ApiResponse } from "../utils/apiResponse"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    return ApiResponse({
      res,
      success: true,
      message: "Users fetched successfully",
      data: users,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Something went wrong",
      data: error,
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    if (!user) {
      return ApiResponse({
        res,
        status: 404,
        success: false,
        message: "User not found",
        data: null,
      })
    }
    return ApiResponse({
      res,
      success: true,
      message: "User fetched successfully",
      data: user,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Something went wrong",
      data: error,
    })
  }
}