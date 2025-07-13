import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import Landing from "./pages/landing"
import { AuthRoute } from "./AuthRoute"

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
        <Route path="/dashboard" element={<div>Customer Dashboard</div>} />
      </Route>

      <Route element={<AuthRoute allowedRoles={["partner"]} />}>
        <Route path="/dashboard/partner" element={<div>Partner Dashboard</div>} />
      </Route>

      <Route element={<AuthRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<div>Admin Dashboard</div>} />
      </Route>

      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  )
}
