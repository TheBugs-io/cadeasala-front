import { useState, useEffect } from "react";
import "../styles/AcessibilityBar.css";
import { IoAccessibilitySharp, IoContrastOutline } from "react-icons/io5";
import brazilIcon from "../assets/icons/brazilVector.svg";

const AccessibilityBar = () => {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}%`;
    document.body.classList.toggle("high-contrast", highContrast);
  }, [fontSize, highContrast]);

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 10, 150));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 10, 70));
  const toggleContrast = () => setHighContrast((prev) => !prev);
  const resetAccessibility = () => {
    setFontSize(100);
    setHighContrast(false);
  };

  return (
    <div className="accessibility-bar">
      <div className="acessibility-container">
      <div className="acessibility-actions">
      <a accessKey="1" href="#mainContent" title="Ir para o conteúdo">
        <b style={{ fontWeight: "bold", textDecoration: "underline" }} lang="pt-br">Ir para o conteúdo</b> <b style={{ fontWeight: "bold" }}>[1]</b>
      </a>
      {/* Mudar depois para o ID do conteudo / botão */}
      <a accessKey="2" href="#footer" title="Ir para o mapa">
        <b style={{ fontWeight: "bold", textDecoration: "underline" }} lang="pt-br">Ir para o mapa</b> <b style={{ fontWeight: "bold" }}>[2]</b>
      </a>
      </div>
      <div className="acessibility-options">
        <button onClick={increaseFont}>A+</button>
        <button onClick={decreaseFont}>A-</button>
        <button onClick={toggleContrast}>
          <IoContrastOutline />
          {highContrast ? "Modo Claro" : "Alto Contraste"}
        </button>
        <hr />
        <img src={brazilIcon} alt="Bandeira do Brasil representa a linguagem do site." />
      </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;
