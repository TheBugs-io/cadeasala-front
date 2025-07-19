import React from "react";
import "./styles/AdminReservasPage.css";
import TrilhaNavegacao from "../../Components/TrilhaNavegacao";
import GenericCard from "./components/CardGeneric";
import { examples } from "../../../models/ExemploPedido";

const AdminReservasPage = () => {
  return (
    <div className="admin-reservas-page">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Controle de reservas" },
        ]}
      />

      <section>
        <h1>Pedidos recentes</h1>
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
        <h1>Reservas aprovadas</h1>
        <hr />
        <p>Esta página está em desenvolvimento.</p>
      </section>

    </div>
  );
};

export default AdminReservasPage;
