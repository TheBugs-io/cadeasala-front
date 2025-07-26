import "../styles/CardFavoritos.css";

const CardFavoritos = ({ sala }) => {
  return (
    <article
      className="card-favorito"
      role="group"
      aria-labelledby={`sala-nome-${sala.id}`}
    >
      <div className="favorite-info">
        <h3
          id={`sala-nome-${sala.id}`}
          className="favorite-name"
        >
          {sala.nome}
        </h3>
        <span
          className={`status-badge status-${sala.status?.toLowerCase() || "funcional"}`}
          aria-label={`Status: ${sala.status || "funcional"}`}
        >
          {sala.status || "Funcional"}
        </span>
      </div>
    </article>
  );
};

export default CardFavoritos;