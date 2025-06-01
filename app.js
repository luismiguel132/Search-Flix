// 25e22bc3
// https://www.omdbapi.com/?i=tt3896198&apikey=25e22bc3
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

// https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}

// https://api.themoviedb.org/3/discover/movie?api_key=e6402d1ed6e04bd84cd6a3db6ee45381&with_genres=&language=pt-BR

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

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(searchMovies)}`
    );
    const data = await response.json();
    console.log('Resposta da API', data);

    const nameMovie = data.Title;
    const moviePoster = data.Poster;
    const movieImdb = data.imdbRating;
    const movieactors = data.Actors;

    domMovieImdb.textContent = `IMDB: ${movieImdb}/10`;
    domMovieTitle.textContent = nameMovie;
    domMoviePoster.src = moviePoster;
    domMoviePoster.alt = nameMovie;
    domMovieActors.textContent = `Atores: ${movieactors}`;
  } catch (error) {
    console.error('Error fetching movie data:', error);
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
    if (button.getAttribute('data-category') === category) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  domCategoryTitle.textContent = `Filmes de ${categoryNames[category]}`;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=${category}&language=${language}&sort_by=vote_average.desc&vote_count.gte=100`
    );
    const data = await response.json();
    const movies = data.results;

    if (Array.isArray(movies) && movies.length > 0) {
      domMoviesContainer.innerHTML = '';
      movies.forEach((movie) => {
        if (!movie.poster_path) return;
        if (Number(movie.vote_count) < 5000) return;

        const movieItem = document.createElement('div');
        movieItem.classList.add(
          'movie-item',
          'm-5',
          'bg-gray-800',
          'rounded-lg',
          'flex',
          'flex-col',
          'items-center',
          'p-4'
        );
        movieItem.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="h-96 max-w-64 object-cover">
          <h3 class="text-white text-xl pt-4">${movie.title}</h3>
          <p class="text-white text-base font-bold p-1 px-2 rounded-lg">${movie.vote_count}</p>
          <p class="text-white text-base font-bold bg-yellow-500 p-1 px-2 rounded-lg">IMDB ${Number(movie.vote_average).toFixed(2)}</p>
          
        `;
        domMoviesContainer.appendChild(movieItem);
      });
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}
