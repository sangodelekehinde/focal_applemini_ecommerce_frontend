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

import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import useDebounce from "../hooks/useDebounce";

import { VscAccount } from "react-icons/vsc";

import "../styles/mobile.css";

function Navbar({ cartCounter }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [mobilesearch, setMobileSearch] = useState(false);

  const [mobilemenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  // using debounce for automatic search

  // Add these near your other useState lines
  const location = useLocation();
  const debouncedSearch = useDebounce(search, 500); // updates 500ms after typing stops

  // Are we already on the search results page?
  const onSearchPage = location.pathname.startsWith("/searched");

  // Go to the results page for the text in the search box
  function handleSearch() {
    const text = search.trim();

    if (text !== "") {
      // replace: true when already on results, so Back doesn't step through every search
      navigate(`/searched/${encodeURIComponent(text)}`, {
        replace: onSearchPage,
      });
    }
  }

  // Pressing Enter searches immediately
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }

  // Runs automatically when the user pauses typing
  useEffect(() => {
    const text = debouncedSearch.trim();

    if (text !== "") {
      // user typed something, so show the results
      navigate(`/searched/${encodeURIComponent(text)}`, {
        replace: onSearchPage,
      });
    } else if (onSearchPage) {
      // box is empty AND we are on the results page, so go home
      navigate("/", { replace: true });
    }
  }, [debouncedSearch]);

  // ------- debounce end

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

  // function handleKeyDown(e) {
  //   setLoading(true);

  //   setTimeout(() => {
  //     setLoading(false);
  //     // console.log("Submitted text:", search);
  //     navigate(`/searched/${search}`);
  //     // Clear the input field after Enter is pressed
  //     setSearch("");
  //   }, 1000);
  // }

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

              <div className="hidden md:block  ">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#F3F3F6] w-[30vw] p-1 pl-7 rounded-full outline-none text-sm "
                  value={search}
                  onChange={Search}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSearch}
                  className="text-[white] bg-[#151ec7] rounded-3xl p-1 w-[4vw] ml-3"
                >
                  search
                </button>
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

              <div
                onClick={() =>
                  navigate(
                    localStorage.getItem("access") ? "/account" : "/login",
                  )
                }
                className="fav md:flex items-center gap-2 hidden "
              >
                <CgProfile className=" visible" />

                <h1 className="hover:text-[black] font-semibold">Account</h1>
              </div>

              <div className="cart flex items-center gap-5 ">
                <div className="mobile_search_bar  text-[#383838] text-2xl  md:hidden  ">
                  <CiSearch
                    onClick={() => setMobileSearch(true)}
                    className="text-2xl 
                "
                  />
                </div>

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
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search for an item"
                className="bg-[#F3F3F6] w-[70vw] p-1 pl-7 rounded-full outline-none text-sm "
                value={search}
                onChange={Search}
                onKeyDown={handleKeyDown}
              />

              <button
                onClick={handleSearch}
                className="text-[white] bg-[#151ec7] rounded-3xl p-2"
              >
                search
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* mobile menu bar */}
      <div>
        <div
          className={`display-menu fixed  z-10 md:hidden ${mobilemenu ? "open" : ""}`}
        >
          <div className="flex justify-between text-3xl p-3">
            <p className="text-[25px] font-semibold pl-4 font-montserrat ">
              Apple mini
            </p>
            <div className="btn_border border border-[grey] p-2 rounded-2xl mr-3 ">
              <RxCross2 onClick={mobileMenu} />
            </div>
          </div>

          {/* Mobile menu links */}
          <nav className="mt-8 px-6">
            <ul className="flex flex-col divide-y divide-gray-200">
              <li
                onClick={menu_control}
                className="py-5 text-lg font-medium text-gray-800 cursor-pointer
                 hover:text-blue-600 active:text-blue-400 transition-colors"
              >
                Home
              </li>

              <li
                onClick={() => navigate("/support")}
                className="py-5 text-lg font-medium text-gray-800 cursor-pointer
                 hover:text-blue-600 active:text-blue-400 transition-colors"
              >
                Support
              </li>

              <li
                onClick={() => navigate("/contact")}
                className="py-5 text-lg font-medium text-gray-800 cursor-pointer
                 hover:text-blue-600 active:text-blue-400 transition-colors"
              >
                Contact
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {loading && <Spinner />}
    </div>
  );
}

export default Navbar;
