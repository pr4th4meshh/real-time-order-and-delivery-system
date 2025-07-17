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

    // Check availability and atomically decrement
    const decrementedProducts: any[] = []

    for (const item of items) {
      const updated = await prisma.product.updateMany({
        where: {
          id: item.productId,
          qty: {
            gte: item.qty, // must have enough stock
          },
        },
        data: {
          qty: {
            decrement: item.qty,
          },
        },
      })

      if (updated.count === 0) {
        // Rollback if any product fails
        for (const rollback of decrementedProducts) {
          await prisma.product.update({
            where: { id: rollback.productId },
            data: { qty: { increment: rollback.qty } },
          })
        }

        return ApiResponse({
          res,
          status: 400,
          success: false,
          message: `Insufficient stock for product ${item.productId}`,
          data: null,
        })
      }

      decrementedProducts.push(item)
    }

    // ✅ Create order only if all stock updates succeed
    const order = await prisma.order.create({
      data: {
        customerId: req.user.id,
        items: {
          create: items,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
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
          items: {
            include: {
              product: true,
            }
          },
        },
      })
    } else if (req.user.role === "partner") {
      const type = req.query.type // "available" | "mine" | undefined

      if (req.user.role === "partner") {
        let condition
        if (type === "mine") {
          condition = { partnerId: req.user.id }
        } else if (type === "available") {
          condition = { partner: null }
        } else {
          condition = {
            OR: [{ partner: null }, { partnerId: req.user.id }],
          }
        }

        orders = await prisma.order.findMany({
          where: condition,
          include: {
            items: {
              include: { product: true },
            },
          },
        })
      }
    } else {
      // admin sees all
      orders = await prisma.order.findMany({
        include: {
          items: {
            include: { product: true },
          },
        },
      })
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
    const orderId = req.params.id;

    const existing = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existing) {
      return ApiResponse({
        res,
        message: "Order not found",
        status: 404,
        success: false,
        data: null,
      });
    }

    if (existing.partnerId) {
      console.log(`[BLOCKED] Order already accepted by partner ${existing.partnerId}`);
      return ApiResponse({
        res,
        message: "Order already accepted by another partner",
        status: 409,
        success: false,
        data: null,
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        partnerId: req.user!.id,
        status: OrderStatus.accepted,
      },
      include: {
        items: { include: { product: true } }, // optional, customize as needed
      },
    });

    console.log(`[ACCEPTED] Partner ${req.user!.id} accepted order ${orderId}`);

    return ApiResponse({
      res,
      message: "Order accepted successfully",
      status: 200,
      success: true,
      data: updatedOrder,
    });

  } catch (error: any) {
    console.error("Error accepting order:", error.message);
    return ApiResponse({
      res,
      message: "Something went wrong while accepting the order",
      status: 500,
      success: false,
      data: null,
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body as {
      status: OrderStatus
    }
    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
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
