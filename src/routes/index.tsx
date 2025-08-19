import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { ShoppingCart } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
// import { v1ProductsGet, v1CartPost } from '@/services/api/gen'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      // const response = await v1ProductsGet()
      // if (response.data) {
      //   setProducts(response.data)
      // }
      const fallbackProducts = [
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
      ]
      setProducts(fallbackProducts)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const addToCart = async (product) => {
    try {
      // const response = await v1CartPost({
      //   body: {
      //     product_id: product.id,
      //     quantity: 1
      //   }
      // })
      // if (response.data) {
      //   alert('Product added to cart!')
      // }
      console.log('Adding to cart:', product)
      alert(`${product.name} added to cart!`)
      
    } catch (error) {
      console.error('Failed add to cart:', error)
      alert('Failed to add product to cart')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍕</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">RusticOven</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/cart">
                <Button variant="ghost" size="lg">
                  <ShoppingCart className="w-6 h-6 mr-1" />
                  Cart
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="default" size="sm">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <hr />
      
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 mt-4">
            RusticOven
            <span className="text-red-600"> Delivered Fresh</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Handcrafted pizzas made with premium ingredients and baked to perfection. 
            Experience the taste that keeps customers coming back for more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Order Now
            </Button>
            <Button size="lg" variant="outline">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Signature Pizzas</h3>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((pizza) => (
                <Card key={pizza.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={pizza.image} 
                      alt={pizza.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{pizza.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {pizza.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-red-600">${pizza.price}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => addToCart(pizza)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}