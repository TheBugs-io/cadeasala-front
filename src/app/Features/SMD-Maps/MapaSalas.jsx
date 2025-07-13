import React, { useState } from "react";
import Card from "./Components/CardSalaMapa";
import HallwayMap from "./Components/Hallway";
import "./styles/MapaStyle.css";
import FloorSelector from "./Components/AndarSelector";
import { salas } from "../../../models/SalasModel";
import Modal from "../../Components/Modal";
import RoomDetails from "../DescSala/DescSala";

function MapaSalas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [andarSelecionado, setAndarSelecionado] = useState("PRIMEIRO_ANDAR");

  const handleAbrirModal = (sala, status, dados) => {
    setDadosSelecionados({ sala, status, dados });
    setModalAberto(true);
  };

  const salasFiltradas = salas.filter(
    (sala) => sala.localizacao === andarSelecionado
  );

  return (
    <div className="mapa-salas-container">
      <FloorSelector value={andarSelecionado} onChange={setAndarSelecionado} />

      <div className="map-container">
        <div className="row">
          {salasFiltradas.slice(0, 5).map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.nome}
              dados={sala}
              aoClicar={handleAbrirModal}
            />
          ))}
        </div>

        <HallwayMap />

        <div className="row">
          {salasFiltradas.slice(6, 12).map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.nome}
              dados={sala}
              aoClicar={handleAbrirModal}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        {dadosSelecionados && (
          <RoomDetails
            sala={dadosSelecionados.sala}
            status={dadosSelecionados.status}
            dados={dadosSelecionados.dados}
            onClose={() => setModalAberto(false)}
          />
        )}
      </Modal>
    </div>
  );
}

export default MapaSalas;