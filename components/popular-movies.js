import { cacheManager } from '../utils/cache.js';
import { getFavorites, addFavorite, removeFavorite } from '../utils/auth.js';

export class PopularMovies extends HTMLElement {
  constructor() {
    super();
    this.API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';
    this.currentLanguage = "pt-BR";
    this.type = this.getAttribute('data-type') === 'tv' ? 'tv' : 'movie';
    this.featuredMovie = null;
    this.isSavingFavorite = false;
    // Removed this.convertID as it's not needed as a property
  }

  connectedCallback() {
    this.render();
    this.getData();
    this.initEventListeners();
  }

  render() {
    this.innerHTML = `
        <section class="hero-banner relative isolate min-h-[570px] w-full overflow-hidden bg-slate-950 md:min-h-[640px]">
            <div class="absolute inset-0 overflow-hidden">
                <img id="movie-image" alt="" src="" class="hero-backdrop-image absolute inset-0 h-full w-full object-cover object-center" />
                <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/10"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-slate-950/25"></div>
            </div>

            <div class="relative z-10 mx-auto flex min-h-[570px] w-full max-w-6xl items-end px-4 pb-16 pt-24 md:min-h-[640px] md:items-center md:pb-10">
                <div class="hero-content max-w-xl">
                    <h1 id="movie-title" class="hero-title max-w-2xl font-['Bebas_Neue'] text-5xl leading-none tracking-wide text-white drop-shadow-2xl md:text-7xl"></h1>

                    <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-200">
                        <span class="inline-flex items-center gap-2 text-slate-100">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1280px-IMDB_Logo_2016.svg.png" class="h-5 w-auto" alt="IMDb">
                            <span id="movie-rating" class="font-bold"></span>
                        </span>
                        <span class="text-slate-400">•</span>
                        <span id="movie-release-date"></span>
                        <span class="text-slate-400">•</span>
                        <span class="movie-category"></span>
                    </div>

                    <p id="movie-overview" class="mt-5 line-clamp-3 max-w-lg text-sm leading-6 text-slate-200 drop-shadow-md md:text-base md:leading-7"></p>

                    <div class="mt-7 flex flex-wrap gap-3">
                        <a id="movie-details-link" href="#" class="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 hover:shadow-yellow-400/30">
                            <i class="fa-solid fa-circle-info text-xs"></i> Detalhes
                        </a>
                        <button id="movie-favorite-button" type="button" class="inline-flex items-center gap-2 rounded-md border border-white/35 bg-slate-950/45 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/15">
                            <i id="movie-favorite-icon" class="fa-solid fa-plus text-xs"></i><span id="movie-favorite-label">Minha lista</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>`;
  }

  initEventListeners() {
    this.querySelector('#movie-favorite-button').addEventListener('click', () => this.toggleFeaturedFavorite());

    document.addEventListener('languageChange', (event) => {
      this.handleLanguageChange(event.detail.language);
      console.log("Language changed to:", event.detail.language);
    });
  }

  async getData() {
    // Verifica se há dados em cache primeiro
    const cacheKey = cacheManager.generateKey(`popular_${this.type}`, {
      language: this.currentLanguage,
      page: 1,
    });

    let data = cacheManager.get(cacheKey);

    if (!data) {
      console.log(`Buscando ${this.type === 'tv' ? 'séries' : 'filmes'} populares da API...`);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${this.type}/popular?api_key=${this.API_KEY_TMDB}&language=${this.currentLanguage}&page=1`
        );
        data = await response.json();

        // Armazena no cache por 1 hora (filmes populares mudam menos frequentemente)
        cacheManager.set(cacheKey, data, 60 * 60 * 1000);
        console.log('Filmes populares armazenados no cache');
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
        return;
      }
    } else {
      console.log('Filmes populares carregados do cache');
    }

    console.log(`DATA POPULAR ${this.type.toUpperCase()} >>> `, data);
    // Mantém o destaque alinhado com o carrossel: ignora resultados sem pôster,
    // adultos ou com pouca votação antes de escolher o primeiro título.
    const filme = data.results.find((item) =>
      item.poster_path && item.adult === false && item.vote_average > 5 && item.vote_count > 100
    ) || data.results[0];
    if (!filme) return;

    // Get detailed movie info to access genres
    const detailsResponse = await fetch(
      `https://api.themoviedb.org/3/${this.type}/${filme.id}?api_key=${this.API_KEY_TMDB}&language=${this.currentLanguage}`
    );
    const movieDetails = await detailsResponse.json();

    const movieTitle = this.querySelector('#movie-title');
    const movieOverview = this.querySelector('#movie-overview');
    const movieImage = this.querySelector('#movie-image');
    const movieDate = this.querySelector('#movie-release-date');
    const movieRating = this.querySelector('#movie-rating');
    const movieCategory = this.querySelector('.movie-category');
    const movieDetailsLink = this.querySelector('#movie-details-link');

    this.featuredMovie = filme;
    movieImage.src = `https://image.tmdb.org/t/p/w1280${filme.backdrop_path || filme.poster_path}`;
    movieImage.alt = `Imagem de destaque de ${filme.title || filme.name}`;
    movieTitle.textContent = filme.title || filme.name;
    movieOverview.textContent = filme.overview;
    movieDate.textContent = (filme.release_date || filme.first_air_date)?.slice(0, 4) || 'Ano não informado';
    movieRating.textContent = `${Number(filme.vote_average || 0).toFixed(1)} / 10`;
    movieDetailsLink.href = `/movie-details.html?id=${filme.id}${this.type === 'tv' ? '-serie' : ''}`;

    // Use the detailed movie data to get genre names
    if (movieDetails.genres && movieDetails.genres.length > 0) {
      const firstGenre = movieDetails.genres[0].name;
      movieCategory.textContent = firstGenre;
    }

    await this.updateFavoriteButton();
  }

