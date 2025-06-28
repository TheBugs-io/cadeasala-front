import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner1 from "../../../assets/banner/banner1.png";
import "../../../styles/Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login enviado!");
    // TODO: Implementar lógica de autenticação com API
    // Após autenticação bem-sucedida:
    //TODO: Alterar para tela inicial -> A definir (mapa ou outra tela.)
    // navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <img src={banner1} alt="Banner de login" />
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

        <div className="divider"></div>

        <div className="form-link-group">
          <Link to="/register" className="form-link">
            Criar conta
          </Link>
          <Link to="/forgot-password" className="form-link">
            Esqueci a senha
          </Link>
        </div>
      </form>
      <img src={banner1} alt="Banner de login" />
    </div>
  );
};

export default LoginForm;