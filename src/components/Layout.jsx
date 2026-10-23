import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout({ cartItems }) {
  return (
    <>
      <Navbar cartCounter={cartItems}/>
      <Outlet />
    </>
  );
}


export default Layout;