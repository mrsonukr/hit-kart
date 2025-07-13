import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          swiper: ['swiper'],
          icons: ['react-icons', 'lucide-react'],
          lottie: ['lottie-react', 'lottie-web'],
          
          // Page chunks
          home: ['./src/pages/Home.jsx'],
          product: ['./src/pages/Product.jsx'],
          cart: ['./src/pages/Cart.jsx'],
          address: ['./src/pages/Address.jsx'],
          summary: ['./src/pages/Summary.jsx'],
          payment: ['./src/pages/Payment.jsx'],
          
          // Component chunks
          components: [
            './src/components/Header.jsx',
            './src/components/Header2.jsx',
            './src/components/Header3.jsx'
          ],
          productComponents: [
            './src/components/product-ui/ProductSlider.jsx',
            './src/components/product-ui/ProductDetails.jsx',
            './src/components/product-ui/BottomButtons.jsx'
          ],
          cartComponents: [
            './src/components/cart-ui/CartProduct.jsx',
            './src/components/cart-ui/PriceDetails.jsx',
            './src/components/cart-ui/AddressBar.jsx'
          ],
          paymentComponents: [
            './src/components/payment/PayHeader.jsx',
            './src/components/payment/UPIPaymentOptions.jsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: true,        // 👈 enables access via IP like 192.168.x.x
    port: 5173,        // 👈 optional (default is 5173)
    https: false,      // Set to true when you have SSL certificate
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
    }
  }
})
