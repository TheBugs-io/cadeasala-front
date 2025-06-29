import { useState } from "react";
import "../../styles/Login.css";
import { Link } from "react-router-dom";
import forgotPassword from "../../assets/forgot/Forgot password-rafiki.svg";

const ForgotPasswordForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Solicitação de recuperação enviada!");
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="form-container"
        autoComplete="on"
      >
        <img src={forgotPassword} className="image-forms-container"></img>
        <div className="form-title">Esqueceu sua senha?</div>
        <p className="form-paragraph">
          <b>Não se preocupe!</b> Enviaremos um e-mail para redefinir sua senha
          na plataforma.
        </p>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-mail <span>*</span>
          </label>
          <input
            autoComplete="email"
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
          <Link to="/login" className="form-link">
            Voltar ao login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
