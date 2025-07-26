import { useNavigate } from "react-router-dom";
import iconPlaceholder from "../../assets/placeholder/idv.png";
import imageBanner from "../../assets/placeholder/image 7.png";
import "./LandingHome.css";

const LandingHome = () => {
  const navigate = useNavigate();

  const navigateToMapaSalas = () => {
    navigate("/mapa-salas", { state: { scrollToId: "mainContent" } });
  };

  return (
    <main className="banner-landing-container">
      <img
        src={imageBanner}
        alt="Fotografia de fundo retratando o bloco de Sistemas e Mídias Digitais"
        className="banner-image"
        aria-hidden="true"
      />

      <section
        className="banner-content-container"
        aria-labelledby="titulo-principal"
      >
        <div className="banner-text-container">
          <img
            src={iconPlaceholder}
            alt="Ícone do Instituto Universidade Virtual"
            className="icon-placeholder"
          />
          <h1 id="titulo-principal" className="banner-title">
            CADÊ A SALA?
          </h1>
          <h2 className="banner-subtitle">
            Sistema de localização de salas do Instituto Universidade Virtual.
          </h2>
        </div>
        <button
          className="btn-redirect-mapa"
          onClick={navigateToMapaSalas}
          aria-label="Ir para o mapa de salas do Instituto"
        >
          Ir para o mapa de salas
        </button>
      </section>
    </main>
  );
};

export default LandingHome;
