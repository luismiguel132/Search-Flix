import { API_KEY_TMDB } from '../keys.js';

export class SpotlightBanner extends HTMLElement {
  static trendingPromise = null;

  connectedCallback() {
    this.render();
    this.loadSpotlight();
  }

  render() {
    this.innerHTML = `
      <section class="spotlight-banner relative isolate my-14 min-h-[290px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 md:min-h-[330px]">
        <div class="absolute inset-0">
          <img data-spotlight-image src="" alt="" class="spotlight-image h-full w-full object-cover object-center opacity-60">
          <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/20"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
        </div>

        <div class="relative z-10 flex min-h-[290px] items-end p-5 md:min-h-[330px] md:items-center md:p-8">
          <div class="spotlight-content max-w-xl">
            <div class="mb-3 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
              <span><i class="fa-solid fa-fire mr-2"></i>Em alta agora</span>
              <span data-spotlight-type class="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 tracking-normal text-slate-200"></span>
            </div>
            <h2 data-spotlight-title class="text-3xl font-bold leading-tight text-white md:text-4xl"></h2>
            <div data-spotlight-meta class="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300"></div>
            <p data-spotlight-overview class="mt-3 line-clamp-2 max-w-lg text-sm leading-6 text-slate-200"></p>
            <a data-spotlight-link href="#" class="mt-5 inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-300">
              Ver detalhes <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        </div>
      </section>`;
  }

  async loadSpotlight() {
    try {
      if (!SpotlightBanner.trendingPromise) {
        SpotlightBanner.trendingPromise = fetch(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY_TMDB}&language=pt-BR`
        ).then((response) => response.json());
      }

      const data = await SpotlightBanner.trendingPromise;
      const titles = (data.results || []).filter((item) =>
        item.media_type === 'movie' || item.media_type === 'tv'
      );
      const slot = Number(this.dataset.slot || 0);
      const item = titles[slot % titles.length];
      if (!item) return;

      const isSeries = item.media_type === 'tv';
      const details = isSeries ? await this.fetchDetails(item.id) : item;
      const title = item.title || item.name || 'Título em destaque';
      const year = (item.release_date || item.first_air_date || '').slice(0, 4);
      const rating = Number(item.vote_average || 0).toFixed(1);
      const meta = isSeries
        ? `Temporada ${details.number_of_seasons || 1} · ${details.number_of_episodes || 0} episódios`
        : `${year || 'Ano não informado'} · Nota ${rating}`;

      const image = this.querySelector('[data-spotlight-image]');
      image.src = `https://image.tmdb.org/t/p/w780${item.backdrop_path || item.poster_path || ''}`;
      image.alt = `Imagem de ${title}`;
      this.querySelector('[data-spotlight-type]').textContent = isSeries ? 'Série' : 'Filme';
      this.querySelector('[data-spotlight-title]').textContent = title;
      this.querySelector('[data-spotlight-meta]').innerHTML = `<span class="text-emerald-400">${rating} ⭐</span><span>${meta}</span>`;
      this.querySelector('[data-spotlight-overview]').textContent = item.overview || 'Descubra mais sobre este título em destaque.';
      this.querySelector('[data-spotlight-link]').href = `/movie-details.html?id=${item.id}${isSeries ? '-serie' : ''}`;
      this.querySelector('.spotlight-banner').classList.add('is-loaded');
    } catch (error) {
      console.error('Erro ao carregar destaque secundário:', error);
    }
  }

  async fetchDetails(id) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY_TMDB}&language=pt-BR`);
    return response.json();
  }
}

customElements.define('spotlight-banner', SpotlightBanner);
