const BASE_URL = '/api';

export function getToken() {
  return localStorage.getItem('sf-token');
}

export function getUser() {
  const raw = localStorage.getItem('sf-user');
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem('sf-token');
  localStorage.removeItem('sf-user');
  window.location.href = '/login.html';
}

export function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

// ── Favoritos ──────────────────────────────────────────────

export async function getFavorites() {
  if (!isLoggedIn()) return JSON.parse(localStorage.getItem('filmes-favoritos')) || [];
  const res = await fetch(`${BASE_URL}/favorites`, { headers: authHeaders() });
  return res.ok ? res.json() : [];
}

export async function addFavorite(movieId, ehSerie) {
  if (!isLoggedIn()) {
    const favs = JSON.parse(localStorage.getItem('filmes-favoritos')) || [];
    if (!favs.some(f => f.id === movieId)) {
      favs.push({ id: movieId, ehSerie });
      localStorage.setItem('filmes-favoritos', JSON.stringify(favs));
    }
    return;
  }
  await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ movieId, ehSerie }),
  });
}

export async function removeFavorite(movieId) {
  if (!isLoggedIn()) {
    let favs = JSON.parse(localStorage.getItem('filmes-favoritos')) || [];
    favs = favs.filter(f => f.id !== movieId);
    localStorage.setItem('filmes-favoritos', JSON.stringify(favs));
    return;
  }
  await fetch(`${BASE_URL}/favorites`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ movieId }),
  });
}

export async function isFavorite(movieId) {
  const favs = await getFavorites();
  return favs.some(f => (f.id ?? f.movieId) === movieId);
}
