import { FiSearch } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/TabBar.css";
import { useAuth } from "../../contexts/AuthContext"; // ou o caminho certo no seu projeto

const TabBar = ({ setMenuAberto }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // agora acessa o estado de login

  const handleRedirect = () => {
    if (!user) {
      navigate("/login");
    } else if (user.tipo === "SECRETARIO") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
    setMenuAberto?.(false);
  };

  const tabs = [
    { label: "Busca", icon: <FiSearch size={24} />, path: "/busca" },
    { label: "Mapa", icon: <HiOutlineMap size={24} />, path: "/mapa-salas" },
    { label: "Conta", icon: <FaRegUserCircle size={24} />, path: handleRedirect },
  ];

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => {
        const isActive =
          typeof tab.path === "string" && location.pathname === tab.path;

        return (
          <button
            key={tab.label}
            className={`tab-item ${isActive ? "active" : ""}`}
            onClick={() => {
              if (typeof tab.path === "function") {
                tab.path();
              } else {
                navigate(tab.path);
              }
            }}
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