let API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381'; //

// const domRequestApi = document.getElementById('request-api');
const domMovieTitle = document.getElementById('movie-title');
const domMoviePoster = document.getElementById('movie-poster');
const domMovieImdb = document.getElementById('movie-imdb');
const domMovieActors = document.getElementById('actors');
// const domSearchMovies = document.getElementById('search-movies');
const categoryButtons = document.querySelectorAll('.category-btn');
const domCategoryTitle = document.getElementById('category-title');
const domMoviesContainer = document.getElementById('movies-container');
const languageDropdown = document.querySelector('language-dropdown');

let currentSort = 'vote_average.desc';

// Ouvir o evento de mudança de idioma do componente
languageDropdown.addEventListener('languageChange', (event) => {
  const selectedLanguage = event.detail.language;
  const languageMap = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
  };
  const apiLanguage = languageMap[selectedLanguage] || 'pt-BR';

  // Encontrar o botão de categoria ativo
  const activeButton = Array.from(categoryButtons).find((button) =>
    button.classList.contains('active')
  );

  // Se houver um botão ativo, recarregar os filmes da categoria com o novo idioma
  if (activeButton) {
    const category = activeButton.getAttribute('data-category');
    loadMoviesByCategory(category, apiLanguage);
  } else {
    // Caso contrário, carregar a categoria padrão
    loadMoviesByCategory('28', apiLanguage);
  }
});

document.addEventListener('movieSearch', (event) => {
  const searchTerm = event.detail.searchTerm;
  searchMovie(searchTerm);
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    const currentLanguage = languageDropdown.currentLanguage;
    const apiLanguage =
      {
        pt: 'pt-BR',
        en: 'en-US',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
      }[currentLanguage] || 'pt-BR';

    loadMoviesByCategory(category, apiLanguage);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  loadMoviesByCategory('28', 'pt-BR');

  // Inicializar controles do carousel
  const prevButton = document.querySelector('[data-carousel-prev]');
  const nextButton = document.querySelector('[data-carousel-next]');
  const container = document.getElementById('movies-container');

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
});

async function searchMovie(searchTerm) {
  if (!searchTerm) return;

  console.log('Searching for movie:', searchTerm);

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(
        searchTerm
      )}&language=pt-BR`
    );

    const data = await response.json();
    const results = data.results[0];

    window.location.href = 'movie-details.html?id=' + results.id;

    console.log('First Result:', results);

    // if (data.Response === "False") {
    //   domMovieTitle.textContent = "Filme não encontrado.";
    //   domMoviePoster.src = "";
    //   domMovieImdb.textContent = "";
    //   domMovieActors.textContent = "";
    //   return;
    // }

    // console.log('Search Results:', results);

    // domMovieImdb.textContent = `IMDB: ${results.vote_average}/10`;
    // domMovieTitle.textContent = results.title;
    // domMoviePoster.src = `https://image.tmdb.org/t/p/w500${results.poster_path}`;
    // domMoviePoster.alt = results.title;
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
  }
}

async function loadMoviesByCategory(category, language = 'pt-BR') {
  const categoryNames = {
    28: 'Ação',
    12: 'Aventura',
    16: 'Animação',
    35: 'Comédia',
    80: 'Crime',
    99: 'Documentário',
    18: 'Drama',
    10749: 'Romance',
    53: 'Suspense',
    10752: 'Guerra',
    37: 'Faroeste',
    10751: 'Família',
    14: 'Fantasia',
  };

  categoryButtons.forEach((button) => {
    button.classList.toggle('active', button.getAttribute('data-category') === category);
  });

  domCategoryTitle.textContent = `Filmes de ${categoryNames[category] || 'Categoria'}`;
  domMoviesContainer.innerHTML = `<p class="text-white">Carregando...</p>`;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=${category}&language=${language}&sort_by=${currentSort}&vote_count.gte=100`
    );
    const data = await response.json();
    const movies = data.results;

    if (!Array.isArray(movies) || movies.length === 0) {
      domMoviesContainer.innerHTML = `<p class="text-white">Nenhum filme encontrado.</p>`;
      return;
    }

    domMoviesContainer.innerHTML = '';
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      if (card) domMoviesContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    domMoviesContainer.innerHTML = `<p class="text-red-500">Erro ao carregar filmes.</p>`;
  }
}

function createMovieCard(movie) {
  if (!movie.poster_path) return null;

  const movieItem = document.createElement('a');
  movieItem.className =
    'movie-item flex-none w-[250px] mx-2 bg-gray-800 rounded-lg flex flex-col items-center p-4 transition-transform hover:scale-105 duration-300 cursor-pointer';
  movieItem.href = 'movie-details.html?id=' + movie.id;

  movieItem.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
    movie.title
  }" class="h-64 w-full object-cover rounded-lg">
    <h3 class="text-white text-lg pt-4 text-center line-clamp-1">${movie.title}</h3>
    <p class="text-sm text-gray-400 mt-2">Ano: ${movie.release_date?.slice(0, 4) || 'N/A'}</p>
    <p class="text-yellow-400 font-bold mt-1">⭐ ${Number(movie.vote_average).toFixed(1)} | 🗳️ ${
    movie.vote_count
  }</p>
  `;

  return movieItem;
}
