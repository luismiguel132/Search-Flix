import { API_KEY_TMDB } from "./keys";
import { isLoggedIn } from './utils/auth.js';
import { getMovieRating, saveRating, removeRating } from './utils/ratings.js';
import { sfAlert } from './utils/modal.js';
let currentLanguage = 'pt-BR'

const movieTitle = document.getElementById('movie-title');
const movieOvervew = document.getElementById('movie-overview');
const movieImage = document.getElementById('movie-image');
const moviePoster = document.getElementById('movie-poster');
const movieDate = document.getElementById('movie-release-date');
const movieRating = document.getElementById('movie-rating');
const movieGeners = document.getElementById('movie-geners');
const MovieTrailer = document.getElementById('movie-trailer');
const trailerSection = document.getElementById('trailer-section');
const userRatingPanel = document.getElementById('user-rating-panel');
const userRatingValue = document.getElementById('user-rating-value');
const userRatingSave = document.getElementById('user-rating-save');
const userRatingRemove = document.getElementById('user-rating-remove');
const userRatingStatus = document.getElementById('user-rating-status');
const communityRating = document.getElementById('community-rating');
const watchProvidersSection = document.getElementById('watch-providers-section');
const watchProvidersLoading = document.getElementById('watch-providers-loading');
const watchProvidersList = document.getElementById('watch-providers-list');
const watchProvidersEmpty = document.getElementById('watch-providers-empty');
const watchProvidersLink = document.getElementById('watch-providers-link');
const watchProvidersRegion = document.getElementById('watch-providers-region');
const serieSeason = document.getElementById('temporadas');
let epScrollAmount = 0;
const epScrollStep = 500;
const divDropdown = document.getElementById('ListaTemporadas');
const dropdownName = document.getElementById('dropdownName')
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

function handleLanguageChange(languageCode) {
  const newLanguage = languageCode;

  if (currentLanguage !== newLanguage) {
    currentLanguage = newLanguage;

    loadDetails()
  }
};

function formatarData(data) {
  if (!data) return '-';

  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;

}


