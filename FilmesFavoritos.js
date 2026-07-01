import { API_KEY_TMDB } from "./keys";
import { getFavorites, addFavorite, removeFavorite } from './utils/auth.js';

async function carregarFilmesFavoritos() {
  const divFilmes = document.getElementById("filmesFavoritos");

  const filmesFavoritos = await getFavorites();

  if (!filmesFavoritos || filmesFavoritos.length === 0) {
    divFilmes.innerHTML = "<h3 class='text-white text-xl'>Nenhum filme favoritado.</h3>";
    return;
  }

  const requests = filmesFavoritos.map((fav) => {
    const id = fav.id ?? fav.movieId;
    const serie = fav.ehSerie;
    return fetch(
      serie
        ? `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY_TMDB}&language=pt-BR`
        : `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY_TMDB}&language=pt-BR`
    ).then((res) => res.json());
  });

  const movies = await Promise.all(requests);
  divFilmes.innerHTML = "";
  movies.forEach((movie) => divFilmes.appendChild(createMovieCard(movie)));
}

function createMovieCard(movie) {
  const movieItem = document.createElement("a");
  movieItem.className =
    "relative movie-item flex-none w-[250px] max-md:!w-[47%] mx-2 max-md:!mx-0 bg-gray-800 rounded-lg flex flex-col items-center p-4 transition-transform hover:scale-105 duration-300 cursor-pointer overflow-hidden";
  movieItem.href = "movie-details.html?id=" + movie.id + `${movie.name ? "-serie" : ""}`;

  movieItem.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title || movie.name}" class="h-64 w-full object-cover rounded-lg">
    <h3 class="text-white text-lg pt-4 text-center line-clamp-1">${movie.title || movie.name}</h3>
    <p class="text-sm text-gray-400 mt-2">Ano: ${movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || "N/A"}</p>
    <p class="text-yellow-400 font-bold mt-1">⭐ ${Number(movie.vote_average).toFixed(1)} | 🗳️ ${movie.vote_count}</p>
    <button type="button" class="add-favorite-btn absolute top-2 right-2 z-30 text-black bg-white/50 p-2 rounded transition hover:bg-yellow-400">
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
    setTimeout(carregarFilmesFavoritos, 300);
  });

  return movieItem;
}

carregarFilmesFavoritos();
