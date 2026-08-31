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

export function setUser(user) {
  if (!user) {
    localStorage.removeItem('sf-user');
    return;
  }
  localStorage.setItem('sf-user', JSON.stringify(user));
}

export function updateStoredUser(partial) {
  const current = getUser() || {};
  const updated = { ...current, ...partial };
  setUser(updated);
  return updated;
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
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ── Perfil do Usuário ──────────────────────────────────────────

export async function getProfile() {
  if (!isLoggedIn()) return null;

  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: authHeaders(),
    });

    if (!res.ok) {
      if (res.status === 401) {
        logout();
      }
      return null;
    }

    const data = await res.json();
    if (data.user) {
      setUser(data.user);
      return data.user;
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return getUser();
  }
}

export async function updateProfile(payload) {
  if (!isLoggedIn()) throw new Error('Não autenticado');

  const res = await fetch(`${BASE_URL}/profile`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Erro ao atualizar perfil');
  }

  if (data.user) {
    setUser(data.user);
  }

  return data;
}

export async function uploadAvatar(file) {
  if (!isLoggedIn()) throw new Error('Não autenticado');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const fileData = reader.result;
        const res = await fetch(`${BASE_URL}/upload`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({
            filename: file.name,
            fileData,
            contentType: file.type,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || 'Erro ao enviar imagem');
        }

        resolve(data.url);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsDataURL(file);
  });
}

// ── Favoritos ──────────────────────────────────────────────

export async function getFavorites() {
  const token = getToken();

  if (!token) return JSON.parse(localStorage.getItem('filmes-favoritos')) || [];

  // Se o usuário tinha favoritos locais salvos antes de logar, envia para o banco
  const localFavs = JSON.parse(localStorage.getItem('filmes-favoritos') || '[]');
  if (localFavs.length > 0) {
    localStorage.removeItem('filmes-favoritos');
    for (const fav of localFavs) {
      const id = fav.movieId ?? fav.id;
      if (id) {
        await addFavorite(id, fav.ehSerie).catch(() => {});
      }
    }
  }

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
