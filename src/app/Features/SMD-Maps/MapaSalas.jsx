import Card from "./Components/CardSalaMapa";
import HallwayMap from "./components/Hallway";
import "./styles/MapaStyle.css";

const MapaSalas = () => {
  return (
    <div className="mapa-salas-container">
      {/* TODO: Linha com filtro de andar e horário */}
      {/* TODO: Botão com popup dos filtros */}
      {/* TODO: Mapa - componentes dentro dele */}
      {/* Linha de cima */}
      <div className="map-container">
        <div className="row">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} highlight={i === 0} />
          ))}
        </div>

        <HallwayMap />
        {/* Linha de baixo */}
        <div className="row">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i + 6} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapaSalas;
