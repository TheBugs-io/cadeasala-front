import { useState, useEffect } from "react";
import "../../styles/LoginPage.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import publicLogotipo from "/visual-identify/logotipo.svg"
import { resetPassword } from "../../service/auth/authService";
import Snackbar from "../../Components/ui/Snackbar";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (!token) {
      setSnackbarMessage("Token de redefinição não encontrado.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/esqueci-minha-senha"), 3000);
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarNovaSenha) {
      setSnackbarMessage("As senhas não coincidem.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, novaSenha);
      setSnackbarMessage("Senha redefinida com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setSnackbarMessage(error.response?.data?.error || "Erro ao redefinir senha.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container" autoComplete="off">
        <img src={publicLogotipo} className="image-forms-container" alt="Redefinir senha" />
        <div className="form-title">Redefinir sua senha</div>
        <p className="form-paragraph">
          Por favor, informe sua nova senha abaixo para redefinir sua conta.
        </p>

        <div className="form-group">
          <label htmlFor="novaSenha" className="form-label">
            Nova senha <span>*</span>
          </label>
          <input
            type="password"
            id="novaSenha"
            className="form-input"
            placeholder="Digite sua nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmarNovaSenha" className="form-label">
            Confirmar nova senha <span>*</span>
          </label>
          <input
            type="password"
            id="confirmarNovaSenha"
            className="form-input"
            placeholder="Confirme sua nova senha"
            value={confirmarNovaSenha}
            onChange={(e) => setConfirmarNovaSenha(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={loading} className="form-button">
          {loading ? "Redefinindo..." : "Redefinir senha"}
        </button>

        <div className="form-link-group">
          <Link to="/login" className="form-link">
            Voltar ao login
          </Link>
        </div>
      </form>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default ResetPasswordForm;