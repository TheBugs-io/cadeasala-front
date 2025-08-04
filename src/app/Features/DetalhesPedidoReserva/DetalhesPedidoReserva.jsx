import "./styles/DetalhesPedidoReserva.css";
import skatistaAlt from "../../assets/illustrations/altSkatista.svg";
import ConfirmActionModal from "../../components/ui/ModalConfirmAction";
import { useState } from "react";

export default function DetalhesPedidoReserva({
  solicitacao,
  handleStatusChange,
  onClose,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const image =
    skatistaAlt ||
    "https://raw.githubusercontent.com/TheBugs-io/cadeasala-front/612b99a4a0327208f6a664a43e23e661152df108/src/app/assets/illustrations/altSkatista.svg";

  const { id, status, tipo, dataPedido, usuario = {} } = solicitacao;
  const { nomeCompleto, email, tipo: tipoUsuario } = usuario;

  const onClickStatus = (novoStatus) => {
    setModalAction(novoStatus);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    handleStatusChange(id, modalAction);
    setModalOpen(false);
    onClose();
  };

  const handleCancel = () => {
    setModalOpen(false);
    setModalAction(null);
  };

  return (
    <>
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
                    <span className="status-icon spinner" aria-hidden="true"></span>
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
            onClick={() => onClickStatus("APROVADO")}
            aria-label="Aprovar o pedido de reserva"
          >
            Aprovar
          </button>
          <button
            className="btn-rejeitar"
            onClick={() => onClickStatus("REJEITADO")}
            aria-label="Rejeitar o pedido de reserva"
          >
            Rejeitar
          </button>
        </div>
      </section>

      {modalOpen && (
        <ConfirmActionModal
          open={modalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          action={modalAction}
          message={
            modalAction === "APROVADO"
              ? "Tem certeza que deseja aprovar este pedido?"
              : "Tem certeza que deseja rejeitar este pedido?"
          }
        />
      )}
    </>
  );
}