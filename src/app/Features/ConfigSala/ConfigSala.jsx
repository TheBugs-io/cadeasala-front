import { useParams } from "react-router-dom";
import React, { useState } from "react";
import "./ConfigSala.css";
import TrilhaNavegacao from "../../Components/TrilhaNavegacao";

const ConfigSala = () => {
  const { id } = useParams();
  const [nome, setNome] = useState("SALA 05");
  const [andar, setAndar] = useState("1º andar");
  const [descricao, setDescricao] = useState("Sala com macbooks");
  const [capacidade, setCapacidade] = useState(30);
  const [reservada, setReservada] = useState(true);

  return (
    <main className="config-sala-container">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Sala"},
          { label: "Editar sala" },
        ]}
      />

      <div className="config-sala-content">
        <img
          src="/placeholder-img.png" // substitua por imagem real
          alt="Imagem da sala"
          className="config-sala-image"
        />

        <div className="config-sala-info">
          <div className="config-sala-title">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="title-input"
            />
            <span>{andar}</span>
          </div>

          <p>
            <strong>Descrição:</strong> <span>{descricao}</span>
          </p>
          <p>
            <strong>Capacidade:</strong> <span>{capacidade}</span>
          </p>
          <p>
            <strong>Estado atual:</strong>{" "}
            <span
              className={`status-badge ${reservada ? "reservada" : "livre"}`}
            >
              {reservada ? "Reservada" : "Livre"}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ConfigSala;