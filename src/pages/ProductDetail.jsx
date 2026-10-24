import { getProduct } from "./products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Explore from "./explore";

function Product_detail({ setCartItems }) {
  const { id } = useParams();
 

  // uses id to get each product

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  //  add to cart feature from product details page using id match

  function addToCart() {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // handles loading and error

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  //  display
  return (
    <div className="parent">
      <div className=" flex justify-center h-[100vh] md:h-[60vh] mt-[70px]">
        <div className="md:w-[60%] w-[90%] flex gap-9">
          <div className="flex flex-col w-[100%]">
            <div className="explore h-[100vh] md:flex  w-[100%] gap-20 ">
              <div className="product_image  md:w-[20vw] bg-[#F5F8F7] md:h-[50vh]   p-5 rounded-lg flex justify-center items-center">
                <img
                  className="w-full h-full flex justify-center object-contain    "
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="md:w-[50%] flex flex-col gap-7   ">
                <p className="font-montserrat text-2xl font-semibold mt-4 ">
                  {product.name}
                </p>
                <h2 className="font-medium text-[15px]">Description</h2>
                <p className="desription text-[grey] text-lg  md:w-[30vw]">
                  {product.description}
                </p>
                <p className="font-semibold font-montserrat text-xl">
                  ${product.price}
                </p>
                <button
                  onClick={addToCart}
                  className="md:w-[70%] md:text-[13px] text-[15px] font-montserrat font-medium hover:bg-[black] bg-[#151EC7] md:p-2 p-3 text-[white] rounded-md"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="explore hidden md:block">
       <Explore/>
      </div>
    </div>
  );
}

export default Product_detail;
