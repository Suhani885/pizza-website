import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Plus, Edit, Trash2, X, LogOut, Pizza } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/admin')({
  component: AdminComponent,
})

function AdminComponent() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Margherita Supreme',
      description: 'Fresh mozzarella, basil, and tomato sauce on our signature crust',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Pepperoni Deluxe',
      description: 'Premium pepperoni with extra cheese and our special spice blend',
      price: 21.99,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Veggie Garden',
      description: 'Bell peppers, mushrooms, olives, onions with fresh herbs',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'Meat Lovers',
      description: 'Pepperoni, sausage, bacon, and ham with extra cheese',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop',
    }
  ])

  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  })

  const getNextId = () => {
    return Math.max(...products.map(p => p.id), 0) + 1
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const newProduct = {
      id: getNextId(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image
    }
    setProducts(prev => [...prev, newProduct])
    setFormData({ name: '', description: '', price: '', image: '' })
    setShowAddForm(false)
  }

  const startEdit = (product) => {
    setEditingProduct(product.id)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setProducts(prev => prev.map(product => 
      product.id === editingProduct 
        ? {
            ...product,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            image: formData.image
          }
        : product
    ))
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: '', image: '' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== id))
    }
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setShowAddForm(false)
    setFormData({ name: '', description: '', price: '', image: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍕</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">RusticOven Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  View Store
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
            <p className="text-gray-600">Manage your pizza menu items</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Add New Product</CardTitle>
              <CardDescription>Create a new pizza for your menu</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreate}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      required
                      className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                      className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    required
                    className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    Create Product
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="shadow-md bg-white/80 backdrop-blur-sm">
              {editingProduct === product.id ? (
                <form onSubmit={handleUpdate}>
                  <CardHeader>
                    <CardTitle className="text-lg">Edit Product</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edit-name-${product.id}`}>Name</Label>
                      <Input
                        id={`edit-name-${product.id}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-price-${product.id}`}>Price ($)</Label>
                      <Input
                        id={`edit-price-${product.id}`}
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-description-${product.id}`}>Description</Label>
                      <textarea
                        id={`edit-description-${product.id}`}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="w-full h-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-image-${product.id}`}>Image URL</Label>
                      <Input
                        id={`edit-image-${product.id}`}
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700">
                        Save
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </form>
              ) : (
                <>
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-red-600">${product.price}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(product)}
                        disabled={editingProduct || showAddForm}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        disabled={editingProduct || showAddForm}
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Pizza className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-600 mb-6">Add your first pizza to get started</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}