import { useState } from "react";
import Card from "./Components/CardSalaMapa";
import HallwayMap from "./Components/Hallway";
import "./styles/MapaStyle.css";
import FloorSelector from "./Components/AndarSelector";
import Modal from "../../Components/Modal";
import RoomDetails from "../DescSala/DescSala";
import { salas } from "../../../models/SalasModel";

const salasMock = salas;

function MapaSalas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [andarSelecionado, setAndarSelecionado] = useState("PRIMEIRO_ANDAR");

  const salasFiltradas = salasMock;

  const handleAbrirModal = (sala) => {
    setDadosSelecionados(sala);
    setModalAberto(true);
  };

  return (
    <div className="mapa-salas-container">
      <FloorSelector value={andarSelecionado} onChange={setAndarSelecionado} />

      <div className="map-container">
        <div className="row">
          {salasFiltradas.slice(0, 5).map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.sala}
              dados={sala}
              aoClicar={() => handleAbrirModal(sala)}
            />
          ))}
        </div>

        <HallwayMap />

        <div className="row">
          {salasFiltradas.slice(6, 12).map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.sala}
              dados={sala}
              aoClicar={() => handleAbrirModal(sala)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        {dadosSelecionados && (
          <RoomDetails
            dados={dadosSelecionados}
            onClose={() => setModalAberto(false)}
          />
        )}
      </Modal>
    </div>
  );
}

export default MapaSalas;