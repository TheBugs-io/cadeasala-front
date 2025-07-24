import api from "../api";

export async function buscarRegistrosPendentes(token) {
  const response = await api.get('/api/auth/register/pendentes', { token });
  return response.data;
}

export async function atualizarStatusRegistro(id, status) {
  const response = await api.patch(`/api/auth/register/${id}`, { status });
  return response.data;
}