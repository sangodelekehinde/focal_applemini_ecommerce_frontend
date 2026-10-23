// django base url api

const BASE_URL = "http://localhost:8000/api";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products/`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}




//  getProducts by id endpoint


export async function getProduct(id) {
  const res = await fetch(`http://localhost:8000/api/products/${id}/`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}



