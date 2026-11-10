import { CiSearch } from "react-icons/ci";
import { LuBox } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import { TbHistory } from "react-icons/tb";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import useDebounce from "../hooks/useDebounce";

import "../styles/mobile.css";

function Navbar({ cartCounter }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [mobilesearch, setMobileSearch] = useState(true);

  const [mobilemenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  // ------- debounce (automatic search while typing)

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
  }

  function mobileMenu() {
    setMobileMenu(!mobilemenu);
  }

  return (
    <div className="mobile h-14  ">
      <nav className="flex font-montserrat ">
        <div className="w-[100%] flex justify-center fixed bg-white">
          <div className="nav_wrapper flex justify-between items-center w-[93%] p-4 ">
            <div className="nav_one flex items-center gap-[40px]  ">
              <div
                onClick={() => navigate("/")}
                className="wbs_name font-bold cursor-pointer"
              >
                Apple mini
              </div>

              {/* medium screens sizes (desktop search) */}
              <div className="hidden md:flex items-center">
                {/* "relative" lets the icon sit inside the input */}
                <div className="relative">
                  <CiSearch className="absolute top-1 left-2 text-xl text-[#383838]" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-[#F3F3F6] w-[31vw] p-1 pl-8 rounded-full outline-none text-sm "
                    value={search}
                    onChange={Search}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="text-[white] bg-[#151ec7] rounded-3xl p-2 text-sm ml-3"
                >
                  search
                </button>
              </div>
            </div>

            <div className="nav_two  md:flex items-center gap-8 text-[14px] text-[#5f5d5d]  ">
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
                className="fav md:flex items-center gap-2 hidden cursor-pointer"
              >
                <CgProfile className=" visible" />

                <h1 className="hover:text-[black] font-semibold">Account</h1>
              </div>

              <div className="cart flex items-center gap-5 ">
                {/* history icon (mobile only) */}
                <div
                  className="order md:flex items-center gap-2  cursor-pointer"
                  onClick={() => navigate("/account")}
                >
                  <TbHistory className="md:hidden text-2xl" />
                </div>

                {/* cart icon + badge ("relative" keeps the badge stuck to the icon) */}
                <div className="relative cursor-pointer" onClick={handleCartClick}>
                  <CiShoppingCart className="text-2xl" />

                  <h1 className="absolute bottom-3 left-4 bg-[red] rounded-full w-4 h-4 flex items-center justify-center text-[9px] text-[white] font-semibold">
                    {cartCounter.length}
                  </h1>
                </div>

                {/* mobile menu bar icon */}
                <div>
                  <FiMenu
                    onClick={mobileMenu}
                    className="text-[grey] text-2xl md:hidden cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* show mobile search bar */}
        <div className="mobile_search pl-6 pr-6 md:hidden fixed top-14 w-[100%] pb-2 bg-white ">
          {mobilesearch && (
            <div className="flex items-center gap-2">
              {/* "relative" lets the icon sit inside the input */}
              <div className="relative">
                <CiSearch className="absolute top-1 left-2 text-xl text-[#383838]" />
                <input
                  type="text"
                  placeholder="Search for an item"
                  className="bg-[#F3F3F6] w-[70vw] p-1 pl-8 rounded-full outline-none text-sm "
                  value={search}
                  onChange={Search}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <button
                onClick={handleSearch}
                className="text-[white] bg-[#151ec7] rounded-3xl p-2 text-sm"
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