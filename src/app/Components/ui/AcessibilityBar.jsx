import "../../styles/AcessibilityBar.css";
import { IoContrastOutline } from "react-icons/io5";
import brazilIcon from "../../assets/icons/brazilVector.svg";
import { useAcessibilidade } from "../../contexts/AcessibilityContext";

const AccessibilityBar = () => {
  const {
    increaseFont,
    decreaseFont,
    toggleContrast,
    highContrast,
  } = useAcessibilidade();

  return (
    <div className="accessibility-bar">
      <div className="acessibility-container">
        <div className="acessibility-actions">
          <a accessKey="1" href="#mainContent" title="Ir para o conteúdo">
            <b style={{ textDecoration: "underline" }}>Ir para o conteúdo</b>{" "}
            <b>[1]</b>
          </a>
          <a accessKey="2" href="#footer" title="Ir para o rodapé">
            <b style={{ textDecoration: "underline" }}>Ir para o rodapé</b>{" "}
            <b>[2]</b>
          </a>
        </div>
        <div className="acessibility-options">
          <button onClick={increaseFont} aria-label="Aumentar fonte">A+</button>
          <button onClick={decreaseFont} aria-label="Diminuir fonte">A-</button>
          <button onClick={toggleContrast} aria-label={highContrast ? "Modo Claro" : "Alto Contraste"}>
            <IoContrastOutline />
            {highContrast ? "Modo Claro" : "Alto Contraste"}
          </button>
          <hr />
          <img
            src={brazilIcon}
            alt="Bandeira do Brasil representa a linguagem do site."
          />
        </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;