import React, { useState, useMemo } from 'react';
import { ShoppingCart, User, Search, Menu, X, Star, Heart } from 'lucide-react';

const EcommerceStore = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const products = [
    { id: 1, name: 'Premium Cotton Shirt', category: 'shirt', price: 1299, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', rating: 4.5, gender: 'men' },
    { id: 2, name: 'Formal Dress Shirt', category: 'shirt', price: 1599, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', rating: 4.8, gender: 'men' },
    { id: 3, name: 'Casual T-Shirt', category: 'shirt', price: 599, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', rating: 4.2, gender: 'men' },
    { id: 4, name: 'Women Blouse', category: 'shirt', price: 1199, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', rating: 4.6, gender: 'women' },
    { id: 5, name: 'Denim Jeans', category: 'pant', price: 1899, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', rating: 4.7, gender: 'men' },
    { id: 6, name: 'Formal Trousers', category: 'pant', price: 1699, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400', rating: 4.4, gender: 'men' },
    { id: 7, name: 'Women Jeans', category: 'pant', price: 1799, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', rating: 4.5, gender: 'women' },
    { id: 8, name: 'Casual Chinos', category: 'pant', price: 1499, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', rating: 4.3, gender: 'men' },
    { id: 9, name: 'Running Shoes', category: 'shoes', price: 2499, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', rating: 4.9, gender: 'men' },
    { id: 10, name: 'Formal Leather Shoes', category: 'shoes', price: 3299, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400', rating: 4.6, gender: 'men' },
    { id: 11, name: 'Women Heels', category: 'shoes', price: 2199, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', rating: 4.7, gender: 'women' },
    { id: 12, name: 'Sneakers', category: 'shoes', price: 1899, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', rating: 4.5, gender: 'women' },
    { id: 13, name: 'Luxury Watch', category: 'watch', price: 4999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.8, gender: 'men' },
    { id: 14, name: 'Smart Watch', category: 'watch', price: 3499, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', rating: 4.7, gender: 'men' },
    { id: 15, name: 'Women Watch', category: 'watch', price: 2999, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', rating: 4.6, gender: 'women' },
    { id: 16, name: 'Elegant Watch', category: 'watch', price: 3799, image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400', rating: 4.5, gender: 'women' },
    { id: 17, name: 'Face Cream', category: 'cosmetics', price: 899, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', rating: 4.4, gender: 'women' },
    { id: 18, name: 'Perfume', category: 'cosmetics', price: 1999, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', rating: 4.7, gender: 'men' },
    { id: 19, name: 'Lipstick Set', category: 'cosmetics', price: 699, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', rating: 4.5, gender: 'women' },
    { id: 20, name: 'Grooming Kit', category: 'cosmetics', price: 1299, image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400', rating: 4.6, gender: 'men' },
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'shirt', name: 'Shirts', icon: '👕' },
    { id: 'pant', name: 'Pants', icon: '👖' },
    { id: 'shoes', name: 'Shoes', icon: '👟' },
    { id: 'watch', name: 'Watches', icon: '⌚' },
    { id: 'cosmetics', name: 'Cosmetics', icon: '💄' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">StyleHub</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Shop</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User size={24} />
              </button>
              
              <button 
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          <div className="md:hidden mt-4 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Shop</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
            </nav>
          </div>
        )}
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to StyleHub</h2>
          <p className="text-xl mb-8">Your one-stop destination for fashion and lifestyle</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-red-50 transition">
                  <Heart size={20} className="text-gray-600" />
                </button>
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {product.gender === 'men' ? 'Men' : 'Women'}
                </span>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">৳{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button onClick={() => setShowCart(false)}>
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-blue-600 font-bold">৳{item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">৳{cartTotal}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StyleHub</h3>
            <p className="text-gray-400">Your trusted online fashion destination</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 StyleHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceStore;
