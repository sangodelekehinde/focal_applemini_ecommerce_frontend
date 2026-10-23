// Shows the products that match what the user typed in the search bar.

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../pages/products";

function Searched() {
  const { name } = useParams(); // the word typed in the search bar
  const navigate = useNavigate();

  // get all products from Django
  const {
    data: product_list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // loading and error states
  if (isLoading) return <p className="flex justify-center mt-24">Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  // keep only the products whose name contains the searched word
  const results = product_list.filter((each_product) =>
    each_product.name.toLowerCase().includes(name.toLowerCase().trim()),
  );

  // FIX: show "not found" only when there are NO results
  if (results.length === 0) {
    return (
      <p className="flex justify-center items-center h-[100vh] font-montserrat">
        Product not found
      </p>
    );
  }

  // open the clicked product
  function about_search(product_id) {
    navigate(`/productDetail/${product_id}`);
  }

  // show the matching products
  return (
    <div className="flex justify-center mt-[70px] min-h-[100vh]">
      <div className="md:w-[70%] w-[85%] flex gap-9 flex-col">
        {results.map((product) => (
          <div
            key={product.id}
            className="md:h-[55vh] flex flex-col gap-4 md:w-[100%] w-[100%]"
          >
            <div className="explore flex md:gap-20 gap-8 items-center">
              <div className="product_image md:h-[20vh] w-[35vw] md:w-[9vw] p-5 rounded-lg flex justify-center items-center">
                <img
                  className="w-full h-full flex justify-center object-contain size-4"
                  src={product.image}
                  alt={product.name}
                  onClick={() => about_search(product.id)}
                />
              </div>

              <p
                onClick={() => about_search(product.id)}
                className="font-montserrat font-semibold md:text-lg cursor-pointer hover:text-[#5c5959c0]"
              >
                {product.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searched;