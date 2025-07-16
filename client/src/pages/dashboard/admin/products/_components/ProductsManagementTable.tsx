import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useGetProducts } from "@/hooks/customer/products/useGetProducts"
import { useCreateProduct } from "@/hooks/product/useCreateProduct"
import { useUpdateProduct } from "@/hooks/product/useUpdateProduct"
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct"
import { productSchema, updateProductSchema } from "@/lib/zod/productSchema"
import { validateSchema } from "@/lib/zod/template"

const defaultForm = {
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
  qty: 0,
}

const ManageProductsTable = () => {
  const { data, isLoading, refetch } = useGetProducts()
  const { mutate: createProduct } = useCreateProduct()
  const { mutate: updateProduct } = useUpdateProduct()
  const { mutate: deleteProduct } = useDeleteProduct()

  const [form, setForm] = useState(defaultForm)
  const [editId, setEditId] = useState<string | null>(null)

  const products = data?.data || []

  const handleChange = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleCreate = () => {
    const result = validateSchema(productSchema, form)
    if (!result.success) {
      console.log("Validation failed", result.error.format())
      toast.error("Validation failed")
      return
    }
  
    createProduct(result.data, {
      onSuccess: () => {
        toast.success("Product created successfully")
        setForm(defaultForm)
        refetch()
      },
      onError: () => toast.error("Failed to create product"),
    })
  }
  
  const handleUpdate = () => {
    if (!editId) return
  
    const result = validateSchema(updateProductSchema, form)
    if (!result.success) {
      console.log("Validation failed", result.error.format())
      toast.error("Validation failed")
      return
    }
  
    updateProduct(
      { id: editId, data: result.data },
      {
        onSuccess: () => {
          toast.success("Product updated")
          setEditId(null)
          setForm(defaultForm)
          refetch()
        },
        onError: () => toast.error("Failed to update product"),
      }
    )
  }
  

  const handleEdit = (product: typeof form & { id: string }) => {
    setEditId(product.id)
    setForm({
      name: product.name,
      description: product.description,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      qty: product.qty,
    })
  }

  const handleDelete = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        toast.success("Product deleted")
        refetch()
      },
      onError: () => toast.error("Failed to delete product"),
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Product Management</h2>

      {/* Add/Edit Form */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
        />
        <Input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Qty"
          value={form.qty}
          onChange={(e) => handleChange("qty", Number(e.target.value))}
        />
        <Button onClick={editId ? handleUpdate : handleCreate}>
          {editId ? "Update" : "Add"}
        </Button>
      </div>

      {/* Products Table */}
      {isLoading ? (
        <div className="p-4">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center p-4">No products found</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id.slice(0, 6)}...</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {product.description}
                  </TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.qty}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default ManageProductsTable
