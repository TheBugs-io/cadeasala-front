import { useState } from "react";
import "../App.css";

const ForgotPasswordForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Solicitação de recuperação enviada!");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-title">Esqueci a Senha</div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          E-mail
        </label>
        <input
          className="form-input"
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="form-button">
        Enviar
      </button>
      <div className="form-link-group">
        <button type="button" onClick={onLogin} className="form-link">
          Voltar ao login
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
