import UserAccountHeader from "./components/UserAccountHeader";
import { usuario } from "../../../models/UserModel";
import './styles/AdminAccountStyle.css';

export default function AdminMainPage() {
  return (
    <div className="admin-main-page">
      <section className="admin-header">
        <h1>Sua conta</h1>
        <UserAccountHeader user={usuario[0]} />
      </section>
      <hr />
    </div>
  );
}