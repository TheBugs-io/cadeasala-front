import React from "react";
import "../styles/CardMapaStyle.css";

/* TODO: Passar pra mudar o estilo / cores do card dependendo do status */
function Card({ highlight = false }) {
  return (
    <div className={`card ${highlight ? "highlight" : ""}`}>
      <p className="small">Sala 01</p>
      <h2>Design de<br />Interfaces<br />Gráficas</h2>
      <p className="small">Inga Freire Sabóia</p>
      <p className="bold">Ter–Qui (14h–16h)</p>
    </div>
  );
}

export default Card;