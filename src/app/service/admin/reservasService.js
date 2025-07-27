import api from "../api";

export const fetchReservas = async () => {
  try {
    const response = await api.get("/reservas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    throw error;
  }
};

export const fetchSolicitacoesReservas = async (token) => {
  try {
    const response = await api.get("/reservas/solicitacoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: "success",
      data: response.data.solicitacoes,
    };
  } catch (error) {
    console.error("Erro ao buscar solicitações de reservas:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

//TODO: Criar uma reserva definindo um responsável
export const createReserva = async (reservaData, token) => {
  try {
    const response = await api.post(`/reservas/solicitar-reserva`, reservaData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    throw error;
  }
};

//TODO: Deletar reserva
export const deleteReserva = async (reservaId, token) => {
  try {
    const response = await api.delete(`/reservas/${reservaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
    throw error;
  }
};
