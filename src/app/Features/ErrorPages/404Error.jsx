import notFoundImage from "../../assets/placeholder/notFound.svg";
import { useNavigate } from "react-router-dom";
import "./styles/NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };
  return (
    <div className="not-found">
      <img
        src={notFoundImage}
        alt="Página não encontrada"
        className="not-found-image"
      />
      <h1
        className="not-found-title"
        aria-label="Título da página não encontrada"
      >
        404 - Página não encontrada
      </h1>
      <p className="not-found-message">
        <b>Oppps... </b>Desculpe, a página que você está procurando não existe.
      </p>
      <button className="btn-primary" onClick={handleRedirect} aria-label="Voltar para a página inicial" role="button">
        Voltar para a página inicial
      </button>
    </div>
  );
};

export default NotFoundPage;
