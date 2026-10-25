import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ cartItems }) {
  return (
    <>
      <Navbar cartCounter={cartItems}/>
      <Outlet />
      <Footer/>
    </>
  );
}


export default Layout;