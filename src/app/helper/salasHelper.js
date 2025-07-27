export const getImagemPorTipo = (tipo) => {
  switch (tipo) {
    case "SALA_AULA":
      return "/assets/salas/sala.jpg";
    case "LABORATORIO":
      return "/assets/salas/lab.jpg";
    case "LAB_ESPECIAL":
      return "/assets/salas/lab_especial.jpg";
    case "ATELIE":
      return "/assets/salas/atelie.png";
    case "GABINETE":
      return "/assets/salas/gabinete.png";
    case "SECRETARIA":
      return "/assets/salas/secretaria.jpg";
    case "CENTRO_ACADEMICO":
      return "/assets/salas/ca.jpg";
    case "COORDENACAO":
      return "/assets/salas/coordenacao.png";
    default:
      return "/assets/salas/sala.jpg";
  }
};

export const formatterLocalizacao = (localizacao) => {
  switch (localizacao) {
    case "PRIMEIRO_ANDAR":
      return "Andar 1";
    case "SEGUNDO_ANDAR":
      return "Andar 2";
    default:
      return "Desconhecido";
  }
};

export const formatterTipo = (tipo) => {
  switch (tipo) {
    case "SALA_AULA":
      return "Sala";
    case "LABORATORIO":
      return "Laboratório";
    case "LAB_ESPECIAL":
      return "Laboratório Especial";
    case "GABINETE":
      return "Gabinete";
    case "SECRETARIA":
      return "Secretaria";
    case "CENTRO_ACADEMICO":
      return "C.A.";
    case "COORDENACAO":
      return "Coordenação";
    case "REUNIAO":
      return "Sala de Reunião";
    default:
      return "Sala";
  }
};