import { useNavigate } from "react-router-dom";
import "./styles/AdminReservasPage.css";
import TrilhaNavegacao from "../../../Components/ui/TrilhaNavegacao";
import GenericCard from "./components/CardGeneric";
import { useEffect, useState } from "react";
import Modal from "../../../Components/ui/Modal";
import DetalhesPedidoReserva from "../../DetalhesPedidoReserva/DetalhesPedidoReserva";
import DetalhesReserva from "../../DetalhesReserva/DetalhesReserva";
import Snackbar from "../../../Components/ui/Snackbar";
import {
  fetchSolicitacoesReservas,
  fetchReservas,
  atualizarStatusSolicitacao,
} from "../../../service/admin/reservasService";
import { useAuth } from "../../../contexts/AuthContext";

const MAX_CARDS = 3;

const AdminReservasPage = () => {
  const [examples, setExamples] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loadingSolicitacoes, setLoadingSolicitacoes] = useState(true);
  const [loadingReservas, setLoadingReservas] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [itemTipo, setItemTipo] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { user } = useAuth();
  const navigate = useNavigate();

  const abrirModal = (item, tipo) => {
    setItemSelecionado(item);
    setItemTipo(tipo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemSelecionado(null);
    setItemTipo(null);
  };

  const fetchSolicitacoes = async () => {
    try {
      setLoadingSolicitacoes(true);
      const response = await fetchSolicitacoesReservas();
      if (response.status === "success") {
        setExamples(response.data);
      } else {
        console.error("Erro ao buscar solicitações:", response.message);
        setExamples([]);
      }
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
      setExamples([]);
    } finally {
      setLoadingSolicitacoes(false);
    }
  };

  const fetchAllReservas = async () => {
    try {
      setLoadingReservas(true);
      const reservasData = await fetchReservas();
      setReservas(reservasData);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      setReservas([]);
    } finally {
      setLoadingReservas(false);
    }
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleAtualizarStatus = async (id, novoStatus) => {
    try {
      await atualizarStatusSolicitacao(id, novoStatus, user.token);
      setSnackbarSeverity("success");
      setSnackbarMessage(
        `Solicitação ${novoStatus.toLowerCase()} com sucesso!`
      );
      setSnackbarOpen(true);
      fecharModal();
      await fetchSolicitacoes();
      await fetchAllReservas();
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Erro ao atualizar solicitação!");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
    fetchAllReservas();
  }, []);

  return (
    <div className="admin-reservas-page">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Controle de reservas" },
        ]}
      />

      <section>
        <div className="section-header">
          <h1>Pedidos recentes</h1>
          <button
            onClick={() => handleRedirect("pedidos-reserva")}
            className="reservas-link"
            aria-label="Ir para página de pedidos de reserva"
            type="button"
          >
            Ver todos os pedidos
          </button>
        </div>
        <hr />
        <div className="card-pedidos-container">
          {loadingSolicitacoes ? (
            <p>Carregando pedidos...</p>
          ) : examples.length === 0 ? (
            <p>Nenhum pedido disponível no momento.</p>
          ) : (
            [...examples]
              .sort((a, b) => new Date(b.dataPedido) - new Date(a.dataPedido))
              .slice(0, MAX_CARDS)
              .map((solicitacao, index) => (
                <GenericCard
                  key={index}
                  data={solicitacao}
                  type="solicitacao"
                  onClick={() => abrirModal(solicitacao, "solicitacao")}
                />
              ))
          )}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h1>Reservas</h1>
          <button
            onClick={() => handleRedirect("reservas")}
            className="reservas-link"
            aria-label="Ir para página de reservas"
            type="button"
          >
            Ver todas as reservas
          </button>
        </div>
        <hr />
        <div className="card-reservas-container">
          {loadingReservas ? (
            <p>Carregando reservas...</p>
          ) : reservas.length === 0 ? (
            <p>Nenhuma reserva vigente no momento.</p>
          ) : (
            [...reservas]
              .sort((a, b) => new Date(b.dataPedido) - new Date(a.dataPedido))
              .slice(0, MAX_CARDS)
              .map((reserva, index) => (
                <GenericCard
                  key={index}
                  data={reserva}
                  type="reserva"
                  onClick={() => abrirModal(reserva, "reserva")}
                />
              ))
          )}
        </div>
      </section>

      <Modal isOpen={modalAberto} onClose={fecharModal}>
        {itemTipo === "solicitacao" && itemSelecionado && (
          <DetalhesPedidoReserva
            solicitacao={itemSelecionado}
            handleStatusChange={handleAtualizarStatus}
            onClose={fecharModal}
          />
        )}
        {itemTipo === "reserva" && itemSelecionado && (
          <DetalhesReserva
            reserva={itemSelecionado}
            onClose={fecharModal}
            onAtualizarReservas={fetchAllReservas}
          />
        )}
      </Modal>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default AdminReservasPage;
