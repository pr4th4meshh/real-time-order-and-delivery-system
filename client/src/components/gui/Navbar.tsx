import { useStore } from "@/store/store"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useLogout } from "@/hooks/auth/useLogout"

const Navbar = () => {
  const { user } = useStore()
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()
  const handleLogout = () => {
    logout()
    navigate("/")
  }
  const handleLogin = () => {
    navigate("/auth/login")
  }

  console.log("USer", user)
  return (
    <div className="flex items-center justify-between bg-gray-100 mb-10 p-5 shadow-lg">
      Real time order tracking
      <div className="flex items-center gap-4">
        {user.name ? (
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="default" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
