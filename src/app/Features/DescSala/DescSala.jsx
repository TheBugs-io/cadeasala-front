import React from "react";

export default function RoomDetails({ sala, status, dados, onClose }) {
  const image = dados?.imagem || "https://via.placeholder.com/150"

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Cabeçalho */}
        <div style={styles.header}>
          <button style={styles.favoriteButton}>❤️ Favoritar sala</button>
          <button style={styles.closeButton} onClick={onClose}>✖</button>
        </div>

        {/* Conteúdo */}
        <div style={styles.content}>
          <div style={styles.imageBox}>
            <img src={image} alt={sala} style={styles.image} />
          </div>
          <div style={styles.info}>
            <h2>{sala}</h2>
            <p>{dados?.descricao || "Sem descrição disponível."}</p>
            <p><strong>Capacidade:</strong> {dados?.capacidade || "Indefinida"}</p>
            <p><strong>Estado atual:</strong>
              <span style={status === "RESERVADA" ? styles.reserved : styles.available}>
                {status}
              </span>
            </p>
          </div>
        </div>

        {/* Próximas reservas */}
        {dados?.reservas && dados.reservas.length > 0 && (
          <div style={styles.reservations}>
            <h3>Próximas reservas</h3>
            {dados.reservas.map((res) => (
              <div
                key={res.id}
                style={res.status === "ativo" ? styles.reservationActive : styles.reservationInactive}
              >
                {res.title} - {res.time}
              </div>
            ))}
          </div>
        )}

        {/* Botão de agendar */}
        <div style={styles.footer}>
          <button style={styles.scheduleButton}>Agendar</button>
        </div>
      </div>
    </div>
  );
}

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
