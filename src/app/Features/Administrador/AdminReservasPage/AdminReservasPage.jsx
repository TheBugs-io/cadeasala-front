import { useNavigate } from "react-router-dom";
import "./styles/AdminReservasPage.css";
import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";
import GenericCard from "./components/CardGeneric";
import { examples, reservas } from "../../../../models/ExemploPedido";

const AdminReservasPage = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

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
          {examples.map((example, index) => (
            <GenericCard
              key={index}
              title={example.title}
              subtitle={example.subtitle}
              dateRange={example.dateRange}
              topLeftLabel={example.topLeftLabel}
              topRightLabel={example.topRightLabel}
              bottomLabel={example.bottomLabel}
              bottomLabelColor={example.bottomLabelColor}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h1>Reservas</h1>
          <a
            onClick={() => handleRedirect("/admin/reservas")}
            className="reservas-link"
            aria-label="Ir para página de reservas"
            type="button"
          >
            Ver todas as reservas
          </a>
        </div>
        <hr />
        <div className="card-reservas-container">
          {reservas.map((reserva, index) => (
            <GenericCard
              key={index}
              title={reserva.title}
              subtitle={reserva.subtitle}
              dateRange={reserva.dateRange}
              topLeftLabel={reserva.topLeftLabel}
              topRightLabel={reserva.topRightLabel}
              bottomLabel={reserva.bottomLabel}
              bottomLabelColor={reserva.bottomLabelColor}
            />
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default AdminReservasPage;