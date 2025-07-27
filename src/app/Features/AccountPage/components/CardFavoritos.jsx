import "../styles/CardFavoritos.css";

const CardFavoritos = ({ sala, onClick }) => {
  return (
    <article
      className="card-favorito"
      role="group"
      aria-labelledby={`sala-nome-${sala.id}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick?.();
      }}
    >
      <div className="favorite-info">
        <h3 id={`sala-nome-${sala.id}`} className="favorite-name">
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