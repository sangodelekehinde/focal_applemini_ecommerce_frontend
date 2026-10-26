import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../pages/products";
import Spinner from "../components/Spinner";

import discover_img from "../assets/apple_discover.jpg";


function Productlist({ setCartItems, cartItems }) {
  const navigate = useNavigate();

  //  for images from django


  // using useQuery to get data from database
  const {
    data: product_list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // handles loading and error state

  if (isLoading) return <Spinner/>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  // add product to cart
  // const Add_to_cart = async (product_id) => {
  //   const find = product_list.find((items) => items.id === product_id);

  //   const itemIncart = cartItems.find((items) => items.id === product_id);
  //   if (itemIncart) {
  //     console.log("is in cart");

  //     itemIncart.quantity += 1;
  //     console.log(cartItems);

  //     localStorage.setItem("focal_cart", JSON.stringify(cartItems));
  //     return;
  //   }

  //   const cartItem = { ...find, quantity: 1 };

  //   // console.log(cartItem);

  //   await setCartItems((prev) => [...prev, cartItem]);
  //   localStorage.setItem("focal_cart", JSON.stringify(cartItems));
  // };

  function Add_to_cart(product_id) {
    const Items = product_list.find((item) => item.id === product_id);

    // console.log(Items);

    setCartItems((prev) => {
      const checkItemExist = prev.find((item) => item.id === product_id);

      if (checkItemExist) {
        return prev.map((item) =>
          item.id === product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        const cartItem = {
          ...Items,
          quantity: 1,
        };

        return [...prev, cartItem];
      }
    });
  }



  // console.log(cartItems);
  // DISPLAY PRODUCT LIST AS UI

  return (
    <div className="wrapper">
      <div className="discover  flex justify-center mt-4">
        <img
          className=" md:w-[50vw] w-[80vw] rounded-xl"
          src={discover_img}
          alt=""
        />
      </div>

      <div className=" flex justify-center h-[100vh] md:mt-[70px] mt-[40px]   ">
        <div className="  md-[80vw] flex gap-8  md:flex flex-wrap  justify-center ">
          {product_list.map((product) => (
            <div
              key={product.id}
              className="flex flex-col  md:[30vw] h-[48vh]  md:h-[75vh] items-center  p-2 rounded-lg md:border-none "
            >
              <div className="explore  h-[100vh] flex flex-col md:flex  gap-3  ">
                <p className="text-[10px] border border-[#ff00008e] rounded-full font-bold text-[#df1d1d] w-[9vw]  md:w-[3vw] text-center">
                  NEW
                </p>

                <div className="product_image h-[25vh] md:h-[42vh] md:w-[18vw] w-[40vw] p-5 rounded-lg bg-[#F5F5F6] hover:border-2 flex justify-center items-center">
                  <img
                    className="flex justify-center object-cover md:object-contain h-full  "
                    src={product.image}
                    alt="img"
                    onClick={() => navigate(`/productDetail/${product.id}`)}
                  />
                </div>

                <p className="font-montserrat">{product.name}</p>
                <p className="font-semibold font-montserrat">
                  ₦{product.price}
                </p>
                <div className="bag">
                  <button
                    onClick={() => Add_to_cart(product.id)}
                    className=" w-[100%] text-[13px]  font-montserrat  font-medium hover:bg-[#151ec7]  bg-[black] p-2 text-[white] rounded-md"
                  >
                    Add to bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productlist;
