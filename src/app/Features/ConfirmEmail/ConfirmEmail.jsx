import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../service/api.js";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("validando");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!token) {
      setStatus("invalido");
      return;
    }

    api
      .get(`/api/auth/register/confirmar/${token}`)
      .then(() => setStatus("sucesso"))
      .catch(() => setStatus("erro"));
  }, [token]);

  const renderMensagem = () => {
    switch (status) {
      case "validando":
        return <p>Validando seu token...</p>;
      case "sucesso":
        return (
          <p style={{ color: "green" }}>✅ E-mail confirmado com sucesso!</p>
        );
      case "erro":
        return <p style={{ color: "red" }}>❌ Token inválido ou expirado.</p>;
      case "invalido":
        return (
          <p style={{ color: "orange" }}>⚠️ Nenhum token fornecido na URL.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Confirmação de E-mail</h2>
      {renderMensagem()}
    </div>
  );
};

const containerStyle = {
  maxWidth: "500px",
  margin: "50px auto",
  padding: "20px",
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

export default ConfirmEmail;
