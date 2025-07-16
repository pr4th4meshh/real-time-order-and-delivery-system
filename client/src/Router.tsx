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
import AdminProducts from "./pages/dashboard/admin/products"
import CustomerProfile from "./pages/dashboard/customer/profile"
import PartnerProfile from "./pages/dashboard/partner/profile"
import AdminProfile from "./pages/dashboard/admin/profile"

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
        <Route path="/dashboard/profile" element={<CustomerProfile />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Partner Routes */}
      <Route element={<AuthRoute allowedRoles={["partner"]} />}>
        <Route path="/dashboard/partner" element={<PartnerDashboard />} />
        <Route path="/dashboard/partner/profile" element={<PartnerProfile />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AuthRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/products" element={<AdminProducts />} />
        <Route path="/dashboard/admin/users" element={<ManageUsers />} />
        <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  )
}
