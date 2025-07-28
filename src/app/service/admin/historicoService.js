import api from "../api";

async function pegarHistorico(){
  const response = await api.get("/historico")
  return response.data;
}

export default pegarHistorico;