"use client"

import React, { useState, useRef } from "react"
import type { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "@/hooks/auth/useLogin"
import { loginSchema } from "@/lib/zod/loginSchema"
import { toast } from "sonner"
import { validateSchema } from "@/lib/zod/template"
import { useStore } from "@/store/store"

interface LoginFormProps {
  email: string
  password: string
  keepMeSignedIn: boolean
}

const Login = () => {
  const navigate = useNavigate()
  const { isPending, mutate } = useLogin()
  const passwordInputRef = useRef(null)
  const { setIsAuthorized} = useStore()

  const [formData, setFormData] = useState<LoginFormProps>({
    email: "",
    password: "",
    keepMeSignedIn: false,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { error, data } = validateSchema(loginSchema, formData)
    if (error) return toast.error(error.message)

    mutate(
      { ...data },
      {
        onSuccess: () => {
          useStore.getState().fetchUserStatus()
          setIsAuthorized(true)
          navigate("/")
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Login failed.")
        },
      }
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                ref={passwordInputRef}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="keepMeSignedIn"
                  name="keepMeSignedIn"
                  type="checkbox"
                  checked={formData.keepMeSignedIn}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="keepMeSignedIn" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing In..." : "Sign In"}
            </Button>

            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">{"Don't have an account? "}</span>
              <a href="/register" className="text-blue-600 hover:underline font-medium">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login