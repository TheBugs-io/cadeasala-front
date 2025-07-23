export const getImagemPorTipo = (tipo) => {
  switch (tipo) {
    case "SALA_AULA":
      return "https://github.com/TheBugs-io/cadeasala-front/blob/feature/controle-salas/src/app/assets/salas/sala.jpg?raw=true";
    case "LABORATORIO":
      return "https://github.com/TheBugs-io/cadeasala-front/blob/feature/controle-salas/src/app/assets/salas/lab.jpg?raw=true";
    case "LAB_ESPECIAL":
      return "https://github.com/TheBugs-io/cadeasala-front/blob/feature/controle-salas/src/app/assets/salas/lab.jpg?raw=true";
    case "ATELIE":
      return "https://github.com/TheBugs-io/cadeasala-front/blob/feature/controle-salas/src/app/assets/salas/atelie.png?raw=true";
    case "GABINETE":
      return "https://via.placeholder.com/300x200.png?text=Gabinete";
    case "SECRETARIA":
      return "https://via.placeholder.com/300x200.png?text=Secretaria";
    case "CENTRO_ACADEMICO":
      return "https://via.placeholder.com/300x200.png?text=C.A.";
    case "COORDENACAO":
      return "https://via.placeholder.com/300x200.png?text=Coordenação";
    case "REUNIAO":
      return "https://via.placeholder.com/300x200.png?text=Reunião";
    default:
      return "https://github.com/TheBugs-io/cadeasala-front/blob/feature/controle-salas/src/app/assets/salas/sala.jpg?raw=true";
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