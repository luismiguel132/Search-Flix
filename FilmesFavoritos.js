import { API_KEY_TMDB } from "./keys";
async function carregarFilmesFavoritos() {

  var divFilmes = document.getElementById("filmesFavoritos");
  const filmesSalvosString = localStorage.getItem("filmes-favoritos");

  const filmesFavoritos = JSON.parse(filmesSalvosString) || [];


  if (!filmesFavoritos || filmesFavoritos.length === 0) {
    divFilmes.innerHTML = "<h3>Nenhum filme favortitado.</h3>";
    return;
  }

  // divFilmes.innerHTML = `Filmes encontrados: ${movieIds}`;

  async function fetchMoviesByIds(movieIds) {
    try {
      const requests = movieIds.map((fav) =>
        fetch(
          fav.ehSerie ?
            `https://api.themoviedb.org/3/tv/${fav.id}?api_key=${API_KEY_TMDB}&language=pt-BR` :
            `https://api.themoviedb.org/3/movie/${fav.id}?api_key=${API_KEY_TMDB}&language=pt-BR`
        ).then((res) => res.json())
      );

      const movies = await Promise.all(requests);

      divFilmes.innerHTML = ""

      movies.forEach((movie) => {
        console.log("Movie >>", movie);
        const card = createMovieCard(movie);
        divFilmes.appendChild(card);
      });

      return movies;

    } catch (err) {
      console.error("Erro ao buscar filmes:", err);
    }
  }

  await fetchMoviesByIds(filmesFavoritos)
    .then((movies) => {
      console.log("Filmes encontrados:", movies);
      console.log("Movies >>", movies);
    })
    .catch((err) => {
      console.error("Erro ao buscar filmes:", err);
    });

  function createMovieCard(movie) {
    const movieItem = document.createElement("a");
    movieItem.className =
      "relative movie-item flex-none w-[250px] mx-2 bg-gray-800 rounded-lg flex flex-col items-center p-4 transition-transform hover:scale-105 duration-300 cursor-pointer overflow-hidden";

    movieItem.href = "movie-details.html?id=" + movie.id + `${movie.name ? "-serie" : ""}`;

    movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${
              movie.poster_path
            }" alt="${movie.title}" class="h-64 w-full object-cover rounded-lg">
            <h3 class="text-white text-lg pt-4 text-center line-clamp-1">${
              movie.title
            }</h3>
            <p class="text-sm text-gray-400 mt-2">Ano: ${
              movie.release_date?.slice(0, 4) || "N/A"
            }</p>
            <p class="text-yellow-400 font-bold mt-1">⭐ ${Number(
              movie.vote_average
            ).toFixed(1)} | 🗳️ ${movie.vote_count}</p>
            <button 
            type="button" 
            class="add-favorite-btn absolute top-2 right-2 z-30 text-black bg-white/50 p-2 rounded transition hover:bg-yellow-400 hover:text-black"
            >
            <i class="fa-regular fa-bookmark"></i>
            </button>
            `;
  const favoriteButton = movieItem.querySelector('.add-favorite-btn');
  const icon = favoriteButton.querySelector('i');

  let favoritos = JSON.parse(localStorage.getItem('filmes-favoritos')) || [];

  const ehSerie = movie.name ? true : false; // Se tiver "name", é série; se tiver "title", é filme


  const isFavorito = favoritos.some(z => z.id === movie.id);

  if (isFavorito) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid', 'text-yellow-400');
  }

  favoriteButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    let favoritos = JSON.parse(localStorage.getItem('filmes-favoritos')) || [];

    if (favoritos.some(z => z.id === movie.id)) {
      favoritos = favoritos.filter((z) => z.id !== movie.id);
      icon.classList.remove('fa-solid', 'text-yellow-400');
      icon.classList.add('fa-regular');
      

    } else {
      favoritos.push({ id: movie.id, ehSerie: ehSerie});
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid', 'text-yellow-400');
    }

    localStorage.setItem('filmes-favoritos', JSON.stringify(favoritos));
    carregarFilmesFavoritos();
  });

    return movieItem;
  }
}

carregarFilmesFavoritos();
