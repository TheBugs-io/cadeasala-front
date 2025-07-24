import "./styles/AccountPageStyle.css";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const AccountPage = () => {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  const alternarNotificacoes = () => {
    setNotificacoesAtivas((prev) => !prev);
  };

  const { user } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState(
    "https://raw.githubusercontent.com/TheBugs-io/cadeasala-front/40e7f24aa5d021222994672877393f5a31511581/src/app/assets/placeholder/iconAvatar.svg"
  );

  return (
    <div className="account-page">
      <section className="account-header">
        <div className="account-user-info">
          <img
            src={avatarSrc}
            alt="Avatar do usuário"
            className="account-avatar"
            onError={() => setAvatarSrc("/assets/placeholder/iconAvatar.svg")}
          />
          <hr />
          <div className="account-header-info">
            <h1>Sua conta</h1>
            <h3>{user.nome}</h3>
            <p>{user.tipo}</p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="account-actions">
          <button
            className={`btn-notifications ${
              notificacoesAtivas ? "ativo" : "inativo"
            }`}
            onClick={alternarNotificacoes}
          >
            {notificacoesAtivas
              ? "Notificações ativadas"
              : "Notificações desativadas"}
          </button>

          <button className="btn-change-password">Alterar senha</button>
        </div>
      </section>

      <section className="account-content">
        <section className="account-favorites">
          <h2>Salas favoritas</h2>
          <hr />
          <div className="favorites-list">
            <p>Lista de salas favoritas vazia.</p>
          </div>
        </section>
        <section className="account-reservations-history">
          <h2>Meu histórico de reservas</h2>
          <hr />
          <div className="reservations-history-list">
            <p>Lista de reservas vazia.</p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default AccountPage;
