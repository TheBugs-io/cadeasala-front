import React from "react";
import TagStatus from "./components/TagStatus";
import "./styles/RoomDetailsPage.css";

export default function RoomDetails({ sala, status, dados, onClose }) {
  const image = dados?.imagem || "https://conceito.de/wp-content/uploads/2019/04/sala-de-aula.jpg";

  return (
    <div className="room-overlay">
      <div className="room-modal">
        <div className="room-header">
          <button className="room-close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="room-content">
          <div className="room-image-box">
            <img src={image} alt={sala} className="room-image" />
            <button className="room-favorite-button">❤️ Favoritar sala</button>
          </div>
          <div className="room-info">
            <h2>{dados?.nome || "SALA"}</h2>
            <p>{dados?.descricao || "Sem descrição disponível."}</p>
            <p>
              <strong>Capacidade:</strong> {dados?.capacidade || "Indefinida"}
            </p>
            <p>
              <strong>Estado atual:</strong>
              <TagStatus status={status} />
            </p>
          </div>
        </div>

        {dados?.reservas && dados.reservas.length > 0 && (
          <div className="room-reservations">
            <h3>Próximas reservas</h3>
            {dados.reservas.map((res) => (
              <div
                key={res.id}
                className={
                  res.status === "ativo"
                    ? "room-reservation-active"
                    : "room-reservation-inactive"
                }
              >
                {res.title} - {res.time}
              </div>
            ))}
          </div>
        )}

        <div className="room-footer">
          <button className="room-schedule-button">Agendar reserva</button>
        </div>
      </div>
    </div>
  );
}