// App.jsx: holds the cart, and lists every page (route) of the site.

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Productlist from "./pages/ProductList";
import Searched from "./pages/Searched";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product_detail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explored from "./pages/explored";
import Account from "./pages/Account";
import PaymentCallback from "./pages/PaymentCallback";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer";
import Support from "./pages/Support";
import Contact from "./pages/Contact";

function App() {
  // read the saved cart once, when the app starts
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cart_count")) || [],
  );

  // save the cart every time it changes, from any page
  useEffect(() => {
    localStorage.setItem("cart_count", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* pages WITH the navbar */}
          <Route element={<Layout cartItems={cartItems} />}>
            <Route
              path="/"
              element={
                <Productlist
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                />
              }
            />
            <Route path="/searched/:name" element={<Searched />} />
            <Route path="/searched/" element={<Searched />} />
            <Route
              path="/productDetail/:id"
              element={<Product_detail setCartItems={setCartItems} />}
            />
            <Route
              path="/explored/:id"
              element={<Explored setCartItems={setCartItems} />}
            />
          </Route>

          {/* pages WITHOUT the navbar */}
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />

          {/* login required */}
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout cartItems={cartItems} />
              </RequireAuth>
            }
          />
          <Route
            path="/payment/callback"
            element={
              <RequireAuth>
                <PaymentCallback setCartItems={setCartItems} />
              </RequireAuth>
            }
          />

          {/* login required */}
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account setCartItems={setCartItems} />
              </RequireAuth>
            }
          />

          <Route path="/login/" element={<Login />} />
          <Route path="/signup/" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/support/" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