  async updateFavoriteButton() {
    if (!this.featuredMovie) return;

    const favorites = await getFavorites();
    const favorite = favorites.some((item) => (item.movieId ?? item.id) === this.featuredMovie.id && Boolean(item.ehSerie) === (this.type === 'tv'));
    const button = this.querySelector('#movie-favorite-button');
    const icon = this.querySelector('#movie-favorite-icon');
    const label = this.querySelector('#movie-favorite-label');

    button.classList.toggle('border-yellow-400/60', favorite);
    button.classList.toggle('text-yellow-300', favorite);
    icon.className = favorite ? 'fa-solid fa-check text-xs' : 'fa-solid fa-plus text-xs';
    label.textContent = favorite ? 'Na minha lista' : 'Minha lista';
    button.setAttribute('aria-label', favorite ? 'Remover da minha lista' : 'Adicionar à minha lista');
  }

  async toggleFeaturedFavorite() {
    if (!this.featuredMovie || this.isSavingFavorite) return;

    this.isSavingFavorite = true;
    const button = this.querySelector('#movie-favorite-button');
    button.disabled = true;

    try {
      const favorites = await getFavorites();
      const isSeries = this.type === 'tv';
      const favorite = favorites.some((item) => (item.movieId ?? item.id) === this.featuredMovie.id && Boolean(item.ehSerie) === isSeries);

      if (favorite) {
        await removeFavorite(this.featuredMovie.id);
      } else {
        await addFavorite(this.featuredMovie.id, isSeries, {
          title: this.featuredMovie.title || this.featuredMovie.name,
          posterPath: this.featuredMovie.poster_path,
        });
      }

      await this.updateFavoriteButton();

      const counter = document.getElementById('contador-favoritos');
      if (counter) {
        const updatedFavorites = await getFavorites();
        counter.textContent = updatedFavorites.length || '';
        counter.classList.toggle('bg-transparent', updatedFavorites.length === 0);
        counter.classList.toggle('bg-red-500', updatedFavorites.length > 0);
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos do destaque:', error);
    } finally {
      this.isSavingFavorite = false;
      button.disabled = false;
    }
  }

  convertID(genreId) {
    const genreMap = {
      28: "Ação",
      12: "Aventura",
      16: "Animação",
      35: "Comédia",
      80: "Crime",
      99: "Documentário",
      18: "Drama",
      10751: "Família",
      14: "Fantasia",
      36: "História",
      27: "Terror",
      10402: "Música",
      9648: "Mistério",
      10749: "Romance",
      878: "Ficção científica",
      10770: "Cinema TV",
      53: "Thriller",
      10752: "Guerra",
      37: "Faroeste"
    };

    return genreMap[genreId] || "Desconhecido";
  }

  handleLanguageChange(languageCode) {
    const newLanguage = languageCode;

    if (this.currentLanguage !== newLanguage) {
      this.currentLanguage = newLanguage;
      this.getData();
    }
  }
}

customElements.define('popular-movies', PopularMovies);
