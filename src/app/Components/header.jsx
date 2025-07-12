import "../styles/Header.css";
import logo from "../assets/logo/logoSMD.png";
import usuarioIcone from "../assets/usuario/usuario.png";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";

const Header = ({ onAccountClick, onSearch }) => {
  const { usuario } = useContext(AuthContext);
  const location = useLocation();

  const esconderSearch = ["/login", "/"].includes(location.pathname);

  return (
    <header className="header-container" aria-label="Cabeçalho do site">
      <img src={logo} alt="Logo da plataforma" className="header-logo" />

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

      <button
        className="header-account-btn"
        onClick={onAccountClick}
        aria-label={`Abrir menu da conta de ${usuario?.nome || "usuário"}`}
        title={`Abrir conta de ${usuario?.nome || "usuário"}`}
      >
        <img
          src={usuario?.imagem || usuarioIcone}
          alt={`Ícone da conta de ${usuario?.nome || "usuário"}`}
          className="header-account-icon"
        />
        {usuario && <span className="header-account-nome">{usuario.nome}</span>}
      </button>
    </header>
  );
};

export default Header;
