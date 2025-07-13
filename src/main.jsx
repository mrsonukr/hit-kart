import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- ✅ import this
import './index.css';
import App from './App.jsx';
import 'typeface-roboto';
import { preloadCriticalResources, performanceMonitor } from './utils/performanceUtils';

// Start performance monitoring
performanceMonitor.start('app-initialization');

// Preload critical resources for faster loading
preloadCriticalResources();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>
);

// End performance monitoring
setTimeout(() => {
  performanceMonitor.end('app-initialization');
}, 100);
