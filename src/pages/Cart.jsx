import { useNavigate } from "react-router-dom";

import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaCcVisa } from "react-icons/lia";
import { FaCcMastercard } from "react-icons/fa6";
import { BsCash } from "react-icons/bs";
import { FaStripe } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  // handle empty cart
  if (cartItems.length === 0) {
    return (
      <div>
        <button className="bg-[#151ec7] p-3 rounded-xl mt-7 ml-6">
          <FaArrowLeft
            onClick={() => navigate("/")}
            className="text-[white] text-lg"
          />
        </button>
        <p className="font-montserrat  flex justify-center items-center h-[100vh]">
          Your cart is empty
        </p>
      </div>
    );
  }

  // remove all cart items
  function RemoveAll() {
    setCartItems([]);
  }

  // remove one item
  function remove_each(id) {
    setCartItems(cartItems.filter((product) => product.id !== id));
  }

  // price stays the UNIT price, only quantity changes
  function increment(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decrement(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }

  // total = unit price x quantity, for every item
  const total = cartItems.reduce((sum, product) => {
    return sum + Number(product.price) * product.quantity;
  }, 0);

  return (
    <div className="wrapper">
      <div className="flex justify-center items-center md:h-[90vh] w-[100%] mt-5 p-5">
        <div className="md:p-9  md:gap-[40px] h-[100%] md:min-w-full min-w-[86%] justify-center flex flex-col gap-8 m-2  md:flex-row  ">
          <div className="content1 md:w-[50%] rounded-lg flex flex-col gap-[20px] mb-4 ">
            <div>
              <div className="flex justify-between md:w-[86%] items-center font-montserrat text-[12px]">
                <div className="flex gap-3 items-center">
                  <h2 className="font-medium text-[19px]">My Cart -</h2>
                  <p>{cartItems.length} items</p>
                </div>

                <div className="flex gap-2 items-center">
                  <RiDeleteBin6Line
                    className="text-[red]  hover:text-[#df3333]"
                    onClick={RemoveAll}
                  />
                  <p
                    onClick={RemoveAll}
                    className="text-[red] hover:text-[#df3333]"
                  >
                    Remove all
                  </p>
                </div>
              </div>
            </div>

            {cartItems.map((all_products) => (
              <div
                key={all_products.id}
                className="  justify-evenly flex gap-6 md:gap-14  md:p-1 items-center font-montserrat text-[11px] bg-[#f0f0f08a] md:w-[41vw] pr-3 rounded-xl"
              >
                <img
                  className="flex justify-center object-cover md:object-contain h-full size-16 "
                  src={all_products.image}
                  alt="img"
                />
                <p className="">{all_products.name}</p>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => decrement(all_products.id)}
                    className="decrement border border-[#6664644b] text-xl w-7 text-[#0000009d] rounded-full"
                  >
                    -
                  </button>
                  <div className="text-[black] font-semibold">
                    {all_products.quantity}
                  </div>
                  <button
                    onClick={() => increment(all_products.id)}
                    className="increment border border-[#6664644b] text-xl w-7 text-[#0000009d] rounded-full"
                  >
                    +
                  </button>
                </div>

                {/* line total = unit price x quantity */}
                <p>{Number(all_products.price) * all_products.quantity}</p>

                <RiDeleteBin6Line
                  onClick={() => remove_each(all_products.id)}
                  className="text-[red] hover:text-[grey]"
                />
              </div>
            ))}
          </div>

          <div className="content2  shadow-md p-4 md:h-[58vh] rounded-lg md:w-[25%] flex flex-col gap-8 font-montserrat text-[12px]">
            <div className="c_shopping flex gap-3 items-center mt-2 md:hidden">
              <button className="bg-[#151ec7] p-3 rounded-xl hover:bg-black">
                <FaArrowLeft
                  onClick={() => navigate("/")}
                  className="text-[white]"
                />
              </button>

              <p className="font-semibold">Continue Shopping</p>
            </div>

            <h2 className="font-medium text-[15px]">Cart totals</h2>

            <div className="flex justify-between">
              <p>Subtotals</p>
              <h2 className="font-semibold">${total}</h2>
            </div>

            <div className="flex justify-between">
              <p>Shipping</p>
              <p className="text-[green]">Free</p>
            </div>

            <div className="flex justify-between">
              <h2>Total(with VAT)</h2>
              <h2 className="font-semibold">${total}</h2>
            </div>

            <div className="flex gap-4 justify-center text-[30px] text-[#8080805b]">
              <LiaCcVisa />
              <FaCcMastercard />
              <BsCash />
              <FaStripe />
            </div>

            <div className="relative">
              <button
                className="w-[100%] p-2 rounded-md bg-[#151ec7] font-semibold text-white"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
