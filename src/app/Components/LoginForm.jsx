import React, { useState } from "react";
import "../App.css";

const LoginForm = ({ onRegister, onForgot }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login enviado!");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-title">Login</div>
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
      <div className="form-group">
        <label htmlFor="senha" className="form-label">
          Senha
        </label>
        <input
          className="form-input"
          type="password"
          id="senha"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="form-button">
        Entrar
      </button>
      <div className="form-link-group">
        <button type="button" onClick={onRegister} className="form-link">
          Criar conta
        </button>
        <button type="button" onClick={onForgot} className="form-link">
          Esqueci a senha
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
