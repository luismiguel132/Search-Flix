import { API_KEY_TMDB } from './keys.js';
import { getFavorites, addFavorite, removeFavorite } from './utils/auth.js';

const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const type = params.get('type') === 'tv' ? 'tv' : 'movie';
const label = params.get('label') || (type === 'tv' ? 'Séries' : 'Filmes');
let page = Math.max(1, Number(params.get('page')) || 1);
const grid = document.getElementById('category-grid');
const loading = document.getElementById('category-loading');
const empty = document.getElementById('category-empty');
const pagination = document.getElementById('category-pagination');

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = String(value ?? '');
  return element.innerHTML;
}

function createCard(item, favorites) {
  const isSeries = type === 'tv';
  const id = item.id;
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || '').slice(0, 4) || 'Ano não informado';
  const favorite = favorites.some(item => (item.movieId ?? item.id) === id && Boolean(item.ehSerie) === isSeries);
  const card = document.createElement('a');
  card.href = `/movie-details.html?id=${id}${isSeries ? '-serie' : ''}`;
  card.className = 'group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800 transition hover:-translate-y-1 hover:border-yellow-400/70';
  card.innerHTML = `
    <img src="${item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : 'https://via.placeholder.com/342x513/1e293b/94a3b8?text=Sem+poster'}" alt="${escapeHtml(title)}" class="h-72 w-full object-cover transition group-hover:scale-105">
    <div class="p-3"><h2 class="line-clamp-2 font-semibold text-white group-hover:text-yellow-400">${escapeHtml(title)}</h2><p class="mt-1 text-xs text-slate-400">${year} · ${Number(item.vote_average || 0).toFixed(1)} ⭐</p></div>
    <button type="button" class="category-favorite absolute right-2 top-2 rounded-lg bg-black/60 p-2 text-white transition hover:bg-yellow-400 hover:text-black" aria-label="${favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"><i class="fa-${favorite ? 'solid text-yellow-400' : 'regular'} fa-bookmark"></i></button>`;

  card.querySelector('.category-favorite').addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const icon = event.currentTarget.querySelector('i');
    const currentlyFavorite = icon.classList.contains('fa-solid');
    if (currentlyFavorite) {
      await removeFavorite(id);
      icon.className = 'fa-regular fa-bookmark';
    } else {
      await addFavorite(id, isSeries, { title, posterPath: item.poster_path });
      icon.className = 'fa-solid fa-bookmark text-yellow-400';
    }
  });
  return card;
}

function renderPagination(totalPages) {
  const previous = page > 1 ? `<button type="button" data-page="${page - 1}" class="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-yellow-400 hover:text-yellow-400"><i class="fa-solid fa-arrow-left mr-2"></i>Anterior</button>` : '';
  const next = page < Math.min(totalPages || 1, 500) ? `<button type="button" data-page="${page + 1}" class="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-yellow-400 hover:text-yellow-400">Próxima<i class="fa-solid fa-arrow-right ml-2"></i></button>` : '';
  pagination.innerHTML = `${previous}<span class="text-sm text-slate-400">Página ${page}</span>${next}`;
  pagination.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => {
    const nextPage = Number(button.dataset.page);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('page', nextPage);
    window.location.href = nextUrl.href;
  }));
}

async function loadCategory() {
  document.getElementById('category-title').textContent = label;
  document.getElementById('category-description').textContent = `Mais ${type === 'tv' ? 'séries' : 'filmes'} para explorar nesta categoria.`;
  if (!category) {
    loading.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }
  try {
    const curatedEndpoints = {
      'top-rated': 'movie/top_rated',
      'now-playing': 'movie/now_playing',
      'upcoming': 'movie/upcoming',
      'top-rated-series': 'tv/top_rated',
      'airing-today': 'tv/airing_today',
    };
    const endpoint = type === 'tv'
      ? (curatedEndpoints[category] || (category === 'popular-series' ? 'tv/popular' : 'discover/tv'))
      : (curatedEndpoints[category] || (category === 'popular' ? 'movie/popular' : 'discover/movie'));
    const isCurated = Boolean(curatedEndpoints[category]);
    const filter = isCurated || category === 'popular' || category === 'popular-series'
      ? ''
      : `&with_genres=${encodeURIComponent(category)}&sort_by=popularity.desc`;
    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY_TMDB}&language=pt-BR&page=${page}${filter}`);
    const data = await response.json();
    const items = (data.results || []).filter(item => item.poster_path);
    const favorites = await getFavorites();
    loading.classList.add('hidden');
    if (!items.length) {
      empty.classList.remove('hidden');
      return;
    }
    grid.innerHTML = '';
    items.forEach(item => grid.appendChild(createCard(item, favorites)));
    grid.classList.remove('hidden');
    renderPagination(data.total_pages);
  } catch {
    loading.innerHTML = '<span class="text-rose-300">Não foi possível carregar esta categoria.</span>';
  }
}

loadCategory();
