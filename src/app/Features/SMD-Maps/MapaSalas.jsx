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

  const handleAbrirModal = (sala, status, dados) => {
    setDadosSelecionados({ sala, status, dados });
    setModalAberto(true);
  };

  return (
    <div className="mapa-salas-container">
      <FloorSelector />
      <div className="map-container">
        <div className="row">
          {salas.slice(0, 6).map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.sala}
              dados={sala.dados}
              aoClicar={handleAbrirModal}
            />
          ))}
        </div>

        <HallwayMap />

        <div className="row">
          {salas.slice(6, 12).map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.sala}
              dados={sala.dados}
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
