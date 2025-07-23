import TrilhaNavegacao from "../../../Components/TrilhaNavegacao";
import CardSalaLayout from "./components/CardSalaLayout";
import "./styles/DashboardSalasStyle.css"

const DashboardSalas = () => {
  return (
    <main className="controle-salas" role="main">
      <TrilhaNavegacao
        paths={[
          { label: "Página inicial", to: "/admin" },
          { label: "Salas" },
        ]}
        aria-label="Navegação"
      />

      <div className="container">
        <h1 tabIndex={0}>Salas do bloco IUVI</h1>
        <hr aria-hidden="true" />

        <section
          className="salas-list"
          aria-labelledby="lista-de-salas"
        >
          <h2 id="lista-de-salas" className="visually-hidden">
            Lista de salas
          </h2>

          <CardSalaLayout salas={['Sala 01', 'Sala 02', 'Sala 03']} />

        </section>
      </div>
    </main>
  );
};

export default DashboardSalas;
