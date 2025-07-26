/* Isso aqui é pra barra de acessiblidade persistir nas telas e mudar por ex, as ações dependendo da tela */

import { createContext, useContext, useEffect, useState } from "react";

const AcessibilidadeContext = createContext();

export const AcessibilidadeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem("fontSize")) || 100;
  });
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("highContrast") === "true";
  });

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}%`;
    document.body.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("highContrast", highContrast);
  }, [fontSize, highContrast]);

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 10, 150));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 10, 70));
  const toggleContrast = () => setHighContrast((prev) => !prev);
  const resetAccessibility = () => {
    setFontSize(100);
    setHighContrast(false);
  };

  return (
    <AcessibilidadeContext.Provider
      value={{
        fontSize,
        highContrast,
        increaseFont,
        decreaseFont,
        toggleContrast,
        resetAccessibility,
      }}
    >
      {children}
    </AcessibilidadeContext.Provider>
  );
};

export const useAcessibilidade = () => useContext(AcessibilidadeContext);