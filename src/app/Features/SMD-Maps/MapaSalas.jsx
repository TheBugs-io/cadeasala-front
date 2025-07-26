import { useEffect, useState, useRef } from "react";
import Card from "./Components/CardSalaMapa";
import HallwayMap from "./Components/Hallway";
import "./styles/MapaStyle.css";
import FloorSelector from "./Components/AndarSelector";
import Modal from "../../Components/ui/Modal";
import RoomDetails from "../DescSala/DescSala";
import { fetchSalas } from "../../service/mapa/salasService";
import { ordenarPorNumeracaoSala } from "./helper/orderNumeracaoSala";

function MapaSalas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [andarSelecionado, setAndarSelecionado] = useState("PRIMEIRO_ANDAR");
  const [salas, setSalas] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("TODOS");
  const [carregando, setCarregando] = useState(true);
  const ultimaFocoRef = useRef(null);

  const salasFiltradas = salas.filter((sala) => {
    const correspondeAoAndar = sala.localizacao === andarSelecionado;
    const correspondeAoStatus =
      filtroStatus === "TODOS" || sala.status === filtroStatus;
    return correspondeAoAndar && correspondeAoStatus;
  });

  useEffect(() => {
    const buscarSalas = async () => {
      try {
        setCarregando(true);
        const resposta = await fetchSalas();
        setSalas(Array.isArray(resposta) ? resposta : resposta.salas || []);
      } catch (erro) {
        console.error("Erro ao buscar salas:", erro);
      } finally {
        setCarregando(false);
      }
    };
    buscarSalas();
  }, []);

  const handleAbrirModal = (sala, e) => {
    ultimaFocoRef.current = e.currentTarget;
    setDadosSelecionados(sala);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setDadosSelecionados(null);
    if (ultimaFocoRef.current) ultimaFocoRef.current.focus();
  };

  const salasFiltradasOrdenadas = [...salasFiltradas].sort(
    ordenarPorNumeracaoSala
  );

  const salasE = salasFiltradasOrdenadas.filter((sala) =>
    sala.numeracaoSala.toUpperCase().endsWith("E")
  );

  const salasD = salasFiltradasOrdenadas.filter((sala) =>
    sala.numeracaoSala.toUpperCase().endsWith("D")
  );

  useEffect(() => {
    const ignoradas = salasFiltradasOrdenadas.filter(
      (sala) =>
        !sala.numeracaoSala.endsWith("E") && !sala.numeracaoSala.endsWith("D")
    );
    if (ignoradas.length > 0) {
      console.warn("Salas ignoradas por não ter lado:", ignoradas);
    }
  }, [salasFiltradasOrdenadas]);

  return (
    <main
      className="mapa-salas-container"
      aria-label="Mapa de salas do Instituto Universidade Virtual"
    >
      <nav aria-label="Seleção do andar">
        <FloorSelector
          value={andarSelecionado}
          onChange={setAndarSelecionado}
          aria-describedby="infoAndar"
        />
        <div id="infoAndar" className="sr-only">
          Selecione o andar para filtrar as salas exibidas no mapa.
        </div>
      </nav>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {carregando
          ? "Carregando informações das salas, por favor aguarde."
          : `${salasFiltradas.length} salas disponíveis para o andar selecionado.`}
      </div>

      <section className="map-container" aria-label="Salas e mapa do andar">
        <div className="row" role="list" aria-label="Salas lado esquerdo">
          {carregando
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Card
                    key={`loadingE-${i}`}
                    status="CARREGANDO"
                    sala=""
                    dados={{}}
                    aoClicar={null}
                    role="listitem"
                    tabIndex={-1}
                    aria-busy="true"
                  />
                ))
            : salasE.map((sala) => (
                <Card
                  key={sala.id}
                  status={sala.status}
                  sala={sala.nome}
                  dados={sala}
                  aoClicar={(e) => handleAbrirModal(sala, e)}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`Sala ${sala.nome}, status ${sala.status}. Pressione enter para ver detalhes.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleAbrirModal(sala, e);
                    }
                  }}
                />
              ))}
        </div>

        <HallwayMap aria-label="Mapa do corredor do andar selecionado" />

        <div className="row" role="list" aria-label="Salas lado direito">
          {carregando
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Card
                    key={`loadingD-${i}`}
                    status="CARREGANDO"
                    sala=""
                    dados={{}}
                    aoClicar={null}
                    role="listitem"
                    tabIndex={-1}
                    aria-busy="true"
                  />
                ))
            : salasD.map((sala) => (
                <Card
                  key={sala.id}
                  status={sala.status}
                  sala={sala.nome}
                  dados={sala}
                  aoClicar={(e) => handleAbrirModal(sala, e)}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`Sala ${sala.nome}, status ${sala.status}. Pressione enter para ver detalhes.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleAbrirModal(sala, e);
                    }
                  }}
                />
              ))}
        </div>
      </section>

      <Modal
        isOpen={modalAberto}
        onClose={handleFecharModal}
        ariaLabel="Detalhes da sala selecionada"
        initialFocusRef={null}
        returnFocusRef={ultimaFocoRef}
      >
        {dadosSelecionados && (
          <RoomDetails dados={dadosSelecionados} onClose={handleFecharModal} />
        )}
      </Modal>
    </main>
  );
}

export default MapaSalas;
