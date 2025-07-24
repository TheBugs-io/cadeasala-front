import { Outlet, useLocation } from "react-router-dom";
import AccessibilityBar from "./AcessibilityBar";
import Header from "./header";
import TabBar from "./TabBar"; // importe a nova tab bar

const Layout = () => {
  const location = useLocation();

  const esconderTabBar = ["/login", "/"].includes(location.pathname);

  return (
    <>
      <AccessibilityBar />
      <Header />
      
      <main style={{ paddingBottom: esconderTabBar ? 0 : "4rem" }}>
        <Outlet />
      </main>

      {!esconderTabBar && <TabBar />}
    </>
  );
};

export default Layout;