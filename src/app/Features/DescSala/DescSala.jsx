// src/app/Features/RoomDetails/RoomDetails.jsx

import React from "react";

export default function RoomDetails() {
  // Exemplo de dados mockados - depois você pode receber via props ou API
  const room = {
    name: "SALA 01",
    description: "Sala com macbooks",
    capacity: 30,
    status: "Reservada",
    image: "/sala01.jpg", // ou algum placeholder
    reservations: [
      { id: 1, title: "Design de Interfaces Gráficas", time: "14h-16h (Ter)", status: "ativo" },
      { id: 2, title: "Design de Interfaces Gráficas", time: "14h-16h (Qui)", status: "inativo" },
    ],
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Cabeçalho */}
        <div style={styles.header}>
          <button style={styles.favoriteButton}>❤️ Favoritar sala</button>
          <button style={styles.closeButton}>✖</button>
        </div>

        {/* Conteúdo */}
        <div style={styles.content}>
          <div style={styles.imageBox}>
            <img src={room.image} alt={room.name} style={styles.image} />
          </div>
          <div style={styles.info}>
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <p><strong>Capacidade:</strong> {room.capacity}</p>
            <p><strong>Estado atual:</strong> 
              <span style={room.status === "Reservada" ? styles.reserved : styles.available}>
                {room.status}
              </span>
            </p>
          </div>
        </div>

        {/* Próximas reservas */}
        <div style={styles.reservations}>
          <h3>Próximas reservas</h3>
          {room.reservations.map((res) => (
            <div
              key={res.id}
              style={res.status === "ativo" ? styles.reservationActive : styles.reservationInactive}
            >
              {res.title} - {res.time}
            </div>
          ))}
        </div>

        {/* Botão de agendar */}
        <div style={styles.footer}>
          <button style={styles.scheduleButton}>Agendar</button>
        </div>
      </div>
    </div>
  );
}

// Exemplo de estilos simples inline
const styles = {
    
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    borderRadius: "8px",
    padding: "1rem",
    maxWidth: "800px",
    width: "100%",
    maxHeight: "450px",
    height: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  favoriteButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "1rem",
  },
  closeButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  content: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  imageBox: {
    flex: "0 0 150px",
  },
  image: {
    width: "100%",
    borderRadius: "4px",
  },
  info: {
    flex: 1,
  },
  reserved: {
    color: "red",
    fontWeight: "bold",
  },
  available: {
    color: "green",
    fontWeight: "bold",
  },
  reservations: {
    marginTop: "1rem",
  },
  reservationActive: {
    background: "#c8f7c5",
    padding: "0.5rem",
    borderRadius: "4px",
    marginBottom: "0.5rem",
  },
  reservationInactive: {
    background: "#eee",
    padding: "0.5rem",
    borderRadius: "4px",
    marginBottom: "0.5rem",
  },
  footer: {
    marginTop: "1rem",
    textAlign: "center",
  },
  scheduleButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};