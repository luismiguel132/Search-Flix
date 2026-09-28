import { API_KEY_TMDB } from "../keys";
import { cacheManager } from '../utils/cache.js';
import { getFavorites, addFavorite, removeFavorite, isLoggedIn } from '../utils/auth.js';
export class Carousel extends HTMLElement {

  constructor() {
    super();
    this.scrollAmount = 0;
    this.scrollStep = 500;
    this.containerId = `movies-container-${Math.random().toString(36).substr(2, 9)}`;
    this.currentLanguage = 'pt-BR'
  }

  connectedCallback() {
    this.render();
    this.initControls();
    this.initEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="relative overflow-hidden" id="movies-carousel">
        <div class="relative h-full overflow-hidden rounded-lg">
          <div class="flex transition-transform duration-500 ease-in-out" id="${this.containerId}">
            <!-- Filmes Serão Renderizados Aqui -->
          </div>
        </div>

        <!-- Slider controls -->
        <button type="button"
            class="absolute top-0 start-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none "
            data-carousel-prev>
            <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 1 1 5l4 4" />
            </svg>
            <span class="sr-only">Anterior</span>
            </span>
        </button>
        <button type="button"
            class="absolute top-0 end-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next>
            <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <span class="sr-only">Próximo</span>
            </span>
        </button>
      </div>`;
  }

  initControls() {
    const prevButton = this.querySelector('[data-carousel-prev]');
    const nextButton = this.querySelector('[data-carousel-next]');
    const container = this.querySelector(`#${this.containerId}`);

    if (!prevButton || !nextButton || !container) {
      console.warn('Elementos do carousel não encontrados');
      return;
    }

    let scrollAmount = 0;
    const scrollStep = 500; // Quantidade de pixels para rolar

    prevButton.addEventListener('click', () => {
      scrollAmount = Math.max(scrollAmount - scrollStep, 0);
      container.style.transform = `translateX(-${scrollAmount}px)`;
    });

    nextButton.addEventListener('click', () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
      container.style.transform = `translateX(-${scrollAmount}px)`;
    });
  }

  initEventListeners() {

    // O ID do gênero fica em data-category; data-category-serie apenas indica que é uma série.
    let category = this.getAttribute('data-category') || this.getAttribute('data-category-serie');

    let existeCategoriaSerie = this.hasAttribute('data-category-serie');

    console.log("CATEGORY  getAttribute >>>", category);
    console.log("existeCategoriaSerie >>>", existeCategoriaSerie);

    if (category) {
      this.loadMoviesByCategory(category, existeCategoriaSerie);
    }

    document.addEventListener('languageChange', (event) => {
      this.handleLanguageChange(event.detail.language)
    })
  }

  async loadMoviesByCategory(category, existeCategoriaSerie = false) {
    const container = this.querySelector(`#${this.containerId}`);
    if (!container) return;

    const language = this.currentLanguage;

    let currentSort = 'popularity.desc';

    // Verifica se há dados em cache primeiro
    const cacheKey = cacheManager.generateKey('movies_by_category', {
      category: category,
      language: language,
      sort_by: currentSort,
      page: 1,
      ehSerie: existeCategoriaSerie
    });

    let data = cacheManager.get(cacheKey);

    if (!data) {
      console.log(`Buscando filmes da categoria ${category} da API...`);
      container.innerHTML = `<p class="text-white">Carregando...</p>`;

      console.log("CATEGORY >>", category);

      let response = null;
      const curatedEndpoints = {
        'top-rated': 'movie/top_rated',
        'now-playing': 'movie/now_playing',
        'upcoming': 'movie/upcoming',
        'top-rated-series': 'tv/top_rated',
        'airing-today': 'tv/airing_today',
      };

      try {
        if (curatedEndpoints[category]) {
          response = await fetch(
            `https://api.themoviedb.org/3/${curatedEndpoints[category]}?api_key=${API_KEY_TMDB}&language=${language}&page=1`
          );
        } else if (category !== "popular" && category !== "popular-series" && !existeCategoriaSerie) {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=${category}&language=${language}&sort_by=${currentSort}&page=1`
          );
        } else if (category == "popular-series") {

          response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY_TMDB}&language=${this.currentLanguage}&page=1`
          )

        } else if (existeCategoriaSerie) {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY_TMDB}&with_genres=${category}&language=${language}&sort_by=${currentSort}&page=1`
          );
        } else {
          response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=${this.currentLanguage}&page=1`
          );
        }

        data = await response.json();

        console.log(`DATA filmes categoria ${category} >>>`, data);

        // Armazena no cache por 30 minutos (categorias mudam com menos frequência)
        cacheManager.set(cacheKey, data, 30 * 60 * 1000);
        console.log(`Filmes da categoria ${category} armazenados no cache`);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        container.innerHTML = `<p class="text-red-500">Erro ao carregar filmes.</p>`;
        return;
      }
    } else {
      console.log(`Filmes da categoria ${category} carregados do cache`);
    }

    const movies = data.results;

    if (!Array.isArray(movies) || movies.length === 0) {
      container.innerHTML = `<p class="text-white">Nenhum filme encontrado.</p>`;
      return;
    }

    container.innerHTML = '';
    movies.forEach((movie) => {
      if (movie.poster_path && movie.vote_average > 5 && movie.adult === false && movie.vote_count > 100) {
        const card = this.createMovieCard(movie);
        if (card) container.appendChild(card);
      }
    });
  }

  createMovieCard(movie) {
    const movieItem = document.createElement('a');
    movieItem.className =
      'group relative movie-item flex-none w-[220px] max-md:w-[150px] mx-2 max-md:!mx-1 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-400/70 hover:shadow-xl';

    movieItem.href = 'movie-details.html?id=' + movie.id + `${movie.name ? "-serie" : ""}`;

    movieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="${movie.name ?? movie.title
      }" class="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105">
        <div class="p-3">
        <h3 class="line-clamp-2 font-semibold text-white transition group-hover:text-yellow-400">${movie.name ?? movie.title}</h3>
        <p class="mt-1 text-xs text-slate-400">${movie.release_date?.slice(0, 4) ?? movie.first_air_date?.slice(0, 4) ?? 'Ano não informado'} · ${Number(movie.vote_average || 0).toFixed(
        1
      )}</p>
        </div>
  <button 
    type="button" 
    class="add-favorite-btn absolute right-2 top-2 z-10 rounded-lg bg-black/60 p-2 text-white transition hover:bg-yellow-400 hover:text-black"
  >
    <i class="fa-regular fa-bookmark"></i>
  </button>
