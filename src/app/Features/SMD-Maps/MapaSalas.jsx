import { useEffect, useState } from "react";
import Card from "./Components/CardSalaMapa";
import HallwayMap from "./Components/Hallway";
import "./styles/MapaStyle.css";
import FloorSelector from "./Components/AndarSelector";
import Modal from "../../Components/Modal";
import RoomDetails from "../DescSala/DescSala";
import { fetchSalas } from "../../service/mapa/salasService";
import { ordenarPorNumeracaoSala } from "./helper/orderNumeracaoSala";

function MapaSalas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [andarSelecionado, setAndarSelecionado] = useState("PRIMEIRO_ANDAR");
  const [salas, setSalas] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("TODOS");

  const salasFiltradas = salas.filter((sala) => {
    const correspondeAoAndar = sala.localizacao === andarSelecionado;
    const correspondeAoStatus =
      filtroStatus === "TODOS" || sala.status === filtroStatus;

    return correspondeAoAndar && correspondeAoStatus;
  });

  useEffect(() => {
    const buscarSalas = async () => {
      try {
        const resposta = await fetchSalas();
        setSalas(Array.isArray(resposta) ? resposta : resposta.salas || []);
      } catch (erro) {
        console.error("Erro ao buscar salas:", erro);
      }
    };

    buscarSalas();
  }, []);

  const handleAbrirModal = (sala) => {
    setDadosSelecionados(sala);
    setModalAberto(true);
  };

  const salasFiltradasOrdenadas = [...salasFiltradas].sort(
    ordenarPorNumeracaoSala
  );

  const salasE = salasFiltradasOrdenadas.filter((sala) =>
    sala.numeracaoSala.endsWith("E")
  );
  const salasD = salasFiltradasOrdenadas.filter((sala) =>
    sala.numeracaoSala.endsWith("D")
  );

  return (
    <div className="mapa-salas-container">
      <FloorSelector value={andarSelecionado} onChange={setAndarSelecionado} />

      <div className="map-container">
        <div className="row">
          {salasE.map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.nome}
              dados={sala}
              aoClicar={() => handleAbrirModal(sala)}
            />
          ))}
        </div>

        <HallwayMap />

        <div className="row">
          {salasD.map((sala) => (
            <Card
              key={sala.id}
              status={sala.status}
              sala={sala.nome}
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