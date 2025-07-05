import { useState, useEffect } from "react";
import "../styles/AcessibilityBar.css";
import { IoAccessibilitySharp, IoContrastOutline } from "react-icons/io5";


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
      <button onClick={increaseFont}>A+</button>
      <button onClick={decreaseFont}>A-</button>
      <button onClick={toggleContrast}>
        <IoContrastOutline />
        {highContrast ? "Modo Claro" : "Alto Contraste"}
      </button>
      <button onClick={resetAccessibility}>Resetar</button>
    </div>
  );
};

export default AccessibilityBar;