async function loadDetails() {
  try {

    let response;

    if (ehSerie == true) {
      response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY_TMDB}&language=${currentLanguage}`
      );
    } else {
      response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_TMDB}&language=${currentLanguage}`)
    }



    const filme = await response.json();

    console.log('Detalhes do FILME >>>', filme);

    movieImage.src = `https://image.tmdb.org/t/p/w1280${filme.backdrop_path || filme.poster_path}`;
    movieImage.alt = `Imagem de destaque de ${filme.title || filme.name}`;
    if (moviePoster) {
      moviePoster.src = `https://image.tmdb.org/t/p/w500${filme.poster_path || filme.backdrop_path}`;
      moviePoster.alt = `Pôster de ${filme.title || filme.name}`;
    }
    movieTitle.textContent = filme.title ? filme.title : filme.name;
    movieOvervew.textContent = filme.overview;
    movieDate.innerHTML = filme.release_date ? formatarData(filme.release_date) : `Lançamento: ${formatarData(filme.first_air_date)} <br> Ultimo EP: ${formatarData(filme.last_air_date)}`;
    movieRating.textContent = `${Number(filme.vote_average).toFixed(1)} / 10 `;
    movieGeners.innerHTML = filme.genres.map((genre) => `<span class="badge">${genre.name}</span>`).join(' ');

    setupUserRating(filme);
    loadWatchProviders();

    console.log("DADOS DO FILMEEEE:::::", filme)
    if (ehSerie) {

      divDropdown.innerHTML = filme.seasons.map((temporadas) => {
        if (!temporadas.air_date || !temporadas.poster_path || !temporadas.name) return '';

        return `
              <li>
                <p class="block px-4 py-2 hover:bg-white/10 hover:text-white transition-colors">${temporadas.name}</p>
              </li>
        `
      }).join(' ');
    }


    if (ehSerie) {
      DivTemporadas.classList.remove("hidden");
      serieSeason.classList.add("flex");
      dropdownName.innerHTML = `${filme.seasons[0].name}`


      const temporada = filme.seasons[0];

      loadEpisodes(filme.id, temporada);

      divDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'P') {
          const nomeTemporada = e.target.textContent;
          const temporadaSelecionada = filme.seasons.find((temp) => temp.name === nomeTemporada);

          if (temporadaSelecionada) {
            loadEpisodes(filme.id, temporadaSelecionada);
            dropdownName.innerHTML = `${nomeTemporada}`
          }
        }
      })

    } else {
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
      if (ehSerie) {
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
  trailerSection?.classList.add('hidden');
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=${API_KEY_TMDB}&language=${currentLanguage}`
    );
    const data = await response.json();
    const videos = data.results;

    console.log('Dados do FILME >>>', videos);

    const trailer = videos[videos.length - 1].key

    console.log('Trailer KEY >>>', trailer);

    if (!trailer) {
      return
    }

    trailerSection?.classList.remove('hidden');
    MovieTrailer.innerHTML = `
    <div class="m-8 max-md:m-0 rounded-lg overflow-hidden flex items-center justify-center ">
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

    if (!temporada.air_date || !temporada.poster_path || !temporada.name) return '';

    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${filmeID}/season/${temporada.season_number}?api_key=${API_KEY_TMDB}&language=${currentLanguage}`
    );

    const data = await response.json();
    const ep = data.episodes;
    console.log("dados EPs::", ep)


    const dataAtual = new Date();





    const promessasEp = ep.map(async (episodio) => {

      const dataComparar = new Date(episodio.air_date);
      // TRAZER FORMATO DE LISTA PARA AS TEMPORADAS
      if (!episodio.still_path && dataAtual < dataComparar) return `
          <div class="card-ep h-full min-w-96 flex flex-col text-start rounded-3xl">
              <img src="https://images.freeimages.com/images/large-previews/7b1/question-mark-1165598.jpg?w=500" alt="${episodio.name}" class="h-80 max-md:!h-40 w-full object-cover rounded-t-3xl">
              <div class="flex flex-col items-start text-start p-4 bg-slate-500 w-full rounded-b-3xl">
                <span class="badge font-semibold text-lg justify-start mb-2 flex w-full">${episodio.name.includes("Episódio") ? "" : `EP ` + episodio.episode_number + ': '} ${episodio.name}</span>
              
                <span>Vai ao ar dia: ${formatarData(episodio.air_date)} </span>
              </div>
          </div>`;
      return `
          <div class="card-ep h-full min-w-96 flex flex-col text-start rounded-3xl">
              <img src="https://image.tmdb.org/t/p/w500/${episodio.still_path}" alt="${episodio.name}" class="h-80 max-md:!h-40 w-full object-cover rounded-t-3xl">
              <div class="flex flex-col items-start text-start p-4 bg-slate-500 w-full rounded-b-3xl">
                <span class="badge font-semibold text-lg justify-start mb-2 flex w-full">${episodio.name.includes("Episódio") ? "" : `EP ` + episodio.episode_number + ': '} ${episodio.name}</span>

                <span>${Number(episodio.vote_average).toFixed(2)}⭐ |  ${episodio.runtime} minutos</span>
                
                <span>${formatarData(episodio.air_date)} </span>
              </div>
          </div>`;

    })


    // 3. Esperamos TODAS as promessas do map() terminarem
    const epHtmlArray = await Promise.all(promessasEp);

    // 4. Agora sim, juntamos o array de strings e jogamos na tela
    serieSeason.innerHTML = epHtmlArray.join(' ');
    epScrollAmount = 0;
    serieSeason.style.transform = 'translateX(0)';

  } catch (error) {
    console.error('Erro ao carregar detalhes da serie:', error);
    document.body.innerHTML = `<p class="text-red-500">Erro ao carregar detalhes da série.</p>`;
    return;
  }
}


if (movieId) {
  const commentsEl = document.querySelector('movie-comments');
  if (commentsEl) {
    commentsEl.setAttribute('movie-id', movieId);
    commentsEl.setAttribute('eh-serie', ehSerie ? 'true' : 'false');
  }

  loadDetails();
  loadTrailer();
}

const epPrev = document.getElementById('ep-prev');
const epNext = document.getElementById('ep-next');

if (epPrev && epNext) {
  epPrev.addEventListener('click', () => {
    epScrollAmount = Math.max(epScrollAmount - epScrollStep, 0);
    serieSeason.style.transform = `translateX(-${epScrollAmount}px)`;
  });
  epNext.addEventListener('click', () => {
    const maxScroll = serieSeason.scrollWidth - serieSeason.clientWidth;
    epScrollAmount = Math.min(epScrollAmount + epScrollStep, maxScroll);
    serieSeason.style.transform = `translateX(-${epScrollAmount}px)`;
  });
}

async function loadWatchProviders() {
  if (!watchProvidersSection || !movieId) return;

  const type = ehSerie ? 'tv' : 'movie';
  const region = (currentLanguage.split('-')[1] || 'BR').toUpperCase();
  watchProvidersSection.classList.remove('hidden');
  watchProvidersLoading.classList.remove('hidden');
  watchProvidersList.classList.add('hidden');
  watchProvidersEmpty.classList.add('hidden');
  if (watchProvidersLink) {
    watchProvidersLink.classList.add('hidden');
    watchProvidersLink.classList.remove('inline-flex');
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}/watch/providers?api_key=${API_KEY_TMDB}`
    );
    const data = await response.json();
    const regionData = data.results?.[region] || data.results?.BR;

    watchProvidersLoading.classList.add('hidden');

    if (!regionData) {
      watchProvidersEmpty.classList.remove('hidden');
      return;
    }

    watchProvidersRegion.textContent = region === 'BR' ? 'Brasil' : `Região: ${region}`;
    if (regionData.link && watchProvidersLink) {
      watchProvidersLink.href = regionData.link;
      watchProvidersLink.classList.remove('hidden');
      watchProvidersLink.classList.add('inline-flex');
    }

    const groups = [
      ['Streaming', regionData.flatrate],
      ['Grátis', regionData.free],
      ['Com anúncios', regionData.ads],
      ['Aluguel', regionData.rent],
      ['Compra', regionData.buy],
    ].filter(([, providers]) => Array.isArray(providers) && providers.length);

    if (!groups.length) {
      watchProvidersEmpty.classList.remove('hidden');
      return;
    }

    const providerMap = new Map();
    groups.forEach(([accessType, providers]) => {
      providers.forEach((provider) => {
        const current = providerMap.get(provider.provider_id) || { provider, accessTypes: [] };
        current.accessTypes.push(accessType);
        providerMap.set(provider.provider_id, current);
      });
    });

    watchProvidersList.innerHTML = '';
    const cards = document.createElement('div');
    cards.className = 'flex flex-wrap items-center gap-2';

    providerMap.forEach(({ provider, accessTypes }) => {
      const providerLink = document.createElement('a');
      providerLink.href = regionData.link || '#';
      providerLink.target = '_blank';
      providerLink.rel = 'noopener noreferrer';
      providerLink.className = 'provider-icon group flex h-10 w-10 items-center justify-center rounded-lg p-0 transition hover:-translate-y-0.5';
      providerLink.title = `${provider.provider_name} · ${accessTypes.join(', ')}`;
      providerLink.setAttribute('aria-label', `${provider.provider_name}. Disponível para ${accessTypes.join(', ')}`);

      const logo = document.createElement('img');
      logo.src = provider.logo_path
        ? `https://image.tmdb.org/t/p/w92${provider.logo_path}`
        : 'https://via.placeholder.com/48/334155/ffffff?text=%E2%80%A2';
      logo.alt = provider.provider_name;
      logo.className = 'h-9 w-9 rounded-lg object-cover transition group-hover:scale-110';

      providerLink.appendChild(logo);
      cards.appendChild(providerLink);
    });

    watchProvidersList.appendChild(cards);

    watchProvidersList.classList.remove('hidden');
  } catch (error) {
    console.warn('Não foi possível carregar as plataformas disponíveis:', error);
    watchProvidersLoading.classList.add('hidden');
    watchProvidersEmpty.textContent = 'Não foi possível consultar as plataformas neste momento.';
    watchProvidersEmpty.classList.remove('hidden');
  }
}

