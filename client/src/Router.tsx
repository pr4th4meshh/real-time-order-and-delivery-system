import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import Landing from "./pages/landing"
import { AuthRoute } from "./AuthRoute"
import Cart from "./pages/cart"
import CustomerDashboard from "./pages/dashboard/customer"
import PartnerDashboard from "./pages/dashboard/partner"
import AdminDashboard from "./pages/dashboard/admin"
import ManageUsers from "./pages/dashboard/admin/users"
import Profile from "./pages/dashboard/profile"
import AdminProducts from "./pages/dashboard/admin/products"

export const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register role="customer" />} />
      <Route path="/auth/register/partner" element={<Register role="partner" />} />
      <Route path="/auth/register/admin" element={<Register role="admin" />} />

      {/* Customer Routes */}
      <Route element={<AuthRoute allowedRoles={["customer"]} />}>
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Partner Routes */}
      <Route element={<AuthRoute allowedRoles={["partner"]} />}>
        <Route path="/dashboard/partner" element={<PartnerDashboard />} />
        <Route path="/dashboard/partner/profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AuthRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/products" element={<AdminProducts />} />
        <Route path="/dashboard/admin/users" element={<ManageUsers />} />
        <Route path="/dashboard/admin/profile" element={<Profile />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  )
}
