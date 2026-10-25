// Footer.jsx
// A simple footer for the Focal eyewear store

import { Link } from "react-router-dom";

function Footer() {
  // Get the current year so the copyright always stays up to date
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300  mt-10 w-full">
      {/* Main footer area */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Focal</h2>
          <p className="mt-3 text-sm">
           get your smart phones here
          </p>
        </div>

        {/* Column 2: Shop links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-white">Checkout</Link></li>
          </ul>
        </div>

        {/* Column 3: Account links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/signup" className="hover:text-white">Register</Link></li>
            <li><Link to="/" className="hover:text-white">My Account</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>support@applemini.com</li>
            <li>+234 000 000 0000</li>
            <li>Lagos, Nigeria</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar with copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {year} Focal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;