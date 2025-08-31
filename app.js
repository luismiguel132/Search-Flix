let API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';

const languageDropdown = document.querySelector('language-dropdown');

// Ouvir o evento de mudança de idioma do componente
if (languageDropdown) {
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
  });
}

document.addEventListener('movieSearch', (event) => {
  const searchTerm = event.detail.searchTerm;
  searchMovie(searchTerm);
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
