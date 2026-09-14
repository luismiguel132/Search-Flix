import { authHeaders, isLoggedIn } from './auth.js';

const BASE_URL = '/api';

async function readResponse(res, fallback) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || fallback);
  return data;
}

export async function getMovieRating(movieId, ehSerie = false) {
  const params = new URLSearchParams({ movieId: String(movieId), ehSerie: String(!!ehSerie) });
  const res = await fetch(`${BASE_URL}/ratings?${params}`, {
    headers: isLoggedIn() ? authHeaders() : {},
  });
  return readResponse(res, 'Erro ao carregar as notas');
}

export async function saveRating({ movieId, ehSerie, rating, title, posterPath }) {
  if (!isLoggedIn()) throw new Error('Faça login para avaliar');
  const res = await fetch(`${BASE_URL}/ratings`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ movieId, ehSerie, rating, title, posterPath }),
  });
  return readResponse(res, 'Erro ao salvar nota');
}

export async function removeRating(movieId, ehSerie = false) {
  if (!isLoggedIn()) throw new Error('Faça login para remover sua nota');
  const res = await fetch(`${BASE_URL}/ratings`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ movieId, ehSerie }),
  });
  return readResponse(res, 'Erro ao remover nota');
}

export async function getMyRatings() {
  if (!isLoggedIn()) return [];
  const res = await fetch(`${BASE_URL}/ratings?mine=true`, { headers: authHeaders() });
  return readResponse(res, 'Erro ao carregar suas notas');
}

export async function getPublicProfile(userId) {
  const res = await fetch(`${BASE_URL}/users?id=${encodeURIComponent(userId)}`);
  const data = await readResponse(res, 'Erro ao carregar perfil público');
  return data.user;
}
