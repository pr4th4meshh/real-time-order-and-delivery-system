import { usePlaceOrder } from "@/hooks/orders/usePlaceOrder"
import { placeOrderSchema } from "@/lib/zod/orderSchema"
import { validateSchema } from "@/lib/zod/template"
import { useStore } from "@/store/store"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useStore()
  const navigate = useNavigate()
  const { mutate: placeOrder } = usePlaceOrder()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = async () => {
    const orderPayload = {
      items: cart.map((item) => ({
        productId: item.id,
        qty: item.quantity,
      })),
    }

    const { data, error } = validateSchema(placeOrderSchema, orderPayload)

    if (error) return alert(error.message)

    placeOrder(data, {
      onSuccess: () => {
        toast("✅ Order Placed Successfully!")
        clearCart()
        navigate("/")
      },
      onError: (error) => {
        toast(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        )
      },
    })
  }

  if (cart.length === 0)
    return (
      <div className="text-center mt-20 text-xl">Your cart is empty 🛒</div>
    )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🛒 Cart</h1>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">₹{item.price * item.quantity}</p>
              <button
                className="text-red-500 text-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ₹{total}</p>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  )
}

export default Cart
