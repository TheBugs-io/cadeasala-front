import { useState } from "react";
import "./styles/DetalhesPedidoReserva.css";
import skatistaAlt from "../../assets/illustrations/altSkatista.svg";
import { useAuth } from "../../contexts/AuthContext";
import { atualizarStatusSolicitacao } from "../../service/admin/reservasService";
import Snackbar from "../../Components/ui/Snackbar";

export default function DetalhesPedidoReserva({
  solicitacao,
  onAprovar,
  onRejeitar,
  onClose,
}) {
  const image = skatistaAlt || "https://raw.githubusercontent.com/TheBugs-io/cadeasala-front/612b99a4a0327208f6a664a43e23e661152df108/src/app/assets/illustrations/altSkatista.svg";
  const { id, status, tipo, dataPedido, usuario = {} } = solicitacao;
  const { nomeCompleto, email, tipo: tipoUsuario } = usuario;
  const { user } = useAuth();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleAprovar = async () => {
    try {
      await atualizarStatusSolicitacao(id, "APROVADO", user.token);
      setSnackbarSeverity("success");
      setSnackbarMessage("Solicitação aprovada com sucesso!");
      setSnackbarOpen(true);
      onAprovar();
      onClose();
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Erro ao aprovar solicitação!");
      setSnackbarOpen(true);
    }
  };

  const handleRejeitar = async () => {
    try {
      await atualizarStatusSolicitacao(id, "REJEITADO", user.token);
      setSnackbarSeverity("success");
      setSnackbarMessage("Solicitação rejeitada com sucesso!");
      setSnackbarOpen(true);
      onRejeitar();
      onClose();
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Erro ao rejeitar solicitação!");
      setSnackbarOpen(true);
    }
  };

  return (
    <section
      className="detalhes-pedido-reserva"
      aria-labelledby="titulo-detalhes"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <h2 id="titulo-detalhes" tabIndex={0}>
        Detalhes do pedido de reserva
      </h2>

      <img
        src={image}
        alt="Detalhes do pedido de reserva"
        aria-hidden="true"
        className="detalhes-imagem"
        tabIndex={-1}
      />

      <dl className="pedido-info">
        <div className="detalhes-pedido-autor">
          <div className="detalhe-item">
            <dt>
              <b>Solicitante:</b>
            </dt>
            <dd>{nomeCompleto || "Desconhecido"}</dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Email:</b>
            </dt>
            <dd>{email || "Desconhecido"}</dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Tipo de usuário:</b>
            </dt>
            <dd>{tipoUsuario || "Desconhecido"}</dd>
          </div>
        </div>
        <div className="detalhes-pedido">
          <div className="detalhe-item">
            <dt>
              <b>Estado da solicitação:</b>
            </dt>
            <dd className={`status-badge ${status.toLowerCase()}`}>
              {status === "AGUARDANDO" && (
                <>
                  <span
                    className="status-icon spinner"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Aguardando</span> Aguardando
                </>
              )}
              {status === "APROVADO" && (
                <>
                  <span className="status-icon check" aria-hidden="true"></span>
                  <span className="sr-only">Aprovado</span> Aprovado
                </>
              )}
              {status !== "AGUARDANDO" && status !== "APROVADO" && status}
            </dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Tipo de solicitação:</b>
            </dt>
            <dd>{tipo}</dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Data da reserva:</b>
            </dt>
            <dd>
              {new Date(solicitacao.dataInicio).toLocaleDateString()} às{" "}
              {new Date(solicitacao.dataFim).toLocaleDateString()}
            </dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Horário da reserva:</b>
            </dt>
            <dd>
              {solicitacao.horarioInicio}h às {solicitacao.horarioFim}h
            </dd>
          </div>
          <div className="detalhe-item">
            <dt>
              <b>Pedido feito em:</b>
            </dt>
            <dd>
              {new Date(dataPedido).toLocaleDateString()} às{" "}
              {new Date(dataPedido).toLocaleTimeString()}
            </dd>
          </div>
        </div>
      </dl>

      <div className="acoes-reserva">
        <button
          className="btn-aprovar"
          onClick={handleAprovar}
          aria-label="Aprovar o pedido de reserva"
        >
          Aprovar
        </button>
        <button
          className="btn-rejeitar"
          onClick={handleRejeitar}
          aria-label="Rejeitar o pedido de reserva"
        >
          Rejeitar
        </button>
      </div>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </section>
  );
}