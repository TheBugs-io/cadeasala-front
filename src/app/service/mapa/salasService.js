import api from "../api";

export const getSalaPorId = async (id) => {
  try {
    const response = await api.get(`/salas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar sala:", error);
    throw error;
  }
};

export const fetchSalas = async (dataHora, hora) => {
  try {
    const horaInt = typeof hora === "number" ? hora : parseInt(hora);
    const response = await api.get("/salas/mapa", {
      params: {
        data: dataHora,
        hora: horaInt,
      },
    });

    const dados = Array.isArray(response.data) ? response.data : [];
    console.log(`Total de salas recebidas: ${dados.length}`);
    return dados;
  } catch (error) {
    console.error("Erro ao buscar salas:", error);
    throw error;
  }
};

export const verificarDisponibilidade = async (
  salaId,
  dataInicio,
  dataFim,
  horarioInicio,
  horarioFim,
  repete = false,
  repeteEm = []
) => {
  try {
    const response = await api.post("/salas/verificar-disponibilidade", {
      salaId,
      dataInicio,
      dataFim,
      horarioInicio,
      horarioFim,
      repete,
      repeteEm
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao verificar disponibilidade:", error);
    throw error;
  }
};

export const solicitacaoReserva = async (localId, formData) => {
  try {
    const payload = {
      localId,
      tipo: formData.reservationType,
      dataInicio: formData.startDate,
      dataFim: formData.endDate,
      horarioInicio: formData.startTime,
      horarioFim: formData.endTime,
      repete: formData.repeat,
      repeteEm: formData.repeatDays,
      usuarioId: formData.usuarioId,
    };

    const response = await api.post(`/reservas/solicitar-reserva`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao solicitar reserva:", error);
    throw error;
  }
};