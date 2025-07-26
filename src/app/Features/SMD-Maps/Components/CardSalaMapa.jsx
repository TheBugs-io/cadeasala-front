import { FaTools, FaDoorOpen } from "react-icons/fa";
import "../styles/CardMapaStyle.css";

function Card({ status, sala, dados = {}, aoClicar }) {
  const handleClick = () => {
    if (aoClicar) aoClicar(sala, status, dados);
  };

  const reservaDisciplina = dados.reservas?.find((r) => r.tipo === "DISCIPLINA");

  const renderContent = () => {
    if (status === "CARREGANDO") {
      return (
        <>
          <div className="loading-placeholder loading-title"></div>
          <div className="loading-placeholder loading-subtitle"></div>
          <div className="loading-placeholder loading-time"></div>
        </>
      );
    }

    if (status === "RESERVADA" && reservaDisciplina) {
      return (
        <>
          <h2>{reservaDisciplina.nomeDisciplina}</h2>
          <p className="small">{reservaDisciplina.professor || dados.professor}</p>
          <p className="bold">{reservaDisciplina.horario || dados.horario}</p>
        </>
      );
    }

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
    <div
      className={`card status-${status}`}
      onClick={handleClick}
      style={{ cursor: status === "CARREGANDO" ? "default" : "pointer", opacity: status === "CARREGANDO" ? 0.7 : 1 }}
    >
      <p className="small">{status === "CARREGANDO" ? "..." : sala}</p>
      {renderContent()}
    </div>
  );
}

export default Card;