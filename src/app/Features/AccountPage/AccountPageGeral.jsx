import "./styles/AccountPageStyle.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { listarSalasFavoritas } from "../../service/mapa/favoriteService";
import CardFavoritos from "./components/CardFavoritos";
import { listarHistoricoReservas} from "../../service/user/accountService"
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const navigate = useNavigate();
  const alternarNotificacoes = () => {
    setNotificacoesAtivas((prev) => !prev);
  };

  const { user, logout } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState(
    "https://raw.githubusercontent.com/TheBugs-io/cadeasala-front/40e7f24aa5d021222994672877393f5a31511581/src/app/assets/placeholder/iconAvatar.svg"
  );

  const [salasFavoritas, setSalasFavoritas] = useState([]);
  const [historicoReservas, setHistoricoReservas] = useState([]);
  const [reservasAgendadas, setReservasAgendadas] = useState([]);

  const redirectDetalhesSala = (sala) => {
    navigate(`/mapa-salas`, { state: { sala } });
  };

  useEffect(() => {
    const fetchSalasFavoritas = async () => {
      try {
        const data = await listarSalasFavoritas();
        setSalasFavoritas(data || []);
      } catch (error) {
        console.error("Erro ao buscar salas favoritas:", error);
        setSalasFavoritas([]);
      }
    };
    fetchSalasFavoritas();
  }, []);

  useEffect(() => {
    const fetchHistoricoReservas = async () => {
      try {
        const data = await listarHistoricoReservas();
        setHistoricoReservas(data || []);
      } catch (error) {
        console.error("Erro ao buscar histórico de reservas:", error);
        setHistoricoReservas([]);
      }
    };
    fetchHistoricoReservas();
  }, []);

/*   useEffect(() => {
    const fetchReservasAgendadas = async () => {
      try {
        const data = await listarReservasAgendadas();
        setReservasAgendadas(data || []);
      } catch (error) {
        console.error("Erro ao buscar reservas agendadas:", error);
        setReservasAgendadas([]);
      }
    };
    fetchReservasAgendadas();
  }, []); */


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
            <button
              className="btn-logout"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Sair
            </button>
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
            {salasFavoritas.length === 0 ? (
              <p>Lista de salas favoritas vazia.</p>
            ) : (
              salasFavoritas.map((sala) => (
                <CardFavoritos
                  key={sala.id}
                  sala={sala}
                  onClick={() => redirectDetalhesSala(sala)}
                />
              ))
            )}
          </div>
        </section>

        <section className="account-reservations-history">
          <h2>Meu histórico de reservas</h2>
          <hr />
          <div className="reservations-history-list">
            {historicoReservas.length === 0 ? (
              <p>Parece que você não fez reservas recentemente.</p>
            ) : (
              historicoReservas.map((reserva) => (
                <CardFavoritos key={reserva.id} reserva={reserva} />
              ))
            )}
          </div>
        </section>

        <section className="account-reservations-scheduled">
          <h2>Reservas agendadas</h2>
          <hr />
          <div className="reservations-scheduled-list">
            {reservasAgendadas.length === 0 ? (
              <p>Você não tem reservas agendadas no momento.</p>
            ) : (
              reservasAgendadas.map((reserva) => (
                <CardFavoritos key={reserva.id} reserva={reserva} />
              ))
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default AccountPage;
