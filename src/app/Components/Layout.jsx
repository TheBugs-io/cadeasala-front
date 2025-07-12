import { Outlet } from "react-router-dom";
import AccessibilityBar from "./AcessibilityBar";
import Header from "./header";
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
