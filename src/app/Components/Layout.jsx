import { Outlet } from "react-router-dom";
import AccessibilityBar from "../Components/AcessibilityBar";
import Header from "./Header";
/* import Footer from "../Footer/Footer" */

const Layout = () => {
  return (
    <>
      <AccessibilityBar />
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
