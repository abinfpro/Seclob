import { useParams, useLocation } from "react-router-dom";
import { ChevronRight, Minus, Plus, Heart, User, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductDetails() {
  const { id } = useParams();  
  const location = useLocation();
  const product = location.state?.product;
  console.log(product,"jhgfd");
  

  const [selectedRam, setSelectedRam] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    // optional: scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <div className="p-10 text-center text-lg text-gray-600">Loading product details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-800 text-white">
        <div className="px-4 py-4 flex justify-around">
          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search any things"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white w-full px-4 py-2 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-r-lg transition-colors">
              Search
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6 ml-6">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span className="text-sm">Sign In</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm">Cart</span>
              <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center space-x-2 text-gray-600 text-sm">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span>Product details</span>
          <ChevronRight className="w-4 h-4" />
          <span>{product.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="aspect-square flex items-center justify-center">
                <img
                  src={`https://seclob-fsqq.onrender.com/public/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Thumbnail (optional static) */}
            <div className="flex space-x-4">
              {[1, 2].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-gray-200 p-4 w-20 h-20 flex items-center justify-center"
                >
                  <img
                    src={`https://seclob-fsqq.onrender.com/public/uploads/${product.image}`}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{product.name}</h1>
<p className="text-3xl font-bold text-gray-900 mb-4">
  ₹{product.variants?.[0]?.price || "N/A"}
</p>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">Availability:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">In stock</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Hurry up! only {product.qty || 0} products left in stock!
              </p>
            </div>

            {/* RAM Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ram:</label>
              <div className="flex space-x-2">
                {product.ramVariants?.map((ram) => (
                  <button
                    key={ram}
                    onClick={() => setSelectedRam(ram)}
                    className={`px-4 py-2 text-sm border rounded ${
                      selectedRam === ram
                        ? 'border-orange-400 bg-orange-50 text-orange-600'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {ram}
                  </button>
                )) || <p className="text-gray-500">No RAM options available</p>}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-orange-400 text-white py-3 px-6 rounded-lg hover:bg-orange-500 transition-colors">
                Edit product
              </button>
              <button className="flex-1 bg-orange-400 text-white py-3 px-6 rounded-lg hover:bg-orange-500 transition-colors">
                Buy it now
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 border rounded-lg transition-colors ${
                  isLiked
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
