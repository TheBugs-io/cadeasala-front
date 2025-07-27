import "../../styles/Header.css";
import logo from "../../assets/logo/logocadesala.png";
import usuarioIcone from "../../assets/usuario/usuario.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosPerson } from "react-icons/io";
import SearchBar from "./SearchBar";

const Header = ({
  onSearch,
  resultados = { usuarios: [], salas: [], reservas: [] },
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const esconderSearch = ["/login", "/"].includes(location.pathname);

  const handleBackHome = () => {
    navigate("/");
  };

  const handleRedirect = () => {
    if (user?.tipo === "SECRETARIO") {
      navigate("/admin");
    } else {
      navigate("/user");
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuAberto(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="header-container" aria-label="Cabeçalho do site">
      <img
        src={logo}
        alt="Logo da plataforma Cadê a Sala"
        className="header-logo"
        onClick={handleBackHome}
        role="link"
        tabIndex={0}
        aria-label="Ir para a página inicial do site"
        onKeyDown={(e) => e.key === "Enter" && handleBackHome()}
      />

      {!esconderSearch && (
        <SearchBar
          onSearch={onSearch}
          resultados={resultados}
          esconder={esconderSearch}
        />
      )}

      {user ? (
        <div className="header-account-wrapper" ref={menuRef}>
          <button
            className="header-account-btn"
            ref={btnRef}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-haspopup="true"
            aria-expanded={menuAberto}
            aria-controls="menu-conta"
            aria-label={`Abrir menu da conta de ${user.nome}`}
          >
            <img
              src={user.imagem || usuarioIcone}
              alt={`Foto de perfil de ${user.nome}`}
              className="header-account-icon"
            />
            <span className="header-account-nome">{user.nome}</span>
          </button>

          {menuAberto && (
            <div
              className="account-dropdown"
              role="menu"
              id="menu-conta"
              aria-label="Menu da conta"
            >
              <button
                role="menuitem"
                tabIndex={0}
                onClick={handleRedirect}
                aria-label="Ir para minha página inicial contendo informações da conta e funções"
              >
                Minha página inicial <FiArrowUpRight size={20} />
              </button>
              <button
                role="menuitem"
                tabIndex={0}
                onClick={handleLogout}
                className="logout-btn"
                aria-label="Encerrar sessão e sair da conta"
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