`;


    const favoriteButton = movieItem.querySelector('.add-favorite-btn');
    const icon = favoriteButton.querySelector('i');
    const ehSerie = !!movie.name;

    // Verificar estado inicial do favorito
    getFavorites().then(favs => {
      const isFav = favs.some(f => (f.movieId ?? f.id) === movie.id);
      if (isFav) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'text-yellow-400');
      }
    });

    favoriteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const favs = await getFavorites();
      const isFav = favs.some(f => (f.movieId ?? f.id) === movie.id);

      if (isFav) {
        await removeFavorite(movie.id);
        icon.classList.remove('fa-solid', 'text-yellow-400');
        icon.classList.add('fa-regular');
      } else {
        await addFavorite(movie.id, ehSerie, {
          title: movie.name ?? movie.title,
          posterPath: movie.poster_path,
        });
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'text-yellow-400');
      }

      const updatedFavs = await getFavorites();
      const spanContador = document.getElementById('contador-favoritos');
      if (spanContador) {
        const count = updatedFavs.length;
        spanContador.innerHTML = count || '';
        spanContador.classList.toggle('bg-transparent', count === 0);
        spanContador.classList.toggle('bg-red-500', count > 0);
      }
    });

    return movieItem;
  }





  handleLanguageChange(languageCode) {
    const newLanguage = languageCode;

    if (this.currentLanguage !== newLanguage) {
      this.currentLanguage = newLanguage;

      let category = this.getAttribute('data-category') || this.getAttribute('data-category-serie');
      const existeCategoriaSerie = this.hasAttribute('data-category-serie');

      this.loadMoviesByCategory(category, existeCategoriaSerie)
    }
  }
}

customElements.define('movie-carousel', Carousel);
