import api from '../api.js';

export async function login(email, senha) {
  const response = await api.post('/api/auth/login', { email, senha });
  return response.data.usuario;
}

export const changePassword = async (senhaAnterior, novaSenha) => {
    const response = await api.put('/api/auth/change-password', { 
        senhaAnterior, 
        novaSenha 
    });
    return response.data;
};