import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../pages/products";
import Spinner from "../components/Spinner";

import discover_img from "../assets/apple_discover.jpg";

function Explore() {
  const navigate = useNavigate();

  //  for images from django
  const MEDIA_BASE_URL = "http://localhost:8000";

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

  if (isLoading) return <Spinner />;
  if (error) return <p>Something went wrong: {error.message}</p>;

  // DISPLAY PRODUCT LIST AS UI

  return (
    <div className="wrapper hidden md:block">
      <h1 className="font-bold text-center text-xl mt-14 mb-8">Explore more</h1>

      <div className="flex justify-center md:mt-[30px]">
        <div className="flex md:gap-8 gap-2  md:flex flex-wrap justify-center">
          {product_list.map((product) => (
            <div
              key={product.id}
              className="flex flex-col   md:[30vw] h-[35vh]  md:h-[60vh] items-center border  p-2 rounded-lg md:border-none "
            >
              <div className="explore   flex flex-col md:flex  gap-3">
                <div className="product_image  md:h-[42vh] md:w-[18vw] w-[40vw] p-5 rounded-lg bg-[#F5F5F6] hover:border-2 flex justify-center items-center">
                  <img
                    className="flex justify-center object-cover md:object-contain h-full  "
                    src={product.image}
                    alt="img"
                    onClick={() => navigate(`/explored/${product.id}`)}
                  />
                </div>

                <p className="font-montserrat">{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
