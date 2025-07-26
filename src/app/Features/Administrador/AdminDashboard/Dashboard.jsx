import { useEffect, useState } from "react";
import "./DashboardRegister.css";
import NoRegisterRequest from "./components/NoRegisterRequest";
import TrilhaNavegacao from "../../../Components/ui/TrilhaNavegacao";
import ModalConfirmAction from "../../../Components/ui/ModalConfirmAction";
import {
  atualizarStatusRegistro,
  buscarRegistrosPendentes,
} from "../../../service/admin/registerService";

const DashboardRegistro = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroSelecionado, setFiltroSelecionado] = useState("TODOS");
  const [modalAberto, setModalAberto] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState(null);
  const [novoStatus, setNovoStatus] = useState("");
  const opcoesFiltro = ["DISCENTE", "DOCENTE", "TODOS"];
  const opcoesStatus = ["PENDENTE", "APROVADO", "REPROVADO"];

  useEffect(() => {
    const carregarRegistrosPendentes = async () => {
      try {
        const response = await buscarRegistrosPendentes();
        if (Array.isArray(response)) {
          setRegistros(response);
        } else if (response?.data) {
          setRegistros(response.data);
        } else {
          throw new Error(response?.message || "Erro ao buscar registros.");
        }
      } catch (err) {
        setErro(`Erro ao carregar registros: ${err.message}`);
        setRegistros([]);
      } finally {
        setLoading(false);
      }
    };

    carregarRegistrosPendentes();
  }, []);

  const aplicarFiltro = () => {
    switch (filtroSelecionado) {
      case "DISCENTE":
        return registros.filter((r) => r.tipoUsuario === "DISCENTE");
      case "DOCENTE":
        return registros.filter((r) => r.tipoUsuario === "DOCENTE");
      default:
        return registros;
    }
  };

  const handleStatusChange = (registro, statusSelecionado) => {
    if (registro.status === statusSelecionado) return;
    setRegistroSelecionado(registro);
    setNovoStatus(statusSelecionado);
    setModalAberto(true);
  };

  const confirmarAlteracaoStatus = async () => {
    if (!registroSelecionado) return;

    try {
      const resposta = await atualizarStatusRegistro(
        registroSelecionado.id,
        novoStatus
      );

      if (!resposta || resposta.erro || !resposta.id) {
        throw new Error(resposta?.message || "Erro ao atualizar o status.");
      }

      setRegistros((prev) =>
        prev.map((r) =>
          r.id === registroSelecionado.id ? { ...r, status: novoStatus } : r
        )
      );
    } catch (err) {
      alert("Erro ao atualizar o status: " + err.message);
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
      <h1 tabIndex={0}>Relatório de cadastros</h1>

      <nav aria-label="Filtros de tipo de usuário" className="docs-filter-tabs">
        {opcoesFiltro.map((opcao) => (
          <button
            key={opcao}
            className={`filtro-botao ${
              filtroSelecionado === opcao ? "ativo" : ""
            }`}
            aria-pressed={filtroSelecionado === opcao}
            onClick={() => setFiltroSelecionado(opcao)}
          >
            {opcao}
          </button>
        ))}
      </nav>

      <hr />

      <div className="dashboard-table-register" role="region" aria-label="Tabela de registros">
        {loading ? (
          <div
            style={{ textAlign: "center", padding: "40px" }}
            aria-live="polite"
          >
            <p>Carregando registros...</p>
          </div>
        ) : erro ? (
          <div
            style={{ textAlign: "center", padding: "40px" }}
            aria-live="assertive"
          >
            <p style={{ color: "red" }}>{erro}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: "10px", padding: "8px 16px" }}
            >
              Tentar novamente
            </button>
          </div>
        ) : registrosFiltrados.length > 0 ? (
          <table aria-label="Tabela de registros de usuários">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome Completo</th>
                <th scope="col">Email</th>
                <th scope="col">Tipo de Usuário</th>
                <th scope="col">Status</th>
                <th scope="col">Pedido em</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.nomeCompleto}</td>
                  <td>
                    <a href={`mailto:${registro.email}`}>
                      {registro.email}
                    </a>
                  </td>
                  <td>{registro.tipoUsuario}</td>
                  <td className={`status ${registro.status.toLowerCase()}`}>
                    <label htmlFor={`status-${registro.id}`} className="sr-only">
                      Alterar status para {registro.nomeCompleto}
                    </label>
                    <select
                      id={`status-${registro.id}`}
                      value={registro.status}
                      onChange={(e) =>
                        handleStatusChange(registro, e.target.value)
                      }
                      className="status-select"
                      aria-label={`Status atual: ${registro.status}`}
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
              ))}
            </tbody>
          </table>
        ) : (
          <NoRegisterRequest filtroSelecionado={filtroSelecionado} />
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