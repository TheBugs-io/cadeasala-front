import api from '../api.js';

export async function login(email, senha) {
  const response = await api.post('/api/auth/login', { email, senha });
  return response.data.usuario;
}

export async function confirmEmail(token) {
  const response = await api.get(`/api/auth/register/confirmar/${token}`);
  return response.data;
}

export const forgotPassword = async (email) => {
  const response = await api.post('/api/auth/forgot-password', { email });
  return response.data;
};

export const changePassword = async (senhaAnterior, novaSenha) => {
    const response = await api.put('/api/auth/change-password', { 
        senhaAnterior, 
        novaSenha 
    });
    return response.data;
};