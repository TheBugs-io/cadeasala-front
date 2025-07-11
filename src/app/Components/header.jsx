import "../styles/Header.css";
import logo from "../assets/logo/logoSMD.png";
import usuario from "../assets/usuario/usuario.png";

const Header = ({ onAccountClick, onSearch }) => {
  return (
    <header className="header-container">
      <img src={logo} alt="Logo" className="header-logo" />
      
      <input
        type="text"
        className="header-search"
        placeholder="Pesquisar por professor, reserva, sala..."
        onChange={e => onSearch && onSearch(e.target.value)}
      />
      
      <button className="header-account-btn" onClick={onAccountClick}>
        <img src={usuario} alt="Conta" className="header-account-icon" />
      </button>
    </header>
  );
};

export default Header;
