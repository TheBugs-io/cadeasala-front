import React from "react";
import "../styles/CardMapaStyle.css";

function Card({ status = "vazia", sala = "Sala 01", dados = {} }) {
  const renderContent = () => {
    switch (status) {
      case "DISCIPLINA":
        return (
          <>
            <h2>{dados.disciplina}</h2>
            <p className="small">{dados.professor}</p>
            <p className="bold">{dados.horario}</p>
          </>
        );
      case "RESERVADA":
        return (
          <>
            <h2>Reservada</h2>
            <p className="small">{dados.autor}</p>
            <p className="bold">{dados.horario}</p>
          </>
        );
      case "LIVRE":
      default:
        return <h2>Livre</h2>;
    }
  };

  return (
    <div className={`card status-${status}`}>
      <p className="small">{sala}</p>
      {renderContent()}
    </div>
  );
}

export default Card;