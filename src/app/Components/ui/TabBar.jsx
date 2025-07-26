import { FiSearch } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/TabBar.css";

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "Busca", icon: <FiSearch size={24} />, path: "/busca" },
    { label: "Mapa", icon: <HiOutlineMap size={24} />, path: "/mapa-salas" },
    { label: "Conta", icon: <FaRegUserCircle size={24} />, path: "/user" },
  ];

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;

        return (
          <button
            key={tab.path}
            className={`tab-item ${isActive ? "active" : ""}`}
            onClick={() => navigate(tab.path)}
          >
            <div style={{ fontSize: "1.5rem" }}>{tab.icon}</div>
            <p>{tab.label}</p>
          </button>
        );
      })}
    </nav>
  );
};

export default TabBar;
