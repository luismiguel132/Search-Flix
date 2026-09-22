import { API_KEY_TMDB } from '../keys.js';

export class BarraDePesquisa extends HTMLElement {
  constructor() {
    super();
    this.searchRequestId = 0;
  }

  connectedCallback() {
    this.render(); 4
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="relative">
        <div class="flex">
          <input autocomplete="off" type="search" id="search-movies" placeholder="Pesquisar filmes, séries ou usuários"
            class="flex-1 w-[180px] md:w-[400px] rounded-l-lg border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary" />
          <button id="request-api" type="button" aria-label="Pesquisar" class="bg-blue-500 rounded-r-lg px-4 py-2 text-black transition-colors hover:bg-blue-600">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div id="suggestions" class="absolute left-0 top-[calc(100%+6px)] z-[100] hidden w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-slate-900 shadow-2xl md:w-[520px]"></div>
      </div>`;
  }

  setupEventListeners() {
    const input = this.querySelector('#search-movies');
    const button = this.querySelector('#request-api');
    const suggestions = this.querySelector('#suggestions');

    button.addEventListener('click', () => this.dispatchSearchEvent(input.value));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.dispatchSearchEvent(input.value);
      }
      if (event.key === 'Escape') suggestions.classList.add('hidden');
    });

    let debounce;
    input.addEventListener('input', () => {
      clearTimeout(debounce);
      const term = input.value.trim();
      if (term.length < 2) {
        suggestions.classList.add('hidden');
        return;
      }
      debounce = setTimeout(() => this.loadSuggestions(term), 250);
    });

    document.addEventListener('click', (event) => {
      if (!this.contains(event.target)) suggestions.classList.add('hidden');
    });
  }

  async loadSuggestions(term) {
    const suggestions = this.querySelector('#suggestions');
    const requestId = ++this.searchRequestId;
    suggestions.classList.remove('hidden');
    suggestions.innerHTML = '<div class="px-4 py-4 text-sm text-slate-500"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Buscando...</div>';

    try {
      const [tmdbResponse, usersResponse, companiesResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(term)}&language=pt-BR&include_adult=false`),
        fetch(`/api/users?search=${encodeURIComponent(term)}`),
        fetch(`https://api.themoviedb.org/3/search/company?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(term)}&page=1`),
      ]);
      const tmdb = await tmdbResponse.json();
      const usersData = await usersResponse.json().catch(() => ({ users: [] }));
      const companiesData = await companiesResponse.json().catch(() => ({ results: [] }));
      if (requestId !== this.searchRequestId) return;

      const movies = (tmdb.results || []).filter(item => item.media_type === 'movie').slice(0, 3);
      const series = (tmdb.results || []).filter(item => item.media_type === 'tv').slice(0, 3);
      const users = (usersData.users || []).slice(0, 3);
      const companies = (companiesData.results || []).slice(0, 3);
      suggestions.innerHTML = this.renderSuggestionGroups(movies, series, companies, users);
      this.bindSuggestionEvents();
    } catch {
      suggestions.innerHTML = '<div class="px-4 py-4 text-sm text-rose-500">Não foi possível carregar sugestões.</div>';
    }
  }

  renderSuggestionGroups(movies, series, companies, users) {
    const group = (title, icon, items, renderer) => items.length
      ? `<div class="border-b border-slate-100 last:border-0"><p class="px-4 pt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400"><i class="${icon} mr-2"></i>${title}</p>${items.map(renderer).join('')}</div>`
      : '';
    const mediaItem = item => `<button type="button" class="suggestion-media flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-slate-100" data-id="${item.id}" data-type="${item.media_type}"><img src="${item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : 'https://via.placeholder.com/46x64/e2e8f0/64748b?text=—'}" class="h-10 w-8 rounded object-cover" alt=""><span class="min-w-0 flex-1 truncate text-sm font-medium">${this.escape(item.title || item.name)}</span><span class="text-xs text-slate-400">${item.media_type === 'tv' ? 'Série' : 'Filme'}</span></button>`;
    const userItem = user => `<button type="button" class="suggestion-user flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-slate-100" data-user-id="${user.id}"><span class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-yellow-400 text-xs font-bold text-black">${user.avatarUrl ? `<img src="${user.avatarUrl}" class="h-full w-full object-cover" alt="">` : this.escape((user.name || 'SF').slice(0, 2).toUpperCase())}</span><span class="truncate text-sm font-medium">${this.escape(user.name || 'Usuário')}</span><span class="ml-auto text-xs text-slate-400">Usuário</span></button>`;
    const companyItem = company => `<button type="button" class="suggestion-company flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-slate-100" data-company-name="${this.escape(company.name)}"><span class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-600"><i class="fa-solid fa-building"></i></span><span class="truncate text-sm font-medium">${this.escape(company.name)}</span><span class="ml-auto text-xs text-slate-400">Companhia</span></button>`;
    const html = group('Filmes', 'fa-solid fa-film', movies, mediaItem) + group('Séries', 'fa-solid fa-tv', series, mediaItem) + group('Companhias', 'fa-solid fa-building', companies, companyItem) + group('Usuários', 'fa-solid fa-user', users, userItem);
    return html || '<div class="px-4 py-4 text-sm text-slate-500">Nenhuma sugestão encontrada.</div>';
  }

  bindSuggestionEvents() {
    this.querySelectorAll('.suggestion-media').forEach(item => item.addEventListener('click', () => {
      const query = item.dataset.type === 'tv' ? `${item.dataset.id}-serie` : item.dataset.id;
      window.location.href = `/movie-details.html?id=${query}`;
    }));
    this.querySelectorAll('.suggestion-user').forEach(item => item.addEventListener('click', () => {
      window.location.href = `/profile.html?userId=${item.dataset.userId}`;
    }));
    this.querySelectorAll('.suggestion-company').forEach(item => item.addEventListener('click', () => {
      window.location.href = `/search-results.html?q=${encodeURIComponent(item.dataset.companyName)}`;
    }));
  }

  escape(value) {
    const element = document.createElement('div');
    element.textContent = String(value ?? '');
    return element.innerHTML;
  }

  dispatchSearchEvent(searchTerm) {
    const term = searchTerm.trim();
    if (!term) return;
    this.querySelector('#suggestions').classList.add('hidden');
    window.location.href = `/search-results.html?q=${encodeURIComponent(term)}`;
  }
}

if (!customElements.get('barra-de-pesquisa')) {
  customElements.define('barra-de-pesquisa', BarraDePesquisa);
}
