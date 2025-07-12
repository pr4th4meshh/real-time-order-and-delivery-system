import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<div>landing</div>} />
      <Route path="/auth/login" element={<div>login</div>} />
      <Route path="/auth/register" element={<div>register</div>} />
    </Routes>
  )
}
