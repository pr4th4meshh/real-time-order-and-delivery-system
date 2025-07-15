import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetAllUsers } from "@/hooks/user/useGetUsers"
import { useUpdateUserRole } from "@/hooks/global/useUpdateUserRole"
import { useDeletePartner } from "@/hooks/partners/useDeletePartner"
import { toast } from "sonner"

const roleOptions = ["all", "admin", "partner", "customer"]

const ManageUsersTable = () => {
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const { data: allUsersData, isLoading, refetch } = useGetAllUsers()
  const { mutate: updateRole } = useUpdateUserRole()
  const { mutate: deletePartner } = useDeletePartner()

  const allUsers = allUsersData?.data || []

  const filteredUsers =
    roleFilter === "all"
      ? allUsers
      : allUsers.filter((user) => user.role === roleFilter)

  const handleRoleChange = (id: string, role: string) => {
    updateRole([id, role], {
      onSuccess: () => {
        toast.success("Role updated successfully")
        refetch()
      },
      onError: () => toast.error("Failed to update role"),
    })
  }

  const handleDelete = (id: string) => {
    deletePartner(id, {
      onSuccess: () => {
        toast.success("User deleted")
        refetch()
      },
      onError: () => toast.error("Failed to delete user"),
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((role) => (
              <SelectItem key={role} value={role}>
                {role === "all"
                  ? "All Roles"
                  : role.charAt(0).toUpperCase() + role.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="p-4">Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center p-4">No users found for this role</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell className="space-x-2">
                    {user.role !== "admin" && (
                      <>
                        {["customer", "partner", "admin"]
                          .filter((role) => role !== user.role)
                          .map((role) => (
                            <Button
                              key={role}
                              size="sm"
                              variant="secondary"
                              onClick={() => handleRoleChange(user.id, role)}
                            >
                              Make {role}
                            </Button>
                          ))}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default ManageUsersTable
