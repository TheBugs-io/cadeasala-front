import { MdFilterList } from "react-icons/md";
import Card from "./Components/CardSalaMapa";
import HallwayMap from "./Components/Hallway";
import FloorSelector from "./Components/AndarSelector";
import Modal from "../../Components/ui/Modal";
import RoomDetails from "../DescSala/DescSala";
import Filtros from "./Components/FiltroDrawer";
import DataNavegacao from "./Components/DataNavegacao";
import DataTimeNavegacao from "./Components/DataTimeNavegacao";
import { useMapaSalas } from "../../hooks/useMapaSalas";
import "./styles/MapaStyle.css";

function MapaSalas() {
  const {
    state,
    updateState,
    salasE,
    salasD,
    handleAbrirModal,
    handleFecharModal,
    aplicarFiltros,
  } = useMapaSalas();

  const renderSalaCard = (sala) => (
    <Card
      key={sala.id}
      status={sala.statusExibicao}
      sala={sala.nome}
      dados={sala}
      aoClicar={(e) => handleAbrirModal(sala, e)}
      aria-label={`Sala ${sala.nome}, status ${sala.statusExibicao}`}
    />
  );

  return (
    <main className="mapa-salas-container" aria-label="Mapa de salas">
      <div className="data-horario-container">
        <DataNavegacao
          dataSelecionada={state.dataAtual}
          onDataChange={(data) => updateState({ dataAtual: data })}
        />
        <DataTimeNavegacao
          horarioSelecionado={state.horarioSelecionado}
          onSelecionarHorario={(horario) =>
            updateState({ horarioSelecionado: horario })
          }
        />
      </div>

      <div className="map-header">
        <FloorSelector
          value={state.andarSelecionado}
          onChange={(andar) => updateState({ andarSelecionado: andar })}
        />
        <button onClick={() => updateState({ filtrosAbertos: true })} className="btn-filtros" aria-label="Abrir filtros">
          <MdFilterList size={20} />
        </button>
        <Filtros
          aberto={state.filtrosAbertos}
          onFechar={() => updateState({ filtrosAbertos: false })}
          onAplicar={aplicarFiltros}
        />
      </div>

      <section className="map-container">
        <div className="row" role="list">
          {state.carregando
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Card key={`loading-${i}`} status="CARREGANDO" />
                ))
            : salasE.map(renderSalaCard)}
        </div>

        <HallwayMap />

        <div className="row" role="list">
          {state.carregando
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Card key={`loading-${i}`} status="CARREGANDO" />
                ))
            : salasD.map(renderSalaCard)}
        </div>
      </section>

      <Modal isOpen={state.modalAberto} onClose={handleFecharModal}>
        {state.dadosSelecionados && (
          <RoomDetails
            dados={state.dadosSelecionados}
            onClose={handleFecharModal}
          />
        )}
      </Modal>
    </main>
  );
}

export default MapaSalas;