import "../styles/Header.css";
import logo from "../assets/logo/logoSMD.png";
import usuarioIcone from "../assets/usuario/usuario.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosPerson } from "react-icons/io";

const Header = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const esconderSearch = ["/login", "/"].includes(location.pathname);

  const handleBackHome = () => {
    navigate("/");
  };

  const handleRedirect = () => {
    if (user?.tipo === "SECRETARIO") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
    setMenuAberto(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuAberto(false);
  };

  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <header className="header-container" aria-label="Cabeçalho do site">
      <img
        src={logo}
        alt="Logo da plataforma"
        className="header-logo"
        onClick={handleBackHome}
      />

      {!esconderSearch && (
        <>
          <label htmlFor="header-search" className="sr-only">
            Buscar por professor, reserva ou sala
          </label>
          <input
            id="header-search"
            type="text"
            className="header-search"
            placeholder="Pesquisar por professor, reserva, sala..."
            aria-label="Pesquisar"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </>
      )}

      {user ? (
        <div className="header-account-wrapper" ref={menuRef}>
          <button
            className="header-account-btn"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={`Abrir menu da conta de ${user.nome}`}
          >
            <img
              src={user.imagem || usuarioIcone}
              alt={`Ícone da conta de ${user.nome}`}
              className="header-account-icon"
            />
            <span className="header-account-nome">{user.nome}</span>
          </button>

          {menuAberto && (
            <div
              className="account-dropdown"
              role="menu"
              aria-label="Menu da conta"
            >
              <button role="menuitem" tabIndex={0} onClick={handleRedirect}>
                Minha página inicial <FiArrowUpRight size={20} />
              </button>
              <button
                role="menuitem"
                tabIndex={0}
                onClick={handleLogout}
                className="logout-btn"
              >
                <b>Sair</b> <MdLogout size={20} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="header-login-btn"
          onClick={() => navigate("/login")}
          aria-label="Ir para a página de login"
        >
          <IoIosPerson size={20} /> Entrar na conta
        </button>
      )}
    </header>
  );
};

export default Header;