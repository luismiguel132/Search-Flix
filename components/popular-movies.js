import { cacheManager } from '../utils/cache.js';

export class PopularMovies extends HTMLElement {
  constructor() {
    super();
    this.API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';
    this.currentLanguage = "pt-BR";
    // Removed this.convertID as it's not needed as a property
  }

  connectedCallback() {
    this.render();
    this.getData();
    this.initEventListeners();
  }

  render() {
    this.innerHTML = `
        <section class="relative h-[500px] w-full">
            <div class="absolute inset-0">
                <img id="movie-image" alt="Movie Poster" src="" class="md:w-[70%] h-full object-cover max-md:opacity-65" />
                <div class="absolute inset-0 md:bg-gradient-to-l md:from-black md:via-black/95 md:to-transparent"></div>
            </div>

            <div class="relative z-10 flex flex-col md:flex-row gap-6 p-6 items-center h-full">
                <div class="w-full md:w-1/2"></div>
                <div class="w-full md:w-1/2 space-y-4">

                    <h1 id="movie-title" class="text-3xl font-bold border-b text-white border-slate-700 pb-2"></h1>

                    <div class="space-y-2">
                        <div class="flex gap-3 flex-col">
                            <span id="movie-release-date" class="text-slate-400"></span>

                            <div class="flex gap-1">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1280px-IMDB_Logo_2016.svg.png" class="h-7" alt="IMDB Logo">
                                <div class="text-white px-2 py-1 rounded-md text-xl font-semibold w-fit">
                                    <span id="movie-rating"></span>
                                    <i class="fa-solid fa-star text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold mb-1 text-white">Sinopse</h3>
                        <p id="movie-overview" class="text-white leading-relaxed"></p>
                    </div>

                    <div class="movie-category text-white font-semibold"></div>

                </div>
            </div>
        </section>`;
  }

  initEventListeners() {
    document.addEventListener('languageChange', (event) => {
      this.handleLanguageChange(event.detail.language);
      console.log("Language changed to:", event.detail.language);
    });
  }

  async getData() {
    // Verifica se há dados em cache primeiro
    const cacheKey = cacheManager.generateKey('popular_movies', {
      language: this.currentLanguage,
      page: 1,
    });

    let data = cacheManager.get(cacheKey);

    if (!data) {
      console.log('Buscando filmes populares da API...');
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY_TMDB}&language=${this.currentLanguage}&page=1`
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

    console.log('DATA POPULAR MOVIE >>> ', data);
    const filme = data.results[0];

    // Get detailed movie info to access genres
    const detailsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${filme.id}?api_key=${this.API_KEY_TMDB}&language=${this.currentLanguage}`
    );
    const movieDetails = await detailsResponse.json();

    const movieTitle = document.getElementById('movie-title');
    const movieOverview = document.getElementById('movie-overview');
    const movieImage = document.getElementById('movie-image');
    const movieDate = document.getElementById('movie-release-date');
    const movieRating = document.getElementById('movie-rating');
    const movieCategory = document.querySelector('.movie-category');

    movieImage.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`;
    movieTitle.textContent = filme.title;
    movieOverview.textContent = filme.overview;
    movieDate.textContent = filme.release_date;
    movieRating.textContent = `${Number(filme.vote_average).toFixed(1)} / 10`;

    // Use the detailed movie data to get genre names
    if (movieDetails.genres && movieDetails.genres.length > 0) {
      const firstGenre = movieDetails.genres[0].name;
      movieCategory.textContent = `Filme de ${firstGenre}`;
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