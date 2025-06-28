import { useState } from "react";
import "../../styles/Login.css";
import { Link } from "react-router-dom";

const RegisterForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registro enviado!");
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="form-container"
        autoComplete="on"
      >
        <div className="form-title">Registro</div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-mail
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
        <div className="form-group">
          <label htmlFor="senha" className="form-label">
            Senha
          </label>
          <input
            autocomplete="new-password"
            className="form-input"
            type="password"
            id="senha"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Registrar
        </button>
        <div className="form-link-group">
          <Link to="/login" className="form-link">
            Já tenho conta
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
