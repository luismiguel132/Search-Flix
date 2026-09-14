import { API_KEY_TMDB } from './keys.js';
import { getUser, isLoggedIn } from './utils/auth.js';
import { getUserActivity } from './utils/social.js';
import { followUser, unfollowUser } from './utils/social.js';

const query = new URLSearchParams(window.location.search);
const userId = query.get('userId');
const feed = document.getElementById('activity-feed');
const followButton = document.getElementById('activity-follow-button');
let activity = [];
let currentFilter = 'all';
let profile;
let isFollowing = false;

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = String(value ?? '');
  return element.innerHTML;
}

function initials(name) {
  return (name || 'SF').trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function posterPath(path) {
  return path ? (path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w342${path}`) : 'https://via.placeholder.com/342x513/1e293b/94a3b8?text=Sem+poster';
}

function relativeDate(value) {
  const diff = new Date(value).getTime() - Date.now();
  const minutes = Math.round(diff / 60000);
  if (Math.abs(minutes) < 60) return `há ${Math.max(1, Math.abs(minutes))} min`;
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return `há ${Math.abs(hours)} h`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'ontem' : `há ${Math.abs(days)} dias`;
}

async function enrichMissingTitles() {
  await Promise.all(activity.map(async (item) => {
    if (item.title && item.posterPath) return;
    try {
      const type = item.ehSerie ? 'tv' : 'movie';
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${item.movieId}?api_key=${API_KEY_TMDB}&language=pt-BR`);
      if (!res.ok) return;
      const data = await res.json();
      item.title ||= data.title || data.name;
      item.posterPath ||= data.poster_path;
    } catch { /* a atividade ainda pode ser exibida com o ID */ }
  }));
}

function renderProfile() {
  document.title = `Atividade de ${profile.name || 'Usuário'} - Search Flix`;
  const avatar = document.getElementById('activity-avatar');
  avatar.innerHTML = profile.avatarUrl
    ? `<img src="${profile.avatarUrl}" alt="${escapeHtml(profile.name)}" class="h-full w-full object-cover">`
    : `<span>${initials(profile.name)}</span>`;
  document.getElementById('activity-user-name').textContent = profile.name || 'Usuário Search Flix';
  document.getElementById('activity-user-subtitle').textContent = `Atividade desde ${new Date(profile.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}`;
  document.getElementById('activity-followers').textContent = profile.followersCount ?? 0;
  document.getElementById('activity-following').textContent = profile.followingCount ?? 0;
  document.getElementById('activity-favorites').textContent = profile.favoritesCount ?? 0;
}

function renderFeed() {
  const visible = currentFilter === 'all' ? activity : activity.filter(item => item.type === currentFilter);
  if (!visible.length) {
    feed.innerHTML = '<p class="py-10 text-center text-sm text-slate-400">Nenhuma atividade encontrada.</p>';
    return;
  }
  feed.innerHTML = visible.map(item => {
    const title = item.title || `${item.ehSerie ? 'Série' : 'Filme'} #${item.movieId}`;
    const isRating = item.type === 'rating';
    return `<article class="relative flex gap-3">
      <div class="z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${isRating ? 'bg-yellow-400/15 text-yellow-400' : 'bg-blue-400/15 text-blue-300'}">
        <i class="fa-solid ${isRating ? 'fa-star' : 'fa-bookmark'}"></i>
      </div>
      <div class="min-w-0 flex-1 rounded-xl border border-slate-700/80 bg-slate-900/60 p-3 transition hover:border-slate-500">
        <div class="mb-3 flex items-center justify-between gap-3 text-xs"><p class="text-slate-300">${isRating ? 'avaliou' : 'adicionou aos favoritos'}</p><time class="whitespace-nowrap text-slate-500">${relativeDate(item.createdAt)}</time></div>
        <a href="/movie-details.html?id=${item.movieId}${item.ehSerie ? '-serie' : ''}" class="flex gap-3">
          <img src="${posterPath(item.posterPath)}" alt="${escapeHtml(title)}" class="h-24 w-16 flex-shrink-0 rounded-lg object-cover" loading="lazy">
          <div class="min-w-0 pt-1"><h3 class="line-clamp-2 font-semibold text-white hover:text-yellow-400">${escapeHtml(title)}</h3><p class="mt-1 text-xs text-slate-500">${item.ehSerie ? 'Série' : 'Filme'}</p>${isRating ? `<p class="mt-3 font-bold text-yellow-400">★ ${item.rating}/10</p>` : '<p class="mt-3 text-xs text-blue-300">Adicionado à lista de favoritos</p>'}</div>
        </a>
      </div>
    </article>`;
  }).join('');
}

function renderFollowButton() {
  if (!followButton) return;
  followButton.classList.remove('hidden');
  followButton.classList.add('inline-flex');
  followButton.innerHTML = isFollowing
    ? '<i class="fa-solid fa-user-check"></i><span>Seguindo</span>'
    : '<i class="fa-solid fa-user-plus"></i><span>Seguir</span>';
  followButton.classList.toggle('bg-yellow-400', !isFollowing);
  followButton.classList.toggle('text-black', !isFollowing);
  followButton.classList.toggle('bg-slate-700', isFollowing);
  followButton.classList.toggle('text-white', isFollowing);
}

document.querySelectorAll('#activity-filters button').forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll('#activity-filters button').forEach(item => item.classList.remove('bg-yellow-400', 'font-bold', 'text-black'));
    button.classList.add('bg-yellow-400', 'font-bold', 'text-black');
    renderFeed();
  });
});

async function init() {
  if (!userId) {
    feed.innerHTML = '<p class="py-10 text-center text-sm text-rose-300">Usuário inválido.</p>';
    return;
  }
  try {
    const data = await getUserActivity(userId);
    profile = data.user;
    activity = data.activity || [];
    isFollowing = data.isFollowing;
    renderProfile();
    if (isLoggedIn() && Number(getUser()?.id) !== Number(userId)) {
      renderFollowButton();
      followButton.addEventListener('click', async () => {
        followButton.disabled = true;
        try {
          const result = isFollowing ? await unfollowUser(userId) : await followUser(userId);
          isFollowing = result.isFollowing;
          profile.followersCount = result.followersCount;
          document.getElementById('activity-followers').textContent = profile.followersCount;
          renderFollowButton();
        } finally {
          followButton.disabled = false;
        }
      });
    }
    document.getElementById('activity-back').href = `/profile.html?userId=${userId}`;
    await enrichMissingTitles();
    renderFeed();
  } catch (error) {
    feed.innerHTML = `<p class="py-10 text-center text-sm text-rose-300">${escapeHtml(error.message || 'Não foi possível carregar a atividade.')}</p>`;
  }
}

init();
