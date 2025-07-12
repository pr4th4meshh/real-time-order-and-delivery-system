import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma"
import { ApiResponse } from "../utils/apiResponse"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = "customer" } = req.body
    const pwHash = await bcrypt.hash(password, 10)

    const userData = {
      name,
      email,
      passwordHash: pwHash,
      role,
    }

    if (role) userData.role = role

    const user = await prisma.user.create({
      data: userData,
    })

    return ApiResponse({
      res,
      success: true,
      message: "User registered successfully",
      data: user,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Registration failed",
      data: error,
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return ApiResponse({
        res,
        status: 401,
        success: false,
        message: "Invalid credentials",
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordCorrect) {
      return ApiResponse({
        res,
        status: 401,
        success: false,
        message: "Invalid credentials",
      })
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30 * 1000,
    })

    return ApiResponse({
      res,
      success: true,
      message: "Login successful",
      data: user,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Login failed",
      data: error,
    })
  }
}
