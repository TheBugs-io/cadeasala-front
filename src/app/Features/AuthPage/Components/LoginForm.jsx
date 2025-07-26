import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginImage from "../../../assets/login/Login-rafiki.svg";
import "../../../styles/Login.css";
import { useAuth } from "../../../contexts/AuthContext";
import { login } from "../../../service/auth/authService.js";
import Snackbar from "../../../Components/ui/Snackbar.jsx";

const LoginForm = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.registeredEmail || "");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (location.state?.showConfirmEmailSnackbar) {
      setSnackbar({
        open: true,
        message:
          "Um email para confirmação foi enviado para sua conta. Por favor, para concluir seu cadastro, confirme seu email.",
        severity: "success",
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const closeSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      showSnackbar("Preencha todos os campos!", "error");
      return;
    }
    if (loading) return;

    setLoading(true);

    try {
      const emailFormatado = email.trim().toLowerCase();
      const usuario = await login(emailFormatado, senha);

      authLogin(usuario, usuario.token);

      if (usuario.tipo === "SECRETARIO") {
        navigate("/admin");
      } else if (usuario.tipo === "DISCENTE" || usuario.tipo === "DOCENTE") {
        navigate("/user");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      showSnackbar(
        error.response?.data?.message ||
          "Oppss...! Email ou senha estão incorretos. Tente novamente.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="form-container"
        autoComplete="on"
      >
        {/* TODO: Alterar a imagem do login */}
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
        <button className="form-button" disabled={loading}>
          {loading ? "CARREGANDO..." : "Entrar"}
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
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default LoginForm;