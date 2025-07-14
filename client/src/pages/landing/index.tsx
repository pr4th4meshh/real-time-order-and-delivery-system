import { useGetProducts } from "@/hooks/customer/products/useGetProducts"
import { useStore } from "@/store/store"
import { useEffect, useState } from "react"
import { IProduct } from "@/types/product.types"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/auth/useLogout"

const Landing = () => {
  const { data, isLoading } = useGetProducts()
  const addToCart = useStore((s) => s.addToCart)
  const cart = useStore((s) => s.cart)
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()
  const {mutate: logout} = useLogout()
  const {user} = useStore()

  useEffect(() => {
    if (cart.length > 0) {
      setShowPopup(true)
    }
  }, [cart, navigate])

  const handleLogout = () => {
    logout()
    navigate("/auth/login")
  }

  if (isLoading) return <div className="text-center mt-10">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">🛍 Shop Now</h1>
      <span>{user?.name ? `Welcome ${user?.name}` : "Unauthenticated"}</span>
      <Button variant="default" onClick={handleLogout}>Logout</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((product: IProduct) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-3">{product.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            <p className="text-lg font-bold mt-2">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          🛒 Item added!{" "}
          <Button variant="default" onClick={() => navigate("/cart")}>
            View Cart
          </Button>
        </div>
      )}
    </div>
  )
}

export default Landing
