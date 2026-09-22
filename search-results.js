import { API_KEY_TMDB } from './keys.js';

const term = new URLSearchParams(window.location.search).get('q')?.trim() || '';
const loading = document.getElementById('results-loading');
const content = document.getElementById('results-content');
const allResults = { movie: [], tv: [], company: [], user: [] };
let activeTab = 'all';

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = String(value ?? '');
  return element.innerHTML;
}

function poster(path) {
  return path ? `https://image.tmdb.org/t/p/w342${path}` : 'https://via.placeholder.com/342x513/1e293b/94a3b8?text=Sem+poster';
}

function initials(name) {
  return (name || 'SF').trim().split(/\s+/).slice(0, 2).map(item => item[0]).join('').toUpperCase();
}

function mediaCard(item, type) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  return `<a href="/movie-details.html?id=${item.id}${type === 'tv' ? '-serie' : ''}" class="group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 transition hover:-translate-y-1 hover:border-yellow-400/70"><img src="${poster(item.poster_path)}" alt="${escapeHtml(title)}" class="h-64 w-full object-cover transition group-hover:scale-105"><div class="p-3"><h3 class="line-clamp-1 font-semibold text-white group-hover:text-yellow-400">${escapeHtml(title)}</h3><p class="mt-1 text-xs text-slate-400">${date?.slice(0, 4) || 'Ano não informado'} · ${Number(item.vote_average || 0).toFixed(1)} ⭐</p></div></a>`;
}

function userCard(user) {
  return `<a href="/profile.html?userId=${user.id}" class="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800 p-4 transition hover:border-yellow-400/70"><div class="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-yellow-400 bg-yellow-400 text-sm font-bold text-black">${user.avatarUrl ? `<img src="${user.avatarUrl}" alt="${escapeHtml(user.name)}" class="h-full w-full object-cover">` : initials(user.name)}</div><div class="min-w-0"><h3 class="truncate font-semibold text-white">${escapeHtml(user.name || 'Usuário')}</h3><p class="text-sm text-slate-400">Ver perfil público</p></div><i class="fa-solid fa-chevron-right ml-auto text-slate-500"></i></a>`;
}

function companySection(company) {
  const movies = company.movies || [];
  const series = company.series || [];
  const items = [
    ...movies.map(item => ({ ...item, searchType: 'movie' })),
    ...series.map(item => ({ ...item, searchType: 'tv' })),
  ];
  return `<section><div class="mb-3 flex items-center justify-between"><div><h2 class="text-xl font-bold text-white">${escapeHtml(company.name)}</h2><p class="text-xs text-slate-400">${movies.length} filmes · ${series.length} séries</p></div></div><div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">${items.map(item => mediaCard(item, item.searchType)).join('') || '<p class="col-span-full rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">Nenhum título encontrado para esta companhia.</p>'}</div></section>`;
}

function section(title, type, items, renderer, showAll = false) {
  if (!items.length) return `<section><h2 class="mb-3 text-xl font-bold text-white">${title}</h2><p class="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">Nenhum resultado encontrado.</p></section>`;
  const visibleItems = showAll ? items : items.slice(0, 5);
  return `<section><div class="mb-3 flex items-center justify-between"><h2 class="text-xl font-bold text-white">${title}</h2>${showAll ? '' : `<button type="button" data-see-tab="${type}" class="text-sm text-yellow-400 hover:underline">Ver mais</button>`}</div><div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">${visibleItems.map(renderer).join('')}</div></section>`;
}

