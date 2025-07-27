import { FaTools, FaDoorOpen } from "react-icons/fa";
import "../styles/CardMapaStyle.css";
import { MdReportProblem } from "react-icons/md";

function Card({ status, sala, dados = {}, aoClicar }) {
  const handleClick = () => {
    if (aoClicar && status !== "CARREGANDO") aoClicar(sala, status, dados);
  };

  const handleKeyDown = (e) => {
    if (status === "CARREGANDO") return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const reservaDisciplina = dados.reservas?.find(
    (r) => r.tipo === "DISCIPLINA"
  );

  const renderContent = () => {
    if (status === "CARREGANDO") {
      return (
        <>
          <div
            className="loading-placeholder loading-title"
            aria-hidden="true"
          ></div>
          <div
            className="loading-placeholder loading-subtitle"
            aria-hidden="true"
          ></div>
          <div
            className="loading-placeholder loading-time"
            aria-hidden="true"
          ></div>
        </>
      );
    }

    if (status === "RESERVADA" && reservaDisciplina) {
      return (
        <>
          <h2>{reservaDisciplina.nomeDisciplina}</h2>
          <p className="small">
            {reservaDisciplina.professor || dados.professor}
          </p>
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
          <div className="manutencao" aria-label="Sala em manutenção">
            <h2>MANUTENÇÃO</h2>
            <FaTools size={24} aria-hidden="true" />
          </div>
        );
      case "LIVRE":
        return (
          <div className="livre" aria-label="Sala livre">
            <h2>LIVRE</h2>
            <FaDoorOpen size={24} aria-hidden="true" />
          </div>
        );
      case "PROBLEMA_TECNICO":
        return (
          <div className="manutencao" aria-label="Sala em manutenção">
            <h2>INDISPONÍVEL</h2>
            <MdReportProblem size={24} aria-hidden="true" />
          </div>
        );
      default:
        return <h2>LIVRE</h2>;
    }
  };

  return (
    <div
      role={status === "CARREGANDO" ? undefined : "button"}
      tabIndex={status === "CARREGANDO" ? -1 : 0}
      className={`card status-${status}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        cursor: status === "CARREGANDO" ? "default" : "pointer",
        opacity: status === "CARREGANDO" ? 0.7 : 1,
      }}
      aria-label={
        status === "CARREGANDO"
          ? "Carregando informações da sala"
          : `Sala ${sala}, status ${
              status ? status.toLowerCase().replace("_", " ") : "desconhecido"
            }. Pressione Enter para detalhes.`
      }
      aria-busy={status === "CARREGANDO" ? "true" : "false"}
    >
      <p className="small" aria-hidden="true">
        {status === "CARREGANDO" ? "..." : sala}
      </p>
      {renderContent()}
    </div>
  );
}

export default Card;
