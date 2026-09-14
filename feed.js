import { API_KEY_TMDB } from './keys.js';
import { getFollowingFeed } from './utils/social.js';

const feedElement = document.getElementById('following-feed');
let activities = [];
let filter = 'all';

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = String(value ?? '');
  return element.innerHTML;
}

function initials(name) {
  return (name || 'SF').trim().split(/\s+/).slice(0, 2).map(item => item[0]).join('').toUpperCase();
}

function poster(path) {
  return path ? (path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w342${path}`) : 'https://via.placeholder.com/342x513/1e293b/94a3b8?text=Sem+poster';
}

function relativeDate(value) {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'ontem' : `há ${days} dias`;
}

async function loadLegacyMetadata() {
  await Promise.all(activities.map(async item => {
    if (item.title && item.posterPath) return;
    try {
      const type = item.ehSerie ? 'tv' : 'movie';
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${item.movieId}?api_key=${API_KEY_TMDB}&language=pt-BR`);
      if (!response.ok) return;
      const movie = await response.json();
      item.title ||= movie.title || movie.name;
      item.posterPath ||= movie.poster_path;
    } catch { /* mantém o fallback com o ID */ }
  }));
}

function render() {
  const visible = filter === 'all' ? activities : activities.filter(item => item.type === filter);
  if (!visible.length) {
    feedElement.innerHTML = '<div class="py-12 text-center"><i class="fa-solid fa-user-plus mb-3 text-3xl text-slate-600"></i><p class="text-sm text-slate-400">Você ainda não segue ninguém ou não há atividades novas.</p><a href="/" class="mt-4 inline-block text-sm text-yellow-400 hover:underline">Explorar usuários nos comentários</a></div>';
    return;
  }
  feedElement.innerHTML = visible.map(item => {
    const title = item.title || `${item.ehSerie ? 'Série' : 'Filme'} #${item.movieId}`;
    const rating = item.type === 'rating';
    return `<article class="flex gap-3">
      <a href="/profile.html?userId=${item.user.id}" class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-yellow-400 bg-gradient-to-tr from-yellow-500 to-yellow-300 text-xs font-bold text-black">
        ${item.user.avatarUrl ? `<img src="${item.user.avatarUrl}" alt="${escapeHtml(item.user.name)}" class="h-full w-full object-cover">` : initials(item.user.name)}
      </a>
      <div class="min-w-0 flex-1 rounded-xl border border-slate-700/80 bg-slate-900/60 p-3 transition hover:border-slate-500">
        <div class="mb-3 flex items-center justify-between gap-3 text-xs"><p class="text-slate-300"><a href="/profile.html?userId=${item.user.id}" class="font-semibold text-white hover:text-yellow-400">${escapeHtml(item.user.name || 'Usuário')}</a> ${rating ? 'avaliou' : 'adicionou aos favoritos'}</p><time class="whitespace-nowrap text-slate-500">${relativeDate(item.createdAt)}</time></div>
        <a href="/movie-details.html?id=${item.movieId}${item.ehSerie ? '-serie' : ''}" class="flex gap-3">
          <img src="${poster(item.posterPath)}" alt="${escapeHtml(title)}" class="h-24 w-16 flex-shrink-0 rounded-lg object-cover" loading="lazy">
          <div class="min-w-0 pt-1"><h3 class="line-clamp-2 font-semibold text-white hover:text-yellow-400">${escapeHtml(title)}</h3><p class="mt-1 text-xs text-slate-500">${item.ehSerie ? 'Série' : 'Filme'}</p>${rating ? `<p class="mt-3 font-bold text-yellow-400">★ ${item.rating}/10</p>` : '<p class="mt-3 text-xs text-blue-300">Adicionado aos favoritos</p>'}</div>
        </a>
      </div>
    </article>`;
  }).join('');
}

document.querySelectorAll('#feed-filters button').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('#feed-filters button').forEach(item => item.classList.remove('bg-yellow-400', 'font-bold', 'text-black'));
  button.classList.add('bg-yellow-400', 'font-bold', 'text-black');
  render();
}));

async function init() {
  try {
    const data = await getFollowingFeed();
    activities = data.activity || [];
    document.getElementById('feed-subtitle').textContent = `${data.followingCount} ${data.followingCount === 1 ? 'pessoa seguida' : 'pessoas seguidas'}`;
    await loadLegacyMetadata();
    render();
  } catch (error) {
    feedElement.innerHTML = `<p class="py-10 text-center text-sm text-rose-300">${escapeHtml(error.message || 'Não foi possível carregar seu feed.')}</p>`;
  }
}

init();
