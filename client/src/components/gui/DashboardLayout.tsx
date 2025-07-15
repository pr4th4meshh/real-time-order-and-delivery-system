import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"

import { useLocation, useNavigate } from "react-router-dom"
import { Home, Package, User, Truck } from "lucide-react"
import { useStore } from "@/store/store"
import { Button } from "../ui/button"
import { useLogout } from "@/hooks/auth/useLogout"

const DASHBOARD_MENU = {
  customer: [
    { label: "Home", icon: <Home />, href: "/dashboard" },
    { label: "Profile", icon: <User />, href: "/dashboard/profile" },
  ],
  partner: [
    { label: "Available Orders", icon: <Truck />, href: "/dashboard/partner" },
    { label: "Profile", icon: <User />, href: "/dashboard/partner/profile" },
  ],
  admin: [
    { label: "All Orders", icon: <Package />, href: "/dashboard/admin" },
    { label: "Manage Users", icon: <User />, href: "/dashboard/admin/users" },
  ],
}

interface DashboardLayoutProps {
  role: "customer" | "partner" | "admin"
  children: React.ReactNode
}

export default function DashboardLayout({
  role,
  children,
}: DashboardLayoutProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useStore()
  const { mutate: logout } = useLogout()

  const handleLogout = () => {
    logout()
    navigate("/auth/login")
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-lg font-semibold px-2">
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {DASHBOARD_MENU[role].map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  onClick={() => navigate(item.href)}
                  isActive={pathname === item.href}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex flex-col items-center justify-between p-4">
            <span className="mb-3"> Hello, {user.name} </span>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Navbar */}
        <div className="h-14 px-4 flex items-center justify-between border-b bg-background sticky top-0 z-50">
          <SidebarTrigger />
          <div className="font-medium">Welcome, {user.name}</div>
        </div>

        {/* Main content */}
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
