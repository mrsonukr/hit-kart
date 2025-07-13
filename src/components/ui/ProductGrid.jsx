import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts, getSalePrice, getMRP, getDiscountPercentage, formatPrice, getDeliveryDate } from "../../utils/productUtils";
import { cacheManager, performanceMonitor } from "../../utils/performanceUtils";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      performanceMonitor.start('product-loading');
      
      // Try to get from cache first
      const cachedProducts = cacheManager.get('products');
      if (cachedProducts) {
        setProducts(cachedProducts);
        setLoading(false);
        performanceMonitor.end('product-loading');
        return;
      }
      
      const data = await getAllProducts();
      setProducts(data);
      
      // Cache the products for faster subsequent loads
      cacheManager.set('products', data, 300000); // 5 minutes
      
      setError(null);
      performanceMonitor.end('product-loading');
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div></div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <button 
            onClick={loadProducts}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <p className="text-gray-600 mb-2">No products found</p>
          <button 
            onClick={loadProducts}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200">
      <div className="grid grid-cols-2">
        {products.map((product) => {
          const salePrice = getSalePrice(product);
          const mrp = getMRP(product);
          const discountPercentage = getDiscountPercentage();
          const deliveryText = `Free delivery by ${getDeliveryDate(product.delivery)}`;
          
          return (
            <ProductCard
              key={product.id}
              href={`/product/${product.id}`}
              image={product.images[0]}
              title={product.name}
              brand={product.brand}
              discountPercent={`${discountPercentage}%`}
              oldPrice={formatPrice(mrp)}
              newPrice={formatPrice(salePrice)}
              badgeText={product.stockStatus}
              rating={Math.round(product.averageRating)}
              deliveryText={deliveryText}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;