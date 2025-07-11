import Card from "./Components/CardSalaMapa";
import HallwayMap from "./components/Hallway";
import "./styles/MapaStyle.css";
import FloorSelector from "./components/AndarSelector";
import { salas } from "../../../models/SalasModel";

const MapaSalas = () => {
  return (
    <div className="mapa-salas-container">
      <FloorSelector />
      <div className="map-container">
        {/* Linha de cima */}
        <div className="row">
          {salas.slice(0, 6).map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.sala}
              dados={sala.dados}
            />
          ))}
        </div>

        <HallwayMap />

        {/* Linha de baixo */}
        <div className="row">
          {salas.slice(6, 12).map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.sala}
              dados={sala.dados}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapaSalas;
