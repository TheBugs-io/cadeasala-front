import { useEffect, useState } from "react";
import api from "../../service/api";
import "./DashboardRegister.css";

const DashboardRegistro = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroSelecionado, setFiltroSelecionado] = useState("TODOS");
  const opcoesFiltro = ["DISCENTE", "DOCENTE", "TODOS"];

  useEffect(() => {
    const buscarRegistrosPendentes = async () => {
      try {
        const response = await api.get("/api/auth/register/pendentes");
        setRegistros(response.data);
      } catch (err) {
        setErro("Erro ao carregar registros.");
      } finally {
        setLoading(false);
      }
    };

    buscarRegistrosPendentes();
  }, []);

  const aplicarFiltro = () => {
    switch (filtroSelecionado) {
      case "DISCENTE":
        return registros.filter((r) => r.tipoUsuario === "DISCENTE");
      case "DOCENTE":
        return registros.filter((r) => r.tipoUsuario === "DOCENTE");
      case "TODOS":
      default:
        return registros;
    }
  };
  const registrosFiltrados = aplicarFiltro();

  return (
    <div className="dashboard-register-container">
      <h1>Relatório de cadastros</h1>
      <div className="docs-filter-tabs">
        {opcoesFiltro.map((opcao) => (
          <button
            key={opcao}
            className={`filtro-botao ${
              filtroSelecionado === opcao ? "ativo" : ""
            }`}
            onClick={() => setFiltroSelecionado(opcao)}
          >
            {opcao}
          </button>
        ))}
      </div>
      <div className="dashboard-table-register">
        {loading ? (
          <p>Carregando...</p>
        ) : erro ? (
          <p>{erro}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome Completo</th>
                <th>Email</th>
                <th>Tipo de Usuário</th>
                <th>Status</th>
                <th>Pedido em</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.nomeCompleto}</td>
                  <td>{registro.email}</td>
                  <td>{registro.tipoUsuario}</td>
                  <td className={`status ${registro.status.toLowerCase()}`}>
                    {registro.status}
                  </td>
                  <td>{new Date(registro.criadoEm).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardRegistro;
