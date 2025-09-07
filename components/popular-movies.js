export class PopularMovies extends HTMLElement {

    constructor() {
        super();
    }


    connectedCallback() {
        this.render()
        this.getData()
    }

    render() {
        this.innerHTML = `
        <section class="relative h-[500px] w-full ">
            <div class="absolute inset-0 ">
                <img id="movie-image" alt="Movie Poster" src="" class="w-[70%] h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-l from-black via-black/95 to-transparent"></div>
            </div>

            <div class="relative z-10 flex flex-col md:flex-row gap-6 p-6 min-h-screen">
                <div class="w-full md:w-1/2"></div>
                <div class="w-full md:w-1/2 space-y-4">

                    <h1 id="movie-title" class="text-3xl font-bold border-b text-white border-slate-700 pb-2"></h1>

                    <div class="space-y-2">
                        <div class="flex items-center gap-3">
                            <span id="movie-release-date" class="text-slate-400"></span>
                            <span id="movie-rating"
                                class="bg-yellow-400 text-white px-2 py-1 rounded-md text-sm font-semibold"></span>
                        </div>

                        <div>
                            <span class="text-slate-400">IMDB:</span>
                            <span id="movie-imdb" class="font-medium" ></span>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold mb-1 text-white">Sinopse</h3>
                        <p id="movie-overview" class="text-white leading-relaxed"></p>
                    </div>

                </div>
                
        </section>`;

    }


      // <div>
      //         <h3 class="text-xl font-semibold mb-1 text-white">Gêneros</h3>
      //         <div id="movie-geners" class="flex flex-wrap gap-2 text-white"></div>
      //     </div>

    async getData() {
        let API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';

        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=en-PT&page=1`);
        const data = await response.json();
        console.log("DATA POPULAR MOVIE >>> ", data);

        const filme = data.results[0];


        const movieTitle = document.getElementById('movie-title');
        const movieOvervew = document.getElementById('movie-overview');
        const movieImage = document.getElementById('movie-image');
        const movieDate = document.getElementById('movie-release-date');
        const movieRating = document.getElementById('movie-rating');
        const movieImdb = document.getElementById('movie-imdb');
        // const movieGeners = document.getElementById('movie-geners');
        const MovieCategory = document.querySelector('.movie-category');

        movieImage.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`;
        movieTitle.textContent = filme.title;
        movieOvervew.textContent = filme.overview;
        movieDate.textContent = filme.release_date;
        movieRating.textContent = Number(filme.vote_average).toFixed(1);
        movieImdb.href = `https://www.imdb.com/title/${filme.imdb_id}`;
        // movieGeners.innerHTML = filme.genres
        //     .map((genre) => `<span class="badge">${genre.id}</span>`)
        //     .join(' ');

        MovieCategory.textContent = `Filmes de ${filme.genres[0].name}`;

    }

}

customElements.define('popular-movies', PopularMovies);