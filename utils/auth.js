const BASE_URL = '/api';

let favoritesCache = null;
let favoritesCacheToken = null;
let favoritesRequest = null;

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
  favoritesCache = null;
  favoritesCacheToken = null;
  favoritesRequest = null;
  window.location.href = '/login.html';
}

export function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

// ── Favoritos ──────────────────────────────────────────────

export async function getFavorites() {
  const token = getToken();

  if (!token) return JSON.parse(localStorage.getItem('filmes-favoritos')) || [];

  // Compartilha o resultado entre os cards e evita consultas repetidas ao banco.
  if (favoritesCacheToken !== token) {
    favoritesCache = null;
    favoritesRequest = null;
    favoritesCacheToken = token;
  }

  if (favoritesCache) return favoritesCache;
  if (favoritesRequest) return favoritesRequest;

  const requestToken = token;
  favoritesRequest = fetch(`${BASE_URL}/favorites`, { headers: authHeaders() })
    .then((res) => (res.ok ? res.json() : []))
    .then((favorites) => {
      // Evita que uma resposta antiga seja aplicada depois de trocar de conta.
      if (getToken() === requestToken) favoritesCache = favorites;
      return favorites;
    })
    .finally(() => {
      favoritesRequest = null;
    });

  return favoritesRequest;
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
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ movieId, ehSerie }),
  });

  if (res.ok && favoritesCache) {
    const favorite = await res.json();
    const index = favoritesCache.findIndex((item) => (item.movieId ?? item.id) === movieId);
    if (index >= 0) favoritesCache[index] = favorite;
    else favoritesCache.push(favorite);
  }
}

export async function removeFavorite(movieId) {
  if (!isLoggedIn()) {
    let favs = JSON.parse(localStorage.getItem('filmes-favoritos')) || [];
    favs = favs.filter(f => f.id !== movieId);
    localStorage.setItem('filmes-favoritos', JSON.stringify(favs));
    return;
  }
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ movieId }),
  });

  if (res.ok && favoritesCache) {
    favoritesCache = favoritesCache.filter(
      (item) => (item.movieId ?? item.id) !== movieId
    );
  }
}

export async function isFavorite(movieId) {
  const favs = await getFavorites();
  return favs.some(f => (f.movieId ?? f.id) === movieId);
}
