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

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />

      <Route path="/auth/register" element={<Register role="customer" />} />
      <Route
        path="/auth/register/partner"
        element={<Register role="partner" />}
      />
      <Route path="/auth/register/admin" element={<Register role="admin" />} />

      <Route element={<AuthRoute allowedRoles={["customer"]} />}>
        <Route path="/dashboard" element={<CustomerDashboard />} />
      </Route>

      <Route element={<AuthRoute allowedRoles={["partner"]} />}>
        <Route path="/dashboard/partner" element={<PartnerDashboard />} />
      </Route>

      <Route element={<AuthRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<AuthRoute allowedRoles={["customer"]} />}>
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  )
}
