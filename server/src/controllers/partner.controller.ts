import { Request, Response } from "express"
import { ApiResponse } from "../utils/apiResponse"
import { prisma } from "../lib/prisma"

export const getAllPartners = async (req: Request, res: Response) => {
  try {
    const partners = await prisma.user.findMany({
      where: {
        role: "partner",
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
      message: "Partners fetched successfully",
      data: partners,
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

export const getPartnerById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const partner = await prisma.user.findUnique({
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

    if (!partner) {
      return ApiResponse({
        res,
        status: 404,
        success: false,
        message: "Partner not found",
        data: null,
      })
    }
    return ApiResponse({
      res,
      success: true,
      message: "Partner fetched successfully",
      data: partner,
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

export const createPartner = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body
  try {
    const partner = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password,
        role,
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
      message: "Partner created successfully",
      data: partner,
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

export const updatePartnerRole = async (req: Request, res: Response) => {
  const { id } = req.params
  const { role } = req.body
  try {
    const partner = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
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
      message: "Partner role updated successfully",
      data: partner,
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

export const deletePartner = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const partner = await prisma.user.delete({
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
    return ApiResponse({
      res,
      success: true,
      message: "Partner deleted successfully",
      data: partner,
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
