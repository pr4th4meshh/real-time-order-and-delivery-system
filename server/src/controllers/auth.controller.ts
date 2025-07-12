import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma"
import { ApiResponse } from "../utils/apiResponse"
import jwt from "jsonwebtoken"
import { User } from "@prisma/client"

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
    const { passwordHash, ...safeUser } = user

    return ApiResponse({
      res,
      success: true,
      message: "User registered successfully",
      data: safeUser,
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

    const { passwordHash, ...safeUser } = user

    return ApiResponse({
      res,
      success: true,
      message: "Login successful",
      data: safeUser,
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

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
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
    const { passwordHash, ...safeUser } = user
    return ApiResponse({
      res,
      success: true,
      message: "User fetched successfully",
      data: safeUser,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "User fetching failed",
      data: error,
    })
  }
}


export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    return ApiResponse({
      res,
      success: true,
      message: "Logout successful",
      data: null,
    })
  } catch (error) {
    return ApiResponse({
      res,
      status: 500,
      success: false,
      message: "Logout failed",
      data: error,
    })
  }
}
