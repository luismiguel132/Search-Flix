export class Carousel extends HTMLElement {
    constructor() {
        super();
        this.scrollAmount = 0;
        this.scrollStep = 500; 
        this.API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';
        this.containerId = `movies-container-${Math.random().toString(36).substr(2, 9)}`
    }


    connectedCallback() {
        this.render()
        this.initControls()
        this.initEventListeners()
    }

    render() {

        this.innerHTML = `
        <div class="relative overflow-hidden" id="movies-carousel">
            <div class="relative h-full overflow-hidden rounded-lg">
            <div class="flex transition-transform duration-500 ease-in-out" id="${this.containerId}">
                <!-- Movies will be added here -->
        </div>
    </div>

    <!-- Slider controls -->
    <button type="button"
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev>
        <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
        <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 1 1 5l4 4" />
        </svg>
        <span class="sr-only">Anterior</span>
        </span>
    </button>
    <button type="button"
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next>
        <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
        <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 9 4-4-4-4" />
        </svg>
        <span class="sr-only">Próximo</span>
        </span>
    </button>`

    }


    initControls() {
        const prevButton = this.querySelector('[data-carousel-prev]');
        const nextButton = this.querySelector('[data-carousel-next]');
        const container = this.querySelector(`#${this.containerId}`);

        if (!prevButton || !nextButton || !container) {
            console.warn('Elementos do carousel não encontrados');
            return;
        }

        let scrollAmount = 0;
        const scrollStep = 500; // Quantidade de pixels para rolar

        prevButton.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - scrollStep, 0);
            container.style.transform = `translateX(-${scrollAmount}px)`;
        });

        nextButton.addEventListener('click', () => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
            container.style.transform = `translateX(-${scrollAmount}px)`;
        });
  }


  initEventListeners() {
        const category = this.getAttribute('data-category');
        if (category) {
            this.loadMoviesByCategory(category);
        }
    }

    async loadMoviesByCategory(category) {

        // const categoryNames = {
        //     28: 'Ação',
        //     12: 'Aventura',
        //     16: 'Animação',
        //     35: 'Comédia',
        //     80: 'Crime',
        //     99: 'Documentário',
        //     18: 'Drama',
        //     10749: 'Romance',
        //     53: 'Suspense',
        //     10752: 'Guerra',
        //     37: 'Faroeste',
        //     10751: 'Família',
        //     14: 'Fantasia',
        // };

        const container = this.querySelector(`#${this.containerId}`);
        if (!container) return;

        const language = 'pt-BR';
        let currentSort = 'popularity.desc';

        


        container.innerHTML = `<p class="text-white">Carregando...</p>`;

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY_TMDB}&with_genres=${category}&language=${language}&sort_by=${currentSort}&page=1`
            );
            const data = await response.json();
            const movies = data.results;

            if (!Array.isArray(movies) || movies.length === 0) {
                container.innerHTML = `<p class="text-white">Nenhum filme encontrado.</p>`;
                return;
            }

            container.innerHTML = '';
            movies.forEach((movie) => {
                if (movie.poster_path) {
                const card = this.createMovieCard(movie);
                if (card) container.appendChild(card);
                }
            });
    } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            container.innerHTML = `<p class="text-red-500">Erro ao carregar filmes.</p>`;
        }
    }

    createMovieCard(movie) {
        const movieItem = document.createElement('a');
        movieItem.className =
        'movie-item flex-none w-[250px] mx-2 bg-gray-800 rounded-lg flex flex-col items-center p-4 transition-transform hover:scale-105 duration-300 cursor-pointer';
        movieItem.href = 'movie-details.html?id=' + movie.id;

        movieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
        movie.title
        }" class="h-64 w-full object-cover rounded-lg">
        <h3 class="text-white text-lg pt-4 text-center line-clamp-1">${movie.title}</h3>
        <p class="text-sm text-gray-400 mt-2">Ano: ${movie.release_date?.slice(0, 4) || 'N/A'}</p>
        <p class="text-yellow-400 font-bold mt-1">⭐ ${Number(movie.vote_average).toFixed(1)} | 🗳️ ${
        movie.vote_count
        }</p>
        `;

        return movieItem;
}
}

customElements.define('movie-carousel', Carousel);