// 25e22bc3
// https://www.omdbapi.com/?i=tt3896198&apikey=25e22bc3
let API_KEY = "63e0857";

const domRequestApi = document.getElementById("request-api");
const domMovieTitle = document.getElementById("movie-title");
const domMoviePoster = document.getElementById('movie-poster')
const domMovieImdb = document.getElementById('movie-imdb')
const domMovieActors = document.getElementById('actors')
const domSearchMovies = document.getElementById('search-movies')


domRequestApi.addEventListener("click", () => {
    searchMovie()
})

async function searchMovie() {

    let searchMovies = domSearchMovies.value.trim();

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(searchMovies)}`
        );
        const data = await response.json();
        console.log("Resposta da API", data);

        const nameMovie = data.Title;
        const moviePoster = data.Poster
        const movieImdb = data.imdbRating
        const movieactors = data.Actors

        domMovieImdb.textContent =  `IMDB: ${movieImdb}/10`
        domMovieTitle.textContent = nameMovie;
        domMoviePoster.src = moviePoster;
        domMoviePoster.alt = nameMovie;
        domMovieActors.textContent = `Atores: ${movieactors}`
    }
    catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

