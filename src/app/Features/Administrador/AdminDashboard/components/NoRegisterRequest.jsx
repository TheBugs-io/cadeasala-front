import doneJob from "../../../../assets/illustrations/doneJob.svg";

const NoRegisterRequest = ({ filtroSelecionado }) => {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <img
        src={doneJob}
        alt="Sem registros pendentes"
        style={{ width: "200px", marginBottom: "20px" }}
      />
      <h3 style={{ color: "#666", marginBottom: "10px" }}>
        Sem registros pendentes
      </h3>
      <p style={{ color: "#999" }}>
        {filtroSelecionado === "TODOS"
          ? "Não há solicitações de cadastro pendentes no momento."
          : `Não há solicitações de cadastro pendentes para ${filtroSelecionado.toLowerCase()}s.`}
      </p>
    </div>
  );
};

export default NoRegisterRequest;