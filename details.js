import { API_KEY_TMDB } from "./keys";
let currentLanguage = 'pt-BR'

const movieTitle = document.getElementById('movie-title');
const movieOvervew = document.getElementById('movie-overview');
const movieImage = document.getElementById('movie-image');
const movieDate = document.getElementById('movie-release-date');
const movieRating = document.getElementById('movie-rating');
const movieImdb = document.getElementById('movie-imdb');
const movieGeners = document.getElementById('movie-geners');
const MovieCategory = document.querySelector('.movie-category');
const MovieTrailer = document.getElementById('movie-trailer');
const serieSeason = document.getElementById('temporadas'); 
const divDropdown = document.getElementById('ListaTemporadas');
const DivTemporadas = document.getElementById('SerieDiv')

const urlParams = new URLSearchParams(window.location.search);
const movieIdRaw = urlParams.get('id');
const ehSerie = movieIdRaw && movieIdRaw.endsWith('-serie');
const movieId = ehSerie ? movieIdRaw.replace('-serie', '') : movieIdRaw;

console.log('MOVIE ID >>>', movieId);
console.log('IS SERIE >>>', ehSerie);


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

function formatarData(data){
  if(!data) return '-';

  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;

}


async function loadDetails() {
  try {

    let response;

    if(ehSerie == true){
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
    movieDate.innerHTML = filme.release_date ? formatarData(filme.release_date) : `Lançamento: ${formatarData(filme.first_air_date)} <br> Ultimo EP: ${formatarData(filme.last_air_date)}`;
    movieRating.textContent = `${Number(filme.vote_average).toFixed(1)} / 10 `;
    movieImdb.href = `https://www.imdb.com/title/${filme.imdb_id}`;
    movieGeners.innerHTML = filme.genres.map((genre) => `<span class="badge">${genre.name}</span>`).join(' ');

    MovieCategory.textContent = `${ehSerie ? "Series" : "Filmes"} de ${filme.genres[0].name}`;

    console.log("DADOS DO FILMEEEE:::::", filme)
    if(ehSerie){

      divDropdown.innerHTML = filme.seasons.map((temporadas) => {
        if(!temporadas.air_date || !temporadas.poster_path || !temporadas.name ) return '';
          
        return `
              <li>
                <p class="block px-4 py-2 hover:bg-white/10 hover:text-white transition-colors">${temporadas.name}</p>
              </li>
        `
      }).join(' ');
    }

    
  if(ehSerie){
    DivTemporadas.classList.remove("hidden");
    serieSeason.classList.add("flex");

    const temporada = filme.seasons[0];
    
     loadEpisodes(filme.id, temporada);

    divDropdown.addEventListener('click', (e) => {
        if(e.target.tagName === 'P'){
          const nomeTemporada = e.target.textContent;
          const temporadaSelecionada = filme.seasons.find((temp) => temp.name === nomeTemporada);

          if(temporadaSelecionada){
            loadEpisodes(filme.id, temporadaSelecionada);
          }
        }
      })

    }else{
      serieSeason.classList.add("hidden")
    }
    updateCarousel(filme.genres[0]);
  } catch (error) {
    console.error('Erro ao carregar detalhes do filme:', error);
    document.body.innerHTML = `<p class="text-red-500">Erro ao carregar detalhes do filme.</p>`;
    return;
  }
  

}


  




function updateCarousel(genre) {
  console.log('Gênero para o carrossel:', genre);

  const waitForCarousel = () => {
    const carousel = document.querySelector('movie-carousel');
    if (carousel) {
      if( ehSerie ){
        carousel.setAttribute('data-category-serie', genre.id);
      } else {
        carousel.setAttribute('data-category', genre.id);
      }

      if (carousel.loadMoviesByCategory) {
        carousel.loadMoviesByCategory(genre.id, ehSerie);
      }
    } else {
      setTimeout(waitForCarousel, 100);
    }
  };

  waitForCarousel();
}

async function loadTrailer() {

  let type = ehSerie ? 'tv' : 'movie';
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=${API_KEY_TMDB}&language=${currentLanguage}`
    );
    const data = await response.json();
    const videos = data.results;

    console.log('Dados do FILME >>>', videos);

    const trailer = videos[videos.length - 1].key

    console.log('Trailer KEY >>>', trailer);

    if(!trailer) {
      return
    }

    MovieTrailer.innerHTML = `
    <div class="m-8 max-md:m-0 rounded-lg overflow-hidden flex items-center justify-center">
      <iframe width="860" class="w-full max-md:h-[270px]" height="415" src="https://www.youtube.com/embed/${trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
      `
    
    } catch (error) {
    console.warn('Trailer não encontrado');
  }
}


async function loadEpisodes(filmeID, temporada) {
  try {
        // const temporada = filme.seasons[0];

        if(!temporada.air_date || !temporada.poster_path || !temporada.name ) return '';

        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${filmeID}/season/${temporada.season_number}?api_key=${API_KEY_TMDB}&language=${currentLanguage}`
        );

        
        const data = await response.json();
        const ep = data.episodes;
        const promessasEp = ep.map(async (episodio) => {
          
          // TRAZER FORMATO DE LISTA PARA AS TEMPORADAS
          return `
          <div class="card-ep">
              <span class="badge font-semibold text-lg justify-center mb-2 flex w-full">${episodio.name}</span>
              <img src="https://image.tmdb.org/t/p/w500/${episodio.still_path}" alt="${episodio.name}" class="h-80 max-md:!h-40 w-full object-cover rounded-lg">
              <span>${episodio.name}</span>
          </div>`;

        })


      // 3. Esperamos TODAS as promessas do map() terminarem
      const epHtmlArray = await Promise.all(promessasEp);

      // 4. Agora sim, juntamos o array de strings e jogamos na tela
      serieSeason.innerHTML = epHtmlArray.join(' ');

    } catch (error) {
        console.error('Erro ao carregar detalhes da serie:', error);
        document.body.innerHTML = `<p class="text-red-500">Erro ao carregar detalhes da série.</p>`;
        return;
    }
  }  
  

if (movieId) {
  loadDetails();
  loadTrailer();
}