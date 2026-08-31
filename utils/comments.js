import { authHeaders, isLoggedIn } from './auth.js';

const BASE_URL = '/api';

export async function getComments(movieId, ehSerie = false) {
  const params = new URLSearchParams({
    movieId: String(movieId),
    ehSerie: ehSerie ? 'true' : 'false',
  });

  const res = await fetch(`${BASE_URL}/comments?${params}`);
  if (!res.ok) return [];
  return res.json();
}

export async function postComment(movieId, ehSerie, content) {
  if (!isLoggedIn()) throw new Error('Faça login para comentar');

  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ movieId, ehSerie, content }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erro ao publicar comentário');
  return data;
}
