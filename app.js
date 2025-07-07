let API_KEY = '63e0857';
let API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';

const domRequestApi = document.getElementById('request-api');
const domMovieTitle = document.getElementById('movie-title');
const domMoviePoster = document.getElementById('movie-poster');
const domMovieImdb = document.getElementById('movie-imdb');
const domMovieActors = document.getElementById('actors');
const domSearchMovies = document.getElementById('search-movies');
const categoryButtons = document.querySelectorAll('.category-btn');
const domCategoryTitle = document.getElementById('category-title');
const domMoviesContainer = document.getElementById('movies-container');
const domLanguageSelect = document.getElementById('select-language');


let currentSort = "vote_average.desc";

domLanguageSelect.addEventListener('change', () => {
  const selectedLanguage = domLanguageSelect.value;
  loadMoviesByCategory('28', selectedLanguage);
});

domRequestApi.addEventListener('click', () => {
  searchMovie();
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    const currentLanguage = domLanguageSelect.value;
    loadMoviesByCategory(category, currentLanguage);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const initialLanguage = domLanguageSelect.value;
  loadMoviesByCategory('28', initialLanguage);
});

async function searchMovie() {
  let searchMovies = domSearchMovies.value.trim();
  if (!searchMovies) return;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(searchMovies)}`
    );
    const data = await response.json();

    if (data.Response === "False") {
      domMovieTitle.textContent = "Filme não encontrado.";
      domMoviePoster.src = "";
      domMovieImdb.textContent = "";
      domMovieActors.textContent = "";
      return;
    }

    domMovieImdb.textContent = `IMDB: ${data.imdbRating}/10`;
    domMovieTitle.textContent = data.Title;
    domMoviePoster.src = data.Poster;
    domMoviePoster.alt = data.Title;
    domMovieActors.textContent = `Atores: ${data.Actors}`;
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
  }
}

async function loadMoviesByCategory(category, language = 'pt-BR') {
  const categoryNames = {
    28: 'Ação', 12: 'Aventura', 16: 'Animação', 35: 'Comédia', 80: 'Crime',
    99: 'Documentário', 18: 'Drama', 10749: 'Romance', 53: 'Suspense',
    10752: 'Guerra', 37: 'Faroeste', 10751: 'Família', 14: 'Fantasia',
  };

  categoryButtons.forEach((button) => {
    button.classList.toggle('active', button.getAttribute('data-category') === category);
  });

  domCategoryTitle.textContent = `Filmes de ${categoryNames[category] || "Categoria"}`;
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

    domMoviesContainer.innerHTML = "";
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
  if (!movie.poster_path || movie.vote_count < 500) return null;

  const movieItem = document.createElement('a');
  movieItem.className = 'movie-item m-5 bg-gray-800 rounded-lg flex flex-col items-center p-4 transition-transform hover:scale-105 duration-300 cursor-pointer';
  movieItem.href = 'movie-details.html?id=' + movie.id; // Use movie.id for the link

  movieItem.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="h-96 max-w-64 object-cover rounded-lg">
    <h3 class="text-white text-xl pt-4 text-center">${movie.title}</h3>
    <p class="text-sm text-gray-400 mt-2">Ano: ${movie.release_date?.slice(0, 4) || 'N/A'}</p>
    <p class="text-yellow-400 font-bold mt-1">⭐ ${Number(movie.vote_average).toFixed(1)} | 🗳️ ${movie.vote_count}</p>
  `;

  console.log('Movie Item:', movieItem);

  return movieItem;
}
