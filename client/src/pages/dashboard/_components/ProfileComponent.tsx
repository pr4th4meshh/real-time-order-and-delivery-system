"use client"

import { useEffect, useState } from "react"
import { userSchema } from "@/hooks/user/useUpdateUser"
import { useUpdateUser } from "@/hooks/user/useUpdateUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { validateSchema } from "@/lib/zod/template"
import { IUser } from "@/types/user.types"

const ProfileComponent = ({ user }: { user: IUser }) => {
  const userId = user.id as string
  const { mutate: updateUser, isPending } = useUpdateUser()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name as string,
        email: user.email as string,
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = validateSchema(userSchema, formData)
    if (error) return toast.error("Invalid data")

    updateUser([userId, data], {
      onSuccess: () => toast.success("Profile updated successfully!"),
      onError: () => toast.error("Failed to update profile"),
    })
  }

  if (!user) return <div className="p-4">Loading profile...</div>

  return (
    <div className="max-w-md flex flex-col h-screen justify-center items-center mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  )
}

export default ProfileComponent
