export default class UserModel {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  setName(name) {
    this.name = name;
  }

  setEmail(email) {
    this.email = email;
  }
}

export const usuario = [
  {
    nome: "Monalisa Menezes",
    email: "monalisa.menezes@example.com",
    tipo: "SECRETARIO"
  }
];