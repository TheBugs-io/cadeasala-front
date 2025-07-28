import { useEffect, useState } from "react";
import "./DashboardHistorico.css";
import TrilhaNavegacao from "../../../Components/ui/TrilhaNavegacao";
import pegarHistorico from "../../../service/admin/historicoService";


const DashboardHistorico = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
  async function carregarHistorico() {
    try {

      const dados = await pegarHistorico();
      console.log(dados);
      setHistorico(dados);
      setLoading(false);
    } catch (erro) {
      console.error("Erro ao carregar histórico:", erro);
    }
  }

  carregarHistorico();
}, []);

  return (
    <div className="dashboard-historico-container">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Histórico de ações" },
        ]}
      />
      <h1 tabIndex={0}>Histórico de ações</h1>

      <div className="dashboard-table-historico" role="region" aria-label="Tabela de histórico de ações">
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }} aria-live="polite">
            <p>Carregando histórico...</p>
          </div>
        ) : erro ? (
          <div style={{ textAlign: "center", padding: "40px" }} aria-live="assertive">
            <p style={{ color: "red" }}>{erro}</p>
          </div>
        ) : historico.length > 0 ? (
          <table aria-label="Tabela de histórico">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ação</th>
                <th>Tipo de Operação</th>
                <th>Entidade</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.acao}</td>
                  <td>{item.tipoCRUD}</td>
                  <td>{item.tipoEntidade}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center" }}>Nenhuma ação registrada.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHistorico;
