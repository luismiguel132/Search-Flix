import { API_KEY_TMDB } from "./keys";
import { getFavorites, removeFavorite } from './utils/auth.js';

let favoritos = [];

const divFilmes = document.getElementById("filmesFavoritos");
const campoBusca = document.getElementById("favoritos-search");
const filtroTipo = document.getElementById("favoritos-type");
const ordenacao = document.getElementById("favoritos-sort");
const contador = document.getElementById("favoritos-count");

campoBusca.addEventListener('input', renderizarFavoritos);
filtroTipo.addEventListener('change', renderizarFavoritos);
ordenacao.addEventListener('change', renderizarFavoritos);

async function carregarFilmesFavoritos() {
  const filmesFavoritos = await getFavorites();

  if (!filmesFavoritos || filmesFavoritos.length === 0) {
    divFilmes.innerHTML = "<div class='col-span-full rounded-xl border border-dashed border-slate-700 p-12 text-center text-slate-400'>Nenhum filme ou série favoritado.</div>";
    contador.textContent = '0 favoritos';
    return;
  }

  const requests = filmesFavoritos.map(async (fav) => {
    // `id` é o ID do registro Favorite; `movieId` é o ID do filme no TMDB.
    const id = fav.movieId ?? fav.id;
    const serie = fav.ehSerie;
    const response = await fetch(
      serie
        ? `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY_TMDB}&language=pt-BR`
        : `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY_TMDB}&language=pt-BR`
    );
    return { movie: await response.json(), favorite: fav };
  });

  favoritos = await Promise.all(requests);
  renderizarFavoritos();
}

function tituloDo(item) {
  return item.movie.title || item.movie.name || item.favorite.title || '';
}

function anoDo(item) {
  return Number((item.movie.release_date || item.movie.first_air_date || '').slice(0, 4)) || 0;
}

function ehSerie(item) {
  return Boolean(item.movie.name || item.favorite.ehSerie);
}

function renderizarFavoritos() {
  const termo = campoBusca.value.trim().toLocaleLowerCase('pt-BR');
  const tipo = filtroTipo.value;
  const ordenarPor = ordenacao.value;

  const filtrados = favoritos
    .filter((item) => !termo || tituloDo(item).toLocaleLowerCase('pt-BR').includes(termo))
    .filter((item) => tipo === 'all' || (tipo === 'tv' ? ehSerie(item) : !ehSerie(item)))
    .sort((a, b) => {
      if (ordenarPor === 'title-asc') return tituloDo(a).localeCompare(tituloDo(b), 'pt-BR');
      if (ordenarPor === 'rating-desc') return Number(b.movie.vote_average || 0) - Number(a.movie.vote_average || 0);
      if (ordenarPor === 'rating-asc') return Number(a.movie.vote_average || 0) - Number(b.movie.vote_average || 0);
      if (ordenarPor === 'year-desc') return anoDo(b) - anoDo(a);
      if (ordenarPor === 'year-asc') return anoDo(a) - anoDo(b);
      return new Date(b.favorite.createdAt || 0) - new Date(a.favorite.createdAt || 0);
    });

  contador.textContent = `${filtrados.length} ${filtrados.length === 1 ? 'favorito encontrado' : 'favoritos encontrados'}`;
  divFilmes.innerHTML = '';

  if (!filtrados.length) {
    divFilmes.innerHTML = "<div class='col-span-full rounded-xl border border-dashed border-slate-700 p-12 text-center text-slate-400'>Nenhum favorito corresponde aos filtros.</div>";
    return;
  }

  filtrados.forEach((item) => divFilmes.appendChild(createMovieCard(item)));
}

function createMovieCard(item) {
  const movie = item.movie;
  const movieItem = document.createElement("a");
  movieItem.className =
    "group relative movie-item overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400/70 hover:shadow-xl";
  movieItem.href = "movie-details.html?id=" + movie.id + `${ehSerie(item) ? "-serie" : ""}`;

  movieItem.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="${movie.title || movie.name}" class="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105">
    <div class="p-3">
      <h3 class="line-clamp-2 font-semibold text-white transition group-hover:text-yellow-400">${movie.title || movie.name}</h3>
      <p class="mt-1 text-xs text-slate-400">${movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || "Ano não informado"} · ${Number(movie.vote_average || 0).toFixed(1)} ⭐</p>
    </div>
    <button type="button" class="add-favorite-btn absolute right-2 top-2 z-10 rounded-lg bg-black/60 p-2 text-white transition hover:bg-yellow-400 hover:text-black" aria-label="Remover dos favoritos">
      <i class="fa-solid fa-bookmark text-yellow-400"></i>
    </button>`;

  const favoriteButton = movieItem.querySelector('.add-favorite-btn');
  const icon = favoriteButton.querySelector('i');

  favoriteButton.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    await removeFavorite(movie.id);
    icon.classList.remove('fa-solid', 'text-yellow-400');
    icon.classList.add('fa-regular');

    // Recarrega a lista após remover
    await carregarFilmesFavoritos();
  });

  return movieItem;
}

carregarFilmesFavoritos();
