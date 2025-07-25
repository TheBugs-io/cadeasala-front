import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmEmail } from "../../service/auth/authService";
import "./ConfirmEmail.css";
import { RiMailForbidFill } from "react-icons/ri";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("validando");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("invalido");
      return;
    }

    confirmEmail(token)
      .then(() => setStatus("sucesso"))
      .catch(() => setStatus("erro"));
  }, [token]);

  const renderMensagem = () => {
    switch (status) {
      case "validando":
        return (
          <div
            className="loader-container"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="loader" aria-hidden="true"></div>
            <p>Validando seu token...</p>
          </div>
        );

      case "sucesso":
        return (
          <section className="mensagem-container" role="alert" aria-live="polite">
            <p className="mensagem sucesso">
              Seu email foi confirmado com sucesso. Por favor, aguarde um
              secretário aprovar sua solicitação de registro na plataforma e
              verifique na caixa de entrada ou spam do email.
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate("/mapa-salas")}
              aria-label="Voltar para o mapa de salas"
            >
              Voltar para o mapa
            </button>
          </section>
        );

      case "erro":
        return (
          <section className="mensagem-container" role="alert" aria-live="assertive">
            <div className="mensagem erro">
              <RiMailForbidFill size={45} aria-hidden="true" />
              <p>Token inválido ou expirado.</p>
            </div>
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
              aria-label="Solicitar novo token"
            >
              Pedir novo token
            </button>
          </section>
        );

      case "invalido":
        return (
          <section role="alert" aria-live="assertive">
            <p className="mensagem invalido">⚠️ Nenhum token fornecido na URL.</p>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <main className="confirm-email-container" aria-labelledby="confirmEmailTitle">
      <h1 id="confirmEmailTitle">Confirmação de E-mail</h1>
      {renderMensagem()}
    </main>
  );
};

export default ConfirmEmail;