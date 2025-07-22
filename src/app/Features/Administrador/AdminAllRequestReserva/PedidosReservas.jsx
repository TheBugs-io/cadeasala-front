import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";

const PagePedidosReserva = () => {
  return (
    <div>
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Controle de reservas", to: "/admin/dashboard-reservas" },
          { label: "Pedidos de reserva" },
        ]}
      />
    </div>
  );
};

export default PagePedidosReserva;