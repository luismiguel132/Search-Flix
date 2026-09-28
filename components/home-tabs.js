const TV_CATEGORIES = new Set(['popular-series', 'top-rated-series', 'airing-today']);

class HomeMediaTabs extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupSections();
    this.setupEvents();
  }

  render() {
    this.innerHTML = `
      <div class="mx-auto mb-10 flex w-full max-w-2xl items-center rounded-2xl border border-slate-700 bg-slate-800/90 p-1.5 shadow-xl shadow-black/10 backdrop-blur-sm" role="tablist" aria-label="Filtrar conteúdo">
        <button type="button" role="tab" aria-selected="true" data-filter="all" class="home-tab flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg transition duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 sm:text-base"><i class="fa-solid fa-layer-group text-xs"></i>Todos</button>
        <button type="button" role="tab" aria-selected="false" data-filter="movie" class="home-tab flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 transition duration-200 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70 sm:text-base"><i class="fa-solid fa-film text-xs"></i>Filmes</button>
        <button type="button" role="tab" aria-selected="false" data-filter="tv" class="home-tab flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 transition duration-200 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70 sm:text-base"><i class="fa-solid fa-tv text-xs"></i>Séries</button>
      </div>`;
  }

  setupSections() {
    document.querySelectorAll('movie-carousel').forEach((carousel) => {
      const category = carousel.dataset.category;
      const type = carousel.hasAttribute('data-category-serie') || TV_CATEGORIES.has(category)
        ? 'tv'
        : 'movie';
      const section = carousel.closest('.mb-10');
      if (section) section.dataset.mediaType = type;
    });
  }

  setupEvents() {
    this.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => this.select(button.dataset.filter));
    });
  }

  select(filter) {
    this.querySelectorAll('[data-filter]').forEach((button) => {
      const active = button.dataset.filter === filter;
      button.setAttribute('aria-selected', String(active));
      button.classList.toggle('bg-white', active);
      button.classList.toggle('text-slate-900', active);
      button.classList.toggle('shadow-md', active);
      button.classList.toggle('text-slate-300', !active);
    });

    const featuredMovies = document.getElementById('featured-movies');
    const featuredSeries = document.getElementById('featured-series');
    featuredMovies?.classList.toggle('hidden', filter === 'tv');
    featuredSeries?.classList.toggle('hidden', filter !== 'tv');

    document.querySelectorAll('[data-media-type]').forEach((section) => {
      if (section === featuredMovies || section === featuredSeries) return;
      const visible = section.dataset.featured === 'series'
        ? filter === 'tv'
        : section.dataset.featured === 'movie'
          ? filter !== 'tv'
          : filter === 'all' || section.dataset.mediaType === filter;
      section.classList.toggle('hidden', !visible);
    });
  }
}

if (!customElements.get('home-media-tabs')) {
  customElements.define('home-media-tabs', HomeMediaTabs);
}