function render() {
  const users = allResults.user;
  if (activeTab === 'all') {
    content.innerHTML = section('Filmes', 'movie', allResults.movie, item => mediaCard(item, 'movie')) + section('Séries', 'tv', allResults.tv, item => mediaCard(item, 'tv')) + section('Companhias', 'company', allResults.company, company => `<div class="rounded-xl border border-slate-700 bg-slate-800 p-4"><h3 class="font-semibold text-white">${escapeHtml(company.name)}</h3><p class="mt-1 text-xs text-slate-400">${(company.movies || []).length} filmes · ${(company.series || []).length} séries</p></div>`) + `<section><div class="mb-3 flex items-center justify-between"><h2 class="text-xl font-bold text-white">Usuários</h2><button type="button" data-see-tab="user" class="text-sm text-yellow-400 hover:underline">Ver mais</button></div><div class="grid gap-3 md:grid-cols-2">${users.slice(0, 5).map(userCard).join('') || '<p class="col-span-full rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">Nenhum usuário encontrado.</p>'}</div></section>`;
  } else if (activeTab === 'user') {
    content.innerHTML = `<section><h2 class="mb-3 text-xl font-bold text-white">Usuários</h2><div class="grid gap-3 md:grid-cols-2">${users.map(userCard).join('') || '<p class="col-span-full rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">Nenhum usuário encontrado.</p>'}</div></section>`;
  } else if (activeTab === 'company') {
    content.innerHTML = allResults.company.map(companySection).join('') || '<section><p class="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">Nenhuma companhia encontrada.</p></section>';
  } else {
    const typeLabel = activeTab === 'movie' ? 'Filmes' : 'Séries';
    const items = allResults[activeTab];
    content.innerHTML = section(typeLabel, activeTab, items, item => mediaCard(item, activeTab), true);
  }
  content.querySelectorAll('[data-see-tab]').forEach(button => button.addEventListener('click', () => selectTab(button.dataset.seeTab)));
}

function selectTab(tab) {
  activeTab = tab;
  document.querySelectorAll('#results-tabs button').forEach(button => {
    const selected = button.dataset.tab === tab;
    button.classList.toggle('bg-yellow-400', selected);
    button.classList.toggle('font-bold', selected);
    button.classList.toggle('text-black', selected);
    button.classList.toggle('text-slate-300', !selected);
  });
  render();
}

document.querySelectorAll('#results-tabs button').forEach(button => button.addEventListener('click', () => selectTab(button.dataset.tab)));

async function search() {
  document.getElementById('search-term').textContent = term ? `“${term}”` : '';
  if (!term) {
    loading.textContent = 'Digite algo para pesquisar.';
    return;
  }
  try {
    const [tmdbResponse, usersResponse, companiesResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(term)}&language=pt-BR&include_adult=false`),
      fetch(`/api/users?search=${encodeURIComponent(term)}`),
      fetch(`https://api.themoviedb.org/3/search/company?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(term)}&page=1`),
    ]);
    const tmdb = await tmdbResponse.json();
    const users = await usersResponse.json().catch(() => ({ users: [] }));
    const companiesData = await companiesResponse.json().catch(() => ({ results: [] }));
    (tmdb.results || []).forEach(item => {
      if (item.media_type === 'movie' && item.poster_path) allResults.movie.push(item);
      if (item.media_type === 'tv' && item.poster_path) allResults.tv.push(item);
    });
    allResults.user = users.users || [];
    const companies = (companiesData.results || []).slice(0, 4);
    allResults.company = await Promise.all(companies.map(async company => {
      const [moviesResponse, seriesResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&language=pt-BR&with_companies=${company.id}&sort_by=popularity.desc&page=1`),
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY_TMDB}&language=pt-BR&with_companies=${company.id}&sort_by=popularity.desc&page=1`),
      ]);
      const movies = await moviesResponse.json().catch(() => ({ results: [] }));
      const series = await seriesResponse.json().catch(() => ({ results: [] }));
      return { ...company, movies: movies.results || [], series: series.results || [] };
    }));
    document.querySelector('[data-count="all"]').textContent = `(${allResults.movie.length + allResults.tv.length + allResults.company.length + allResults.user.length})`;
    document.querySelector('[data-count="movie"]').textContent = `(${allResults.movie.length})`;
    document.querySelector('[data-count="tv"]').textContent = `(${allResults.tv.length})`;
    document.querySelector('[data-count="company"]').textContent = `(${allResults.company.length})`;
    document.querySelector('[data-count="user"]').textContent = `(${allResults.user.length})`;
    loading.classList.add('hidden');
    content.classList.remove('hidden');
    render();
  } catch {
    loading.innerHTML = '<span class="text-rose-300">Não foi possível carregar os resultados.</span>';
  }
}

search();
