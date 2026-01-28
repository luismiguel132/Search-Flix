import { cacheManager } from '../utils/cache.js';
const urlParams = new URLSearchParams(window.location.search);
const movieIdRaw = urlParams.get('id');
const isSerie = movieIdRaw && movieIdRaw.endsWith('-serie');
export class Carousel extends HTMLElement {

  constructor() {
    super();
    this.scrollAmount = 0;
    this.scrollStep = 500;
    this.API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';
    this.containerId = `movies-container-${Math.random().toString(36).substr(2, 9)}`;
    this.currentLanguage = 'pt-BR'

  }

  connectedCallback() {
    this.render();
    this.initControls();
    this.initEventListeners();
    //this.adicionarFilmeLista()
  }

  render() {
    this.innerHTML = `
        <div class="relative overflow-hidden" id="movies-carousel">
            <div class="relative h-full overflow-hidden rounded-lg">
            <div class="flex transition-transform duration-500 ease-in-out" id="${this.containerId}">
                <!-- Movies will be added here -->
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
    </button>`;

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

    let category = this.getAttribute('data-category-serie') || this.getAttribute('data-category');

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
      isSerie: existeCategoriaSerie
    });

    let data = cacheManager.get(cacheKey);

    if (!data) {
      console.log(`Buscando filmes da categoria ${category} da API...`);
      container.innerHTML = `<p class="text-white">Carregando...</p>`;

      console.log("CATEGORY >>", category);

      let response = null;

      try {
        if(category !== "popular" && category !== "popular-series" && !existeCategoriaSerie) {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY_TMDB}&with_genres=${category}&language=${language}&sort_by=${currentSort}&page=1`
          );
        } else if(category == "popular-series") {
          
          response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${this.API_KEY_TMDB}&language=${this.currentLanguage}&page=1`
          )

        } else if (existeCategoriaSerie){
            response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${this.API_KEY_TMDB}&with_genres=${category}&language=${language}&sort_by=${currentSort}&page=1`
          );
        } else {
          response = await fetch(
              `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY_TMDB}&language=${this.currentLanguage}&page=1`
            );
        }

        //     --url 'https://api.themoviedb.org/3/tv/popular?api_key=${this.API_KEY_TMDB}${this.currentLanguage}&page=1'
        
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
      if (movie.poster_path) {
        const card = this.createMovieCard(movie);
        if (card) container.appendChild(card);
      }
    });
  }

    adicionarFilmeLista(movieId){

      console.log("MOVIE ID >>", movieId)
      const filmesSalvosString = localStorage.getItem('filmes-favoritos');

      let filmesFavoritos = JSON.parse(filmesSalvosString) || [];

      filmesFavoritos.push(movieId);
      localStorage.setItem('filmes-favoritos', JSON.stringify(filmesFavoritos));

      console.log("LISTA ATUALIZADA NO LOCALSTORAGE >>>", JSON.stringify(filmesFavoritos));
  }

  createMovieCard(movie) {
    const movieItem = document.createElement('a');
    movieItem.className =
  'relative movie-item flex-none w-[250px] mx-2 bg-gray-800 rounded-lg flex flex-col items-center p-4 transition-transform hover:scale-105 duration-300 cursor-pointer overflow-hidden';
    
    movieItem.href = 'movie-details.html?id=' + movie.id + `${movie.name ? "-serie" : ""}`;

    movieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
      movie.title
    }" class="h-64 w-full object-cover rounded-lg">
        <h3 class="text-white text-lg pt-4 text-center line-clamp-1">${movie.name ?? movie.title}</h3>
        <p class="text-sm text-gray-400 mt-2">Ano: ${movie.release_date?.slice(0, 4) ?? movie.first_air_date?.slice(0, 4) }</p>
        <p class="text-yellow-400 font-bold mt-1">⭐ ${Number(movie.vote_average).toFixed(
          1
        )} | 🗳️ ${movie.vote_count}</p>
  <button 
    type="button" 
    class="add-favorite-btn absolute top-2 right-2 z-2 text-black bg-white/50 p-2 rounded transition hover:bg-yellow-400 hover:text-black"
  >
    <i class="fa-regular fa-bookmark"></i>
  </button>
`;


  const favoriteButton = movieItem.querySelector('.add-favorite-btn');
  const icon = favoriteButton.querySelector('i');

  let favoritos = JSON.parse(localStorage.getItem('filmes-favoritos')) || [];

  const isFavorito = favoritos.includes(movie.id);

  if (isFavorito) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid', 'text-yellow-400');
  }

  favoriteButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    let favoritos = JSON.parse(localStorage.getItem('filmes-favoritos')) || [];

    if (favoritos.includes(movie.id)) {
      favoritos = favoritos.filter((id) => id !== movie.id);
      icon.classList.remove('fa-solid', 'text-yellow-400');
      icon.classList.add('fa-regular');
    } else {
      favoritos.push(movie.id);
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid', 'text-yellow-400');
    }

    localStorage.setItem('filmes-favoritos', JSON.stringify(favoritos));

    let contadorFilmesFavoritos = favoritos.length

    console.log("contadorFilmesFavoritos >>>", contadorFilmesFavoritos);
    const spanContador = document.getElementById("contador-favoritos")

    if(contadorFilmesFavoritos === 0){
      spanContador.innerHTML = ""
      spanContador.classList.add("bg-transparent")
    } else {
      spanContador.innerHTML = contadorFilmesFavoritos
      spanContador.classList.remove("bg-transparent")
      spanContador.classList.add("bg-red-500")

    }
  });

    return movieItem;
  }





  handleLanguageChange(languageCode){
    const newLanguage = languageCode;

    if(this.currentLanguage !== newLanguage){
      this.currentLanguage = newLanguage;

      let category = this.getAttribute('data-category-serie') || this.getAttribute('data-category');
      const existeCategoriaSerie = this.hasAttribute('data-category-serie');
      
      this.loadMoviesByCategory(category, existeCategoriaSerie)
    }
  }
}

customElements.define('movie-carousel', Carousel);
