import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/auth/useLogout"
import { useStore } from "@/store/store"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const { user } = useStore()
  const { mutate: logout } = useLogout()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
  }
  return (
    <div>
      Landing page
      <h3>User: {user.name ?? "Unauthenticated"}</h3>
      
      {user.name ? (
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="default" onClick={() => navigate("/auth/login")}>
          Login
        </Button>
      )}
    </div>
  )
}

export default Landing
