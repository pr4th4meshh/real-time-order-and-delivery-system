import { Request, Response } from "express"
import { ApiResponse } from "../utils/apiResponse"
import { prisma } from "../lib/prisma"

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, imageUrl, qty } = req.body
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        qty
      },
    })
    return ApiResponse({
      res,
      success: true,
      message: "Product created successfully",
      data: product,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Product creation failed",
      data: error,
    })
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany()
    return ApiResponse({
      res,
      success: true,
      message: "Products fetched successfully",
      data: products,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Products fetching failed",
      data: error,
    })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })
    if (!product) {
      return ApiResponse({
        res,
        status: 404,
        success: false,
        message: "Product not found",
        data: null,
      })
    }
    return ApiResponse({
      res,
      success: true,
      message: "Product fetched successfully",
      data: product,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Product fetching failed",
      data: error,
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description, price, imageUrl } = req.body
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        imageUrl,
      },
    })
    return ApiResponse({
      res,
      success: true,
      message: "Product updated successfully",
      data: product,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Product updating failed",
      data: error,
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    })
    return ApiResponse({
      res,
      success: true,
      message: "Product deleted successfully",
      data: product,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Product deletion failed",
      data: error,
    })
  }
}