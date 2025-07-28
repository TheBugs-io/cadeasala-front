import { useState } from "react";
import "../../styles/Login.css";
import { Link } from "react-router-dom";
import forgotPasswordImage from "../../assets/forgot/Forgot password-rafiki.svg";
import { forgotPassword } from "../../service/auth/authService";
import Snackbar from "../../Components/ui/Snackbar";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(email);
      setSnackbarMessage("E-mail de recuperação enviado!");
      setSnackbarSeverity("success");
      navigate("/login");
    } catch (error) {
      setSnackbarMessage("Erro ao enviar e-mail de recuperação.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
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
        <img src={forgotPasswordImage} className="image-forms-container" alt="Esqueceu a senha" />
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

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default ForgotPasswordForm;