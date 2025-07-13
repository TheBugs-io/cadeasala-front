import { useEffect, useState } from "react";
import api from "../../service/api";
import "./DashboardRegister.css";
import doneJob from "../../assets/illustrations/doneJob.svg";
import TrilhaNavegacao from "../../Components/TrilhaNavegacao";
import ModalConfirmAction from "../../Components/ModalConfirmAction";

const DashboardRegistro = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroSelecionado, setFiltroSelecionado] = useState("TODOS");
  const [modalAberto, setModalAberto] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState(null);
  const [novoStatus, setNovoStatus] = useState("");
  const opcoesFiltro = ["DISCENTE", "DOCENTE", "TODOS"];
  const opcoesStatus = ["PENDENTE", "APROVADO", "REPROVADO"]; // Exemplo de status

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

  const handleStatusChange = (registro, statusSelecionado) => {
    setRegistroSelecionado(registro);
    setNovoStatus(statusSelecionado);
    setModalAberto(true);
  };

  const confirmarAlteracaoStatus = async () => {
    if (!registroSelecionado) return;
    try {
      //Chama a API aqui com o endpoint de atualizar os status, que inclusive, deve ser alterado depois, porque o ID é passado no endpont e no json
      await api.patch(`/api/auth/register/${registroSelecionado.id}`, {
        id: registroSelecionado.id,
        status: novoStatus,
      });

      //Vai limpar ao atualizar a solicitação de registro (aprovado ou rejeitado, independente, vão sair da tabela e um email é enviado pro usuário.)
      setRegistros((prev) =>
        prev.filter((r) => r.id !== registroSelecionado.id)
      );
    } catch (err) {
      alert("Erro ao atualizar o status.");
    } finally {
      setModalAberto(false);
      setRegistroSelecionado(null);
      setNovoStatus("");
    }
  };

  const registrosFiltrados = aplicarFiltro();

  return (
    <div className="dashboard-register-container">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Relatório de cadastros" },
        ]}
      />
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
              {registrosFiltrados.length > 0 ? (
                registrosFiltrados.map((registro) => (
                  <tr key={registro.id}>
                    <td>{registro.id}</td>
                    <td>{registro.nomeCompleto}</td>
                    <td>{registro.email}</td>
                    <td>{registro.tipoUsuario}</td>
                    <td className={`status ${registro.status.toLowerCase()}`}>
                      <select
                        value={registro.status}
                        onChange={(e) =>
                          handleStatusChange(registro, e.target.value)
                        }
                        className="status-select"
                      >
                        {opcoesStatus.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>{new Date(registro.criadoEm).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    <img
                      src={doneJob}
                      alt="Tudo concluído para este filtro. Nenhum registro pendente"
                      style={{ width: "200px", marginTop: "20px" }}
                    />
                    <p>Nenhum registro pendente.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ModalConfirmAction
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirm={confirmarAlteracaoStatus}
        mensagem={
          <>
            Tem certeza que deseja alterar o status para{" "}
            <strong>"{novoStatus}"</strong>?
          </>
        }
      />
    </div>
  );
};

export default DashboardRegistro;
