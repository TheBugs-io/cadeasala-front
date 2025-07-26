import UserAccountHeader from "./components/UserAccountHeader";
import "./styles/AdminAccountStyle.css";
import { useNavigate } from "react-router-dom";
import CardFuncionality from "./components/CardFunction";
import { FaCalendar, FaUserPlus, FaUserGear } from "react-icons/fa6";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { useAuth } from "../../../contexts/AuthContext";

export default function AdminMainPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleKeyDown = (e, onClick) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <main className="admin-main-page" aria-label="Página principal do administrador">
      <section className="admin-header">
        <h1 tabIndex={-1} alt="Informações da conta">Sua conta</h1>
        <UserAccountHeader user={user} />
      </section>
      <hr />

      <section
        className="admin-functions"
        aria-label="Funções administrativas disponíveis"
      >
        <CardFuncionality
          icon={<FaCalendar size={24} aria-hidden="true" />}
          title="Controle de reservas"
          description="Gerencie as reservas e pedidos."
          onClick={() => handleCardClick("/admin/dashboard-reservas")}
          role="button"
          tabIndex={0}
          aria-label="Controle de reservas. Gerencie as reservas e pedidos."
          onKeyDown={(e) => handleKeyDown(e, () => handleCardClick("/admin/dashboard-reservas"))}
        />
        <CardFuncionality
          icon={<FaUserPlus size={24} aria-hidden="true" />}
          title="Solicitações de registro"
          description="Aprovar ou rejeitar solicitações de registro."
          onClick={() => handleCardClick("/admin/dashboard-solicitacoes")}
          role="button"
          tabIndex={0}
          aria-label="Solicitações de registro. Aprovar ou rejeitar solicitações de registro."
          onKeyDown={(e) => handleKeyDown(e, () => handleCardClick("/admin/dashboard-solicitacoes"))}
        />
        <CardFuncionality
          icon={<BsFillDoorOpenFill size={24} aria-hidden="true" />}
          title="Controle de salas"
          description="Gerencie as salas do bloco IUVI."
          onClick={() => handleCardClick("/admin/dashboard-salas")}
          role="button"
          tabIndex={0}
          aria-label="Controle de salas. Gerencie as salas do bloco IUVI."
          onKeyDown={(e) => handleKeyDown(e, () => handleCardClick("/admin/dashboard-salas"))}
        />
        <CardFuncionality
          icon={<FaUserGear size={24} aria-hidden="true" />}
          title="Usuários na plataforma"
          description="Visualize e gerencie usuários dentro da plataforma."
          onClick={() => console.log("Usuários na plataforma")}
          role="button"
          tabIndex={0}
          aria-label="Usuários na plataforma. Visualize e gerencie usuários dentro da plataforma."
          onKeyDown={(e) => handleKeyDown(e, () => console.log("Usuários na plataforma"))}
        />
      </section>
    </main>
  );
}
