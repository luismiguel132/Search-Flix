let API_KEY = '63e0857';
let API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjQwMmQxZWQ2ZTA0YmQ4NGNkNmEzZGI2ZWU0NTM4MSIsIm5iZiI6MTc0ODgwMzUyNS4wMzMsInN1YiI6IjY4M2M5ZmM1ZTc0Y2ViNWQ4YmYyYjIzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pKrTrAfKVZNcoPLJfvehdoK_jRCLeqLvAvnyt3HZwm8

const movieTitle = document.getElementById('movie-title');
const movieOvervew = document.getElementById('movie-overview');
const movieImage = document.getElementById('movie-image');
const movieDate = document.getElementById('movie-release-date');
const movieRating = document.getElementById('movie-rating');
const movieImdb = document.getElementById('movie-imdb');
const movieGeners = document.getElementById('movie-geners');
const MovieCategory = document.querySelector('.movie-category');

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

async function loadDetails() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_TMDB}`
    );

    const filme = await response.json();

    console.log('MOVIE', filme);
    console.log('Movie IMAGE:', filme.poster_path);

    movieImage.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`;
    movieTitle.textContent = filme.title;
    movieOvervew.textContent = filme.overview;
    movieDate.textContent = filme.release_date;
    movieRating.textContent = Number(filme.vote_average).toFixed(1);
    movieImdb.href = `https://www.imdb.com/title/${filme.imdb_id}`;
    movieGeners.innerHTML = filme.genres
      .map((genre) => `<span class="badge">${genre.name}</span>`)
      .join(' ');

    MovieCategory.textContent = `Filmes de ${filme.genres[0].name}`;

    updateCarousel(filme.genres[0]);
  } catch (error) {
    console.error('Erro ao carregar detalhes do filme:', error);
    document.body.innerHTML = `<p class="text-red-500">Erro ao carregar detalhes do filme.</p>`;
    return;
  }
}

function updateCarousel(genre) {
  const waitForCarousel = () => {
    const carousel = document.querySelector('movie-carousel');
    if (carousel) {
      carousel.setAttribute('data-category', genre.id);

      if (carousel.loadMoviesByCategory) {
        carousel.loadMoviesByCategory(genre.id);
      }
    } else {
      setTimeout(waitForCarousel, 100);
    }
  };

  waitForCarousel();
}

if (movieId) {
  loadDetails();
}


