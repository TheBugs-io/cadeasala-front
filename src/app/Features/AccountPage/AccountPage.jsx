import React, { useState } from "react";

export default function AccountPage() {
  // Simulação de dados do usuário
  const user = {
    name: "Heitor Ferreira",
  };

  // Estado dos botões de configuração
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);

  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <header style={styles.header}>
        {/* <div style={styles.logoArea}> */}
            <div>
          {/* <img
            src="/logo.png"
            alt="Logo"
            style={styles.logo}
          /> */}
        </div>
        <div>
          <h1>Conta</h1>
          <p>{user.name}</p>
        </div>
        <div style={styles.actions}>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            Notificações {notificationsEnabled ? "✅" : "❌"}
          </button>
          <button
            onClick={() => setAccessibilityEnabled(!accessibilityEnabled)}
          >
            Acessibilidade {accessibilityEnabled ? "✅" : "❌"}
          </button>
        </div>
        {/* <div style={styles.mapButton}>
          <button>Mapa</button>
        </div> */}
      </header>

      {/* Conteúdo principal */}
      <main style={styles.mainContent}>
        <section style={styles.section}>
          <h2>Salas Favoritas</h2>
          <div style={styles.emptyBox}>
            Nenhuma sala favorita ainda.
          </div>
        </section>
        <section style={styles.section}>
          <h2>Meu histórico de reservas</h2>
          <div style={styles.emptyBox}>
            Nenhuma reserva registrada.
          </div>
        </section>
      </main>
    </div>
  );
}

// Alguns estilos inline só para ficar legível
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "1rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #ccc",
    paddingBottom: "1rem",
  },
  logoArea: {
    marginRight: "1rem",
  },
  logo: {
    height: "40px",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
  mapButton: {
    marginLeft: "1rem",
  },
  mainContent: {
    marginTop: "2rem",
  },
  section: {
    marginBottom: "2rem",
  },
  emptyBox: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    color: "#777",
  },
};