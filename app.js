// 25e22bc3
// https://www.omdbapi.com/?i=tt3896198&apikey=25e22bc3
let API_KEY = "63e0857";

const domRequestApi = document.getElementById("request-api");
const domMovieTitle = document.getElementById("movie-title");
const domMoviePoster = document.getElementById('movie-poster')
const domMovieImdb = document.getElementById('movie-imdb')
const domMovieActors = document.getElementById('actors')
const domSearchMovies = document.getElementById('search-movies')
const categoryButtons = document.querySelectorAll('.category-btn')
const domCategoryTitle = document.getElementById('category-title')
const domMoviesContainer = document.getElementById('movies-container')




domRequestApi.addEventListener("click", () => {
    searchMovie()
})

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category')
        loadMoviesByCategory(category)
    })
})

document.addEventListener('DOMContentLoaded', () => {
    loadMoviesByCategory('action')
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

async function loadMoviesByCategory(category) {

    const categoryNames = {
        "action": "Ação",
        "comedy": "Comédia",
        "drama": "Drama",
        "horror": "Terror",
        "romance": "Romance",
        "thriller": "Suspense",
        "sci-fi": "Ficção Científica",
    }

    categoryButtons.forEach((button) => {
        if (button.getAttribute('data-category') === category) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    })

    domCategoryTitle.textContent = `Filmes de ${categoryNames[category]}`

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${category}`
        );
        const data = await response.json();
        console.log("Resposta da API", data);
        const movies = data.Search;
        movies.forEach((movie) => {
            console.log(movie.Title);
        });

        if(data.Response === "True"){
            domMoviesContainer.innerHTML = "";
            movies.forEach((movie) => {
                if(movie.Poster === "N/A") return;
                const movieItem = document.createElement("div");
                movieItem.classList.add("movie-item", "m-5", "bg-gray-800", "rounded-lg", "flex", "flex-col", "items-center", "p-4");
                movieItem.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}" class="h-96 max-w-64 object-cover">
                    <h3 class=" text-white text-xl pt-4">${movie.Title}</h3>
                `;
                domMoviesContainer.appendChild(movieItem);
            });
        }

    } catch (error) {
        console.error("Error fetching movie data:", error);
    }



    
}

