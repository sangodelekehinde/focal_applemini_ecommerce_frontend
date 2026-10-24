// Functions that get products from Django.

import { BASE_URL } from "../config";

// ALL products (used by the product list and search pages)
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products/`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// ONE product, found by its id (used by the product detail pages)
export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}/`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
