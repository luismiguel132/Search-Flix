import { authHeaders, isLoggedIn } from './auth.js';

const BASE_URL = '/api';

export async function getComments(movieId, ehSerie = false) {
  const params = new URLSearchParams({
    movieId: String(movieId),
    ehSerie: ehSerie ? 'true' : 'false',
  });
  const res = await fetch(`${BASE_URL}/comments?${params}`, {
    headers: isLoggedIn() ? authHeaders() : {},
  });
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

export async function postReply(commentId, content) {
  if (!isLoggedIn()) throw new Error('Faça login para responder');
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ action: 'reply', commentId, content }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erro ao publicar resposta');
  return data;
}

export async function editComment(commentId, content) {
  if (!isLoggedIn()) throw new Error('Não autenticado');
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ commentId, content }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erro ao editar comentário');
  return data;
}

export async function editReply(replyId, content) {
  if (!isLoggedIn()) throw new Error('Não autenticado');
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ replyId, content }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erro ao editar resposta');
  return data;
}

export async function deleteComment(commentId) {
  if (!isLoggedIn()) throw new Error('Não autenticado');
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ commentId }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erro ao excluir comentário');
  return data;
}

export async function deleteReply(replyId) {
  if (!isLoggedIn()) throw new Error('Não autenticado');
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ replyId }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erro ao excluir resposta');
  return data;
}

export async function likeComment(commentId) {
  if (!isLoggedIn()) throw new Error('Não autenticado');
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ action: 'like-comment', commentId }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erro ao curtir');
  return data;
}

export async function likeReply(replyId) {
  if (!isLoggedIn()) throw new Error('Não autenticado');
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ action: 'like-reply', replyId }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erro ao curtir');
  return data;
}
