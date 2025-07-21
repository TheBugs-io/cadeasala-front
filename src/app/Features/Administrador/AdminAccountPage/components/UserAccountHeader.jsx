import { RiAccountBoxFill } from "react-icons/ri";

const UserAccountHeader = ({ user }) => {
  if (!user) return null;
  return (
    <section
      className="user-account-header"
      aria-label="Informações do usuário"
    >
      <RiAccountBoxFill className="user-icon" size={48} />
      <div className="user-info">
        <h2 className="user-name">{user.nome}</h2>
        <p className="user-email">{user.email}</p>
        <p className="user-role">{user.tipo}</p>
      </div>
    </section>
  );
};

export default UserAccountHeader;
