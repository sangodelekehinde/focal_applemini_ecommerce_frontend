// Delivery form + Pay now button.
// Pay now sends the cart to Django, then sends the user to Paystack.

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "../styles/styles.css";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa6";
import { placeOrder } from "../api/orders";

function Checkout({ cartItems }) {
  // what the user types in the delivery form
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
  });

  // updates the right field as the user types (uses the input's "name")
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // total = price x quantity for every item
  const total = cartItems.reduce(
    (sum, product) => sum + Number(product.price) * product.quantity,
    0,
  );

  // sends the order to Django, then goes to Paystack
  const mutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      window.location.href = data.authorization_url;
    },
  });

  function handlePay(e) {
    e.preventDefault(); // stop the page from refreshing
    mutation.mutate({
      items: cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
      shipping: form,
    });
  }

  // nothing to pay for
  if (cartItems.length === 0)
    return (
      <p className="font-montserrat flex justify-center items-center h-[100vh]">
        Your cart is empty
      </p>
    );

  return (
    <form onSubmit={handlePay}>
      <h1 className="text-2xl mt-4 ml-7 md:mt-8 md:ml-52 font-bold text-[#1212D4]">Payment</h1>

      <div className="p-8 flex flex-col gap-12 md:w-[100%] md:flex-row md:justify-center">
        {/* LEFT: order summary + delivery form */}
        <div className="delivery_ordersummary md:w-[40vw] flex flex-col gap-2">
          <div className="ordersummary flex justify-between">
            <p>Order summary</p>
            <p>₦{total}</p>
          </div>

          <div className="mb-3">
            <h2 className="font-semibold">Delivery</h2>
            <p className="text-[10px] text-[#2e2c2cb4]">
              This will also be used as your billing address for this order
            </p>
          </div>

          <div className="row_container">
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                id="first_name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                className="checkout_input"
                type="text"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                id="last_name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                className="checkout_input"
                type="text"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="row_container">
            <div>
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="checkout_input"
                type="text"
                placeholder="Address"
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="checkout_input"
                type="text"
                placeholder="City"
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="checkout_input"
                type="text"
                placeholder="State"
              />
            </div>
          </div>

          <div className="row_container">
            <div>
              <label htmlFor="postal_code">Postal Code:</label>
              <input
                id="postal_code"
                name="postal_code"
                value={form.postal_code}
                onChange={handleChange}
                className="checkout_input"
                type="text"
                placeholder="Postal code (optional)"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="checkout_input"
                type="text"
                placeholder="Phone"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: shipping, payment note, total, pay button */}
        <div className="flex flex-col gap-5 md:w-[25vw]">
          <div className="shipping_method">
            <h1 className="font-semibold text-base mb-2">Shipping method</h1>
            <div className="flex justify-between text-[10px] font-semibold border p-[12px] rounded-[8px] text-[#0000ffc0]">
              <p>Free shipping</p>
              <p>Free</p>
            </div>
          </div>

          {/* Paystack collects the card details, so no card inputs here */}
          <div className="border p-4 rounded-[8px] bg-[#aaaae660] flex flex-col gap-2">
            <div className="flex justify-between">
              <h2>Pay with Paystack</h2>
              <div className="flex gap-2">
                <FaCcVisa />
                <FaCcMastercard />
              </div>
            </div>
            <p className="text-[10px] text-[#2e2c2cb4]">
              You'll be redirected to Paystack's secure page to complete your payment.
              Your receipt will be emailed to you.
            </p>
          </div>

          <div className="product_summary flex justify-between items-center">
            <div>
              <p className="font-semibold">Order Total</p>
              <p className="text-[grey] text-sm">{cartItems.length} items</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-[9px] text-[grey] bg-[#c2bdbd52] rounded-3xl p-1">NGN</p>
              <p className="font-semibold">₦{total}</p>
            </div>
          </div>

          {/* shows an error if Django says no */}
          {mutation.isError && (
            <p className="text-red-500 text-xs">
              {mutation.error.detail || "Please check your details and try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="text-white bg-[#1212d4] p-2 rounded-[8px] disabled:opacity-60"
          >
            {mutation.isPending ? "Redirecting to Paystack..." : "Pay now"}
          </button>
        </div>
      </div>

      <div className="checkout_footer flex flex-wrap w-[90vw] gap-3 underline list-none mt-3 text-xs text-[#0000ffc0] justify-center mb-5">
        <li>Refund policy</li>
        <li>Shipping</li>
        <li>Privacy policy</li>
        <li>Terms of service</li>
        <li>Cancellations</li>
      </div>
    </form>
  );
}

export default Checkout;