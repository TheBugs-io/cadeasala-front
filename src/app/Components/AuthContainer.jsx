import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthContainer = () => {
  const [view, setView] = useState("login");

  return (
    <div>
      {view === "login" && (
        <LoginForm
          onRegister={() => setView("register")}
          onForgot={() => setView("forgot")}
        />
      )}
      {view === "register" && <RegisterForm onLogin={() => setView("login")} />}
      {view === "forgot" && ( <ForgotPasswordForm onLogin={() => setView("login")} />)}
    </div>
  );
};

export default AuthContainer;
