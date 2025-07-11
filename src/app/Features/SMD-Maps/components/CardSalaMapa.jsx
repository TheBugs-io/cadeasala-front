import React from "react";
import { FaTools, FaDoorOpen } from "react-icons/fa"; // ícone de construção
import "../styles/CardMapaStyle.css";

function Card({ status = "LIVRE", sala = "Sala 01", dados = {} }) {
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
      case "EM_MANUTENCAO":
        return (
          <div className="manutencao">
            <h2>MANUTENÇÃO</h2>
            <FaTools size={24} />
          </div>
        );
      case "LIVRE":
        return (
          <div className="livre">
            <h2>LIVRE</h2>
            <FaDoorOpen size={24} />
          </div>
        );
      default:
        return <h2>LIVRE</h2>;
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
