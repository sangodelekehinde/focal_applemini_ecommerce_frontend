// Every call that talks to the orders part of Django.

import { apiFetch } from "./client";

// send the cart + delivery details, get back the Paystack link
export const placeOrder = (payload) =>
  apiFetch("/checkout/", { method: "POST", body: JSON.stringify(payload) });

// get the logged-in user's order history
export const getOrders = () => apiFetch("/orders/");

// ask Django to confirm a payment
export const verifyPayment = (reference) =>
  apiFetch(`/payments/verify/${reference}/`);