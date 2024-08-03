import { Outlet } from "react-router-dom";
import Nav from "../nav";
import "./style.css";

const Layout = () => {
  return (
    <>
      <div className="outlet-layout">
        <Outlet />
      </div>
      <div className="navbar-layout">
        <Nav />
      </div>
    </>
  );
};

export default Layout;
