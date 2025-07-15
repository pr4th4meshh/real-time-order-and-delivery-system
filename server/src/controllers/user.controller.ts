import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { ApiResponse } from "../utils/apiResponse"

export const getAllUsers = async (req: Request, res: Response) => {
  const currentUserId = req.user.id
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },
      },
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

export const updateUserDetails = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, email } = req.body
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
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
      message: "User details updated successfully",
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
