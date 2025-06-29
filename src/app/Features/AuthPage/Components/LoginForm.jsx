import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import banner1 from "../../../assets/banner/banner1.png";
import loginImage from "../../../assets/login/Login-rafiki.svg";
import "../../../styles/Login.css";
import { login } from "../../../service/auth/authService.js";

const LoginForm = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.registeredEmail || "");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }
    if (loading) return;

    setLoading(true);

    try {
      const emailFormatado = email.trim().toLowerCase();
      const usuario = await login(emailFormatado, senha);

      localStorage.setItem("token", usuario.token);

      if (usuario.tipo === "SECRETARIO") {
        navigate("/admin/dashboard");
      } else if (usuario.tipo === "DISCENTE" || usuario.tipo === "DOCENTE") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert(error.response?.data?.erro || "Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src={banner1} alt="Banner de login" />
      <form
        onSubmit={handleSubmit}
        className="form-container"
        autoComplete="on"
      >
        <img src={loginImage} className="image-forms-container" alt="Login" />
        <div className="form-title">Login</div>
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
            autoComplete="current-password"
            className="form-input"
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button className="login-button" disabled={loading}>
          {loading ? "CARREGANDO..." : "ENTRAR"}
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
