import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<div>landing</div>} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Routes>
  )
}
