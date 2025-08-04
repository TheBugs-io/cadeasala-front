import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { fetchSalas } from "../service/mapa/salasService";
import { ordenarPorNumeracaoSala } from "../helper/orderNumeracaoSala";

const HORARIOS_DISPONIVEIS = [
  { label: "08h-10h", inicio: 8, fim: 10 },
  { label: "10h-12h", inicio: 10, fim: 12 },
  { label: "14h-16h", inicio: 14, fim: 16 },
  { label: "16h-18h", inicio: 16, fim: 18 },
  { label: "20h-22h", inicio: 20, fim: 22 },
];

export function useMapaSalas() {
  const [state, setState] = useState({
    modalAberto: false,
    dadosSelecionados: null,
    andarSelecionado: "PRIMEIRO_ANDAR",
    salas: [],
    filtroStatus: "TODOS",
    carregando: true,
    isMobile: window.innerWidth < 768,
    filtrosAbertos: false,
    dataAtual: new Date(),
    horarioSelecionado: "",
  });

  const ultimaFocoRef = useRef(null);
  const location = useLocation();

  const updateState = (partial) =>
    setState((prev) => ({ ...prev, ...partial }));

  const { dataAtual, horarioSelecionado } = state;

  const buscarSalas = useCallback(async () => {
    try {
      updateState({ carregando: true, salas: [] });

      const horaAtual = new Date().getHours();
      const horarioPadrao =
        HORARIOS_DISPONIVEIS.find(
          ({ inicio, fim }) => horaAtual >= inicio && horaAtual < fim
        )?.label || HORARIOS_DISPONIVEIS[0].label;

      const horario = horarioSelecionado || horarioPadrao;
      const horaNum = parseInt(horario?.slice(0, 2)) || horaAtual;

      const ano = dataAtual.getFullYear();
      const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
      const dia = String(dataAtual.getDate()).padStart(2, "0");
      const dataFormatada = `${ano}-${mes}-${dia}`;

      const salas = await fetchSalas(dataFormatada, horaNum);

      const salasProcessadas = salas
        .map((sala) => ({
          ...sala,
          status: sala.status || "FUNCIONAL",
          ocupada: sala.reservas?.length > 0,
          statusExibicao: sala.reservas?.length ? "RESERVADA" : sala.status,
        }))
        .filter(Boolean);

      updateState({ salas: salasProcessadas });
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    } finally {
      updateState({ carregando: false });
    }
  }, [dataAtual, horarioSelecionado]);

  useEffect(() => {
    const handleResize = () => {
      updateState({ isMobile: window.innerWidth < 768 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    buscarSalas();
  }, [buscarSalas]);

  useEffect(() => {
    if (location.state?.sala) {
      const { sala } = location.state;
      updateState({
        andarSelecionado: sala.localizacao || "PRIMEIRO_ANDAR",
        dadosSelecionados: sala,
        modalAberto: true,
      });
    }
  }, [location.state]);

  const salasFiltradas = state.salas.filter((sala) => {
    if (!sala?.localizacao || !sala?.statusExibicao) return false;

    const filtroAndar = sala.localizacao === state.andarSelecionado;
    const filtroStatus =
      state.filtroStatus === "TODOS" ||
      (state.filtroStatus === "RESERVADA"
        ? sala.ocupada
        : sala.status === state.filtroStatus);

    return filtroAndar && filtroStatus;
  });

  const [salasE, salasD] = salasFiltradas
    .sort(ordenarPorNumeracaoSala)
    .reduce(
      ([e, d], sala) =>
        sala.numeracaoSala?.toUpperCase().endsWith("E")
          ? [[...e, sala], d]
          : [e, [...d, sala]],
      [[], []]
    );

  const handleAbrirModal = (sala, e) => {
    ultimaFocoRef.current = e.currentTarget;
    updateState({ dadosSelecionados: sala, modalAberto: true });
  };

  const handleFecharModal = () => {
    updateState({ modalAberto: false, dadosSelecionados: null });
    ultimaFocoRef.current?.focus();
  };

  const aplicarFiltros = (filtros) => {
    updateState({ filtroStatus: filtros.status, filtrosAbertos: false });
  };

  return {
    state,
    updateState,
    salasE,
    salasD,
    handleAbrirModal,
    handleFecharModal,
    aplicarFiltros,
  };
}
