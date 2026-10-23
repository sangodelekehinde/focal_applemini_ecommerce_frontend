// import { IoGlassesOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { TbHistory } from "react-icons/tb";

import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

import { VscAccount } from "react-icons/vsc";

import "../styles/mobile.css";

function Navbar({ cartCounter }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [mobilesearch, setMobileSearch] = useState(false);

  const [mobilemenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleCartClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/cart");
    }, 1000);
  }

  function menu_control() {
    setMobileMenu(!mobilemenu);
    navigate("/");
  }

  function Search(e) {
    setSearch(e.target.value);
    // console.log("onchange result:", search);
  }

  function mobileMenu() {
    setMobileMenu(!mobilemenu);
  }

  // search loader with keydown
  // function handleSearch() {}

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        // console.log("Submitted text:", search);
        navigate(`/searched/${search}`);
        // Clear the input field after Enter is pressed
        setSearch("");
      }, 1000);
    }
  }

  const cart = JSON.parse(localStorage.getItem("cart_count"));

  return (
    <div className="mobile h-14  ">
      <nav className="flex font-montserrat ">
        <div className="w-[100%] flex justify-center fixed bg-white">
          <div className="nav_wrapper flex justify-between w-[93%] p-4 ">
            <div className="nav_one flex items-center gap-[40px]  ">
              <div
                onClick={() => navigate("/")}
                className="wbs_name font-bold "
              >
                Apple mini
              </div>

              {/* medium screens sizes */}

              <div className="hidden md:block ">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#F3F3F6] w-[30vw] p-1 pl-7 rounded-full outline-none text-sm "
                  value={search}
                  onChange={Search}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="search_bar  text-[#383838] text-xl absolute  right-4 hidden md:block md:left-[576px]  w-6 ">
                <CiSearch />
              </div>
            </div>

            <div className="nav_two  md:flex gap-8 text-[14px] text-[#5f5d5d]  ">
              <div
                className="order md:flex items-center gap-2 hidden cursor-pointer"
                onClick={() => navigate("/account")}
              >
                <LuBox />
                <h1 className="hover:text-[black] font-semibold">Orders</h1>
              </div>

              <div className="fav md:flex items-center gap-2 hidden">
                <FaRegHeart />

                <h1 className="hover:text-[black] font-semibold">Favourites</h1>
              </div>

              <div className="cart flex items-center gap-5 ">
                <div className="mobile_search_bar  text-[#383838] text-2xl  md:hidden  ">
                  <CiSearch
                    onClick={() => setMobileSearch(true)}
                    className="text-2xl 
                "
                  />
                </div>

                <CgProfile
                  className="hidden"
                  onClick={() =>
                    navigate(
                      localStorage.getItem("access") ? "/account" : "/login",
                    )
                  }
                />

                <div
                  className="order md:flex items-center gap-2  cursor-pointer"
                  onClick={() => navigate("/account")}
                >
                  <TbHistory className="md:hidden text-lg" />
                </div>

                <CiShoppingCart
                  onClick={handleCartClick}
                  className=" relative text-2xl"
                />

                <h1 className="bg-[red] rounded-full  ab  w-3 h-3 absolute top-5 right-[78px] md:right-[111px] md:top-[19px] flex items-center justify-center text-[9px] text-[white] font-semibold ">
                  {cartCounter.length}
                </h1>

                {/* mobile menu bar icon */}

                <div>
                  <FiMenu
                    onClick={mobileMenu}
                    className="text-[grey] text-2xl md:hidden size-8"
                  />
                </div>
              </div>

              <div>
                <button className="bg-[#0076DF] hidden text-white text-[10px] font-semibold   p-2 rounded-full">
                  Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* show mobile search bar */}
        <div className="mobile_search pl-6 md:hidden fixed top-14 w-[100%]  pb-2 bg-white ">
          {mobilesearch && (
            <input
              type="text"
              placeholder="Search for an item"
              className="bg-[#F3F3F6] w-[70vw] p-1 pl-7 rounded-full outline-none text-sm "
              value={search}
              onChange={Search}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      </nav>

      {/* mobile menu bar */}
      <div>
        <div
          className={`display-menu fixed  z-10 md:hidden ${mobilemenu ? "open" : ""}`}
        >
          <div className="flex justify-between text-3xl p-3">
            <p className="text-[25px] font-semibold pl-7 font-montserrat ">
              Apple mini
            </p>
            <div className="btn_border border border-[grey] p-2 rounded-2xl mr-3 ">
              <RxCross2 onClick={mobileMenu} />
            </div>
          </div>
          <div className=" mt-8 flex flex-col gap-[70px] pl-10 font-medium list-none h-full  ">
            <li className="cursor-pointer" onClick={menu_control}>
              Home
            </li>
            <li>Support</li>
            <li>Contact</li>
          </div>
        </div>
      </div>

      {loading && <Spinner />}
    </div>
  );
}

export default Navbar;
