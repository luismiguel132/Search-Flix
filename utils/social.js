import { authHeaders, isLoggedIn } from './auth.js';

const BASE_URL = '/api';

async function responseData(res, fallback) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || fallback);
  return data;
}

export async function getFollowSummary(userId) {
  const res = await fetch(`${BASE_URL}/follows?userId=${encodeURIComponent(userId)}`, {
    headers: isLoggedIn() ? authHeaders() : {},
  });
  return responseData(res, 'Erro ao carregar seguidores');
}

export async function followUser(userId) {
  if (!isLoggedIn()) throw new Error('Faça login para seguir usuários');
  const res = await fetch(`${BASE_URL}/follows`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify({ userId }),
  });
  return responseData(res, 'Erro ao seguir usuário');
}

export async function unfollowUser(userId) {
  if (!isLoggedIn()) throw new Error('Faça login para deixar de seguir');
  const res = await fetch(`${BASE_URL}/follows`, {
    method: 'DELETE', headers: authHeaders(), body: JSON.stringify({ userId }),
  });
  return responseData(res, 'Erro ao deixar de seguir');
}

export async function getUserActivity(userId) {
  const res = await fetch(`${BASE_URL}/activity?userId=${encodeURIComponent(userId)}`, {
    headers: isLoggedIn() ? authHeaders() : {},
  });
  return responseData(res, 'Erro ao carregar atividade');
}

export async function getFollowingFeed() {
  if (!isLoggedIn()) throw new Error('Faça login para ver seu feed');
  const res = await fetch(`${BASE_URL}/feed`, { headers: authHeaders() });
  return responseData(res, 'Erro ao carregar feed');
}
