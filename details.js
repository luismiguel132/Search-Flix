let API_KEY = '63e0857';
let API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';
let currentLanguage = 'pt-BR'

const movieTitle = document.getElementById('movie-title');
const movieOvervew = document.getElementById('movie-overview');
const movieImage = document.getElementById('movie-image');
const movieDate = document.getElementById('movie-release-date');
const movieRating = document.getElementById('movie-rating');
const movieImdb = document.getElementById('movie-imdb');
const movieGeners = document.getElementById('movie-geners');
const MovieCategory = document.querySelector('.movie-category');
const MovieTrailer = document.getElementById('movie-trailer') 

const urlParams = new URLSearchParams(window.location.search);
const movieIdRaw = urlParams.get('id');
const isSerie = movieIdRaw && movieIdRaw.endsWith('-serie');
const movieId = isSerie ? movieIdRaw.replace('-serie', '') : movieIdRaw;

console.log('MOVIE ID >>>', movieId);
console.log('IS SERIE >>>', isSerie);


document.addEventListener('languageChange', (event) => {
  handleLanguageChange(event.detail.language)
})

function handleLanguageChange(languageCode){
  const newLanguage = languageCode;

  if(currentLanguage !== newLanguage){
    currentLanguage = newLanguage;
    
    loadDetails()
  }
};


async function loadDetails() {
  try {

    let response;

    if(isSerie == true){
        response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY_TMDB}&language=${currentLanguage}`
      );
    } else {
      response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_TMDB}&language=${currentLanguage}`)
    }

    

    const filme = await response.json();

    console.log('Detalhes do FILME >>>', filme);

    movieImage.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`;
    movieTitle.textContent = filme.title ? filme.title : filme.name;
    movieOvervew.textContent = filme.overview;
    movieDate.textContent = filme.release_date;
    movieRating.textContent = `${Number(filme.vote_average).toFixed(1)} / 10 `;
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

async function loadTrailer() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY_TMDB}&language=${currentLanguage}`
    );
    const data = await response.json();
    const videos = data.results;

    console.log('Dados do FILME >>>', videos);

    const trailer = videos[0].key

    console.log('Trailer KEY >>>', trailer);

    if(!trailer) {
      return
    }

    MovieTrailer.innerHTML = `
    <div class="m-8 rounded-lg overflow-hidden flex items-center justify-center">
      <iframe width="860" class="w-full" height="415" src="https://www.youtube.com/embed/${trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
      `
    
    } catch (error) {
    console.warn('Trailer não encontrado');
  }
}


if (movieId) {
  loadDetails();
  loadTrailer();
}


