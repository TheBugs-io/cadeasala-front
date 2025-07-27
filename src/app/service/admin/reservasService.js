import api from "../api";

export const fetchReservas = async (token) => {
  try {
    const response = await api.get("/reservas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.reservas || [];
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    return [];
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

export const atualizarStatusSolicitacao = async (solicitacaoId, status, token) => {
  try {
    const response = await api.patch(`/reservas/${solicitacaoId}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  catch (error) {
    console.error("Erro ao atualizar status da solicitação:", error);
    throw error;
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
