import UserAccountHeader from "./components/UserAccountHeader";
import { usuario } from "../../../models/UserModel";
import "./styles/AdminAccountStyle.css";
import CardFuncionality from "./components/CardFunction";
import { FaCalendar, FaUserPlus, FaUserGear } from "react-icons/fa6";
import { BsFillDoorOpenFill } from "react-icons/bs";


export default function AdminMainPage() {
  return (
    <div className="admin-main-page">
      <section className="admin-header">
        <h1>Sua conta</h1>
        <UserAccountHeader user={usuario[0]} />
      </section>
      <hr />

      <section className="admin-functions">
        <CardFuncionality
          icon={<i className="fas fa-calendar-alt"><FaCalendar size={24} /></i>}
          title="Controle de reservas"
          description="Gerencie as reservas de salas."
          onClick={() => console.log("Controle de reservas")}
        />
        <CardFuncionality
          icon={<i className="fas fa-user-plus"><FaUserPlus size={24} /></i>}
          title="Solicitações de registro"
          description="Aprovar ou rejeitar solicitações de registro."
          onClick={() => console.log("Solicitações de registro")}
        />
        <CardFuncionality
          icon={<i className="fas fa-door-open"><BsFillDoorOpenFill size={24} /></i>}
          title="Controle de salas"
          description="Gerencie as salas disponíveis."
          onClick={() => console.log("Controle de salas")}
        />
        <CardFuncionality
          icon={<i className="fas fa-users"><FaUserGear size={24} /></i>}
          title="Usuários na plataforma"
          description="Visualize e gerencie usuários."
          onClick={() => console.log("Usuários na plataforma")}
        />
      </section>
    </div>
  );
}
