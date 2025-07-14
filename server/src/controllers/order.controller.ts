import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { ApiResponse } from "../utils/apiResponse"
import { OrderStatus } from "@prisma/client"

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { items } = req.body as {
      items: {
        productId: string
        qty: number
      }[]
    }

    const order = await prisma.order.create({
      data: {
        customerId: req.user.id,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    })

    return ApiResponse({
      res,
      message: "Order placed successfully",
      status: 201,
      success: true,
      data: order,
    })
  } catch (error) {
    return ApiResponse({
      res,
      message: "Something went wrong",
      status: 500,
      success: false,
      data: error,
    })
  }
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    let orders
    if (req.user.role === "customer") {
      orders = await prisma.order.findMany({
        where: {
          customerId: req.user.id,
        },
        include: {
          items: true,
        },
      })
    } else if (req.user.role === "partner") {
      orders = await prisma.order.findMany({
        where: {
          partner: null,
        },
        include: {
          items: true,
        },
      })
    } else {
      // admin sees all
      orders = await prisma.order.findMany({ include: { items: true } })
    }

    return ApiResponse({
      res,
      message: "Orders fetched successfully",
      status: 200,
      success: true,
      data: orders,
    })
  } catch (error) {
    return ApiResponse({
      res,
      message: "Something went wrong",
      status: 500,
      success: false,
      data: error,
    })
  }
}

// partner accepts order
export const acceptOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id
    const existing = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    })

    if (!existing) {
      return ApiResponse({
        res,
        message: "Order not found",
        status: 404,
        success: false,
        data: null,
      })
    }

    if (existing.partnerId) {
      return ApiResponse({
        res,
        message: "Already accepted",
        status: 401,
        success: false,
        data: null,
      })
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        partnerId: req.user!.id,
        status: OrderStatus.accepted,
      },
      include: {
        items: true,
      },
    })

    return ApiResponse({
      res,
      message: "Order accepted successfully",
      status: 200,
      success: true,
      data: order,
    })
  } catch (error) {
    return ApiResponse({
      res,
      message: "Something went wrong",
      status: 500,
      success: false,
      data: error,
    })
  }
}

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body as {
      status: OrderStatus
    }
    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: { items: true },
    })

    return ApiResponse({
      res,
      message: "Order status updated successfully",
      status: 200,
      success: true,
      data: updated,
    })
  } catch (error) {
    return ApiResponse({
      res,
      message: "Something went wrong",
      status: 500,
      success: false,
      data: error,
    })
  }
}