function renderCommunityRating(data) {
  if (!communityRating) return;
  communityRating.innerHTML = data.count
    ? `<span class="text-yellow-400">★</span> Nota dos usuários: <strong class="text-white">${data.average.toFixed(1)} / 10</strong> <span class="text-slate-500">(${data.count} ${data.count === 1 ? 'nota' : 'notas'})</span>`
    : '<span class="text-slate-500">Ainda não há notas dos usuários.</span>';
}

async function setupUserRating(filme) {
  if (!userRatingPanel) return;

  if (!isLoggedIn()) {
    userRatingStatus.textContent = 'Faça login para avaliar este título.';
    userRatingValue.disabled = true;
    userRatingSave.disabled = true;
    userRatingSave.classList.add('opacity-50', 'cursor-not-allowed');
    userRatingRemove.classList.add('hidden');
  }

  try {
    const data = await getMovieRating(movieId, ehSerie);
    renderCommunityRating(data);
    if (data.myRating) {
      userRatingValue.value = String(data.myRating);
      userRatingStatus.textContent = `Você deu ${data.myRating}/10 para este título.`;
      userRatingRemove.classList.remove('hidden');
    }
  } catch (error) {
    console.warn('Não foi possível carregar as notas:', error);
  }

  userRatingSave.onclick = async () => {
    const rating = Number(userRatingValue.value);
    if (!rating) {
      await sfAlert('Escolha uma nota de 1 a 10.', { title: 'Nota não informada', type: 'warning' });
      return;
    }
    userRatingSave.disabled = true;
    try {
      await saveRating({
        movieId, ehSerie, rating,
        title: filme.title || filme.name,
        posterPath: filme.poster_path || filme.backdrop_path,
      });
      const updated = await getMovieRating(movieId, ehSerie);
      renderCommunityRating(updated);
      userRatingStatus.textContent = `Você deu ${rating}/10 para este título.`;
      userRatingRemove.classList.remove('hidden');
    } catch (error) {
      await sfAlert(error.message, { title: 'Não foi possível salvar', type: 'error' });
    } finally {
      userRatingSave.disabled = false;
    }
  };

  userRatingRemove.onclick = async () => {
    try {
      await removeRating(movieId, ehSerie);
      userRatingValue.value = '';
      userRatingStatus.textContent = 'Dê uma nota de 1 a 10';
      userRatingRemove.classList.add('hidden');
      renderCommunityRating(await getMovieRating(movieId, ehSerie));
    } catch (error) {
      await sfAlert(error.message, { title: 'Não foi possível remover', type: 'error' });
    }
  };
}
