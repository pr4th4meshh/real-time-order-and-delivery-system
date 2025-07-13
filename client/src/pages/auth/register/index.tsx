import React, { useState } from "react"
import type { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRoleRegister } from "@/hooks/auth/useRoleRegister"
import { registerSchema } from "@/lib/zod/registerSchema"
import { toast } from "sonner"
import { validateSchema } from "@/lib/zod/template"

interface SignupFormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterPageProps {
  role: 'customer' | 'partner' | 'admin'
}

const RegisterPage = ({ role }: RegisterPageProps) => {
  const navigate = useNavigate()
  const { isPending, mutate } = useRoleRegister(role)

  const [formData, setFormData] = useState<SignupFormProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const getRoleTitle = () => {
    switch (role) {
      case 'customer': return 'Customer'
      case 'partner': return 'Delivery Partner'
      case 'admin': return 'Admin'
      default: return 'User'
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { data, error } = validateSchema(registerSchema, formData)
    if (error) return toast.error("Invalid data")

    mutate(data, {
      onSuccess: () => {
        navigate("/auth/login")
        toast.success(`${getRoleTitle()} account created successfully!`)
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.")
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Register as {getRoleTitle()}
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to create your {getRoleTitle().toLowerCase()} account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
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
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            {role === 'admin' && (
              <div className="p-4 bg-red-50 rounded-md">
                <p className="text-sm text-red-700">
                  Admin registration is restricted. You'll need approval from existing admins.
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending || role === 'admin'}>
              {isPending ? "Creating Account..." : `Register as ${getRoleTitle()}`}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </a>
          </div>

          {role !== 'admin' && (
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">
                Want to register as {role === 'customer' ? 'delivery partner' : 'customer'}?{' '}
              </span>
              <a 
                href={role === 'customer' ? '/register/partner' : '/register/customer'} 
                className="text-blue-600 hover:underline font-medium"
              >
                Click here
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage