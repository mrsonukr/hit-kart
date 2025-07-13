// src/Routing.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load pages for code splitting
const Home = lazy(() => import("./components/OptimizedHome"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const AddressForm = lazy(() => import("./pages/Address"));
const Summary = lazy(() => import("./pages/Summary"));
const Payment = lazy(() => import("./pages/Payment"));

const Routing = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;