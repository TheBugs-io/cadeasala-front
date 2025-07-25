import { useNavigate } from "react-router-dom";
import "./styles/AdminReservasPage.css";
import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";
import GenericCard from "./components/CardGeneric";
import { useEffect, useState } from "react";
import { fetchSolicitacoesReservas, fetchReservas } from "../../../service/admin/reservasService";

const MAX_CARDS = 3;

const AdminReservasPage = () => {
  const [examples, setExamples] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loadingSolicitacoes, setLoadingSolicitacoes] = useState(true);
  const [loadingReservas, setLoadingReservas] = useState(true);

  const navigate = useNavigate();

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
      const response = await fetchReservas();
      if (response.status === "success") {
        setReservas(response.data);
      } else {
        console.error("Erro ao buscar reservas:", response.message);
        setReservas([]);
      }
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
          <a
            onClick={() => handleRedirect("pedidos-reserva")}
            className="reservas-link"
            aria-label="Ir para página de pedidos de reserva"
            type="button"
          >
            Ver todos os pedidos
          </a>
        </div>
        <hr />
        <div className="card-pedidos-container">
          {loadingSolicitacoes ? (
            <p>Carregando pedidos...</p>
          ) : examples.length === 0 ? (
            <p>Nenhum pedido disponível no momento.</p>
          ) : (
            [...examples]
              .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
              .slice(0, MAX_CARDS)
              .map((solicitacao, index) => (
                <GenericCard
                  key={index}
                  data={solicitacao}
                  type="solicitacao"
                />
              ))
          )}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h1>Reservas</h1>
          <a
            onClick={() => handleRedirect("reservas")}
            className="reservas-link"
            aria-label="Ir para página de reservas"
            type="button"
          >
            Ver todas as reservas
          </a>
        </div>
        <hr />
        <div className="card-reservas-container">
          {loadingReservas ? (
            <p>Carregando reservas...</p>
          ) : reservas.length === 0 ? (
            <p>Nenhuma reserva vigente no momento.</p>
          ) : (
            [...reservas]
              .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
              .slice(0, MAX_CARDS)
              .map((reserva, index) => (
                <GenericCard key={index} data={reserva} type="reserva" />
              ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminReservasPage;