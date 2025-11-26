let API_KEY_TMDB = 'e6402d1ed6e04bd84cd6a3db6ee45381';

export class BarraDePesquisa extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
        <div>
            <div class="flex  ">
                <input type="text" id="search-movies" placeholder="Pesquisar filme"
                    class="flex-1 w-[150px] md:w-[400px] px-3 py-2 border rounded-l-lg  focus:outline-none focus:ring-2 focus:ring-primary text-black" />
                <button id="request-api"
                    class="bg-primary text-black px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <div id="suggestions" class="absolute bg-white border mt-1 w-[150px] md:w-[400px] rounded-lg shadow-lg z-10 top-[60px]">

                </div>
            </div>
        </div>
        `;
    }

    

    setupEventListeners() {
        const searchInput = this.querySelector('#search-movies');
        const requestApi = this.querySelector('#request-api');

        requestApi.addEventListener('click', () => {
            this.dispatchSearchEvent(searchInput.value);
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.dispatchSearchEvent(searchInput.value);
            }
        });

        console.log("Conteudo do input:", searchInput.value);



        searchInput.addEventListener('input', () => {
            console.log("Conteudo do input (input event):", searchInput.value);


            if (searchInput.value !== '') {
                    const url = `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY_TMDB}&query=${searchInput.value}&page=1`
                    let moviesSugestions = [];

                    fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Dados recebidos da API de palavras-chave:", data);
                        if (data.results && data.results.length > 0) {

                            const primeirosCincoFilmes = data.results.slice(0, 5)
                            console.log("Primeiros cinco resultados de palavras-chave:", primeirosCincoFilmes);

                            primeirosCincoFilmes.forEach(keyword => {
                                moviesSugestions.push(keyword.name);
                            })

                            const suggestionsContainer = this.querySelector('#suggestions');
                            suggestionsContainer.innerHTML = '';

                            moviesSugestions.forEach(suggestion => {
                                const suggestionItem = document.createElement('div');
                                suggestionItem.textContent = suggestion;
                                suggestionItem.classList.add('px-4', 'py-2', 'hover:bg-gray-200', 'cursor-pointer', 'text-black');
                                suggestionItem.addEventListener('click', () => {
                                    searchInput.value = suggestion;
                                    suggestionsContainer.classList.add('hidden');
                                    this.dispatchSearchEvent(suggestion);
                                });
                                suggestionsContainer.appendChild(suggestionItem);
                            });

                            

                        }
                    })
                    .catch(error => {
                        console.error("Erro ao buscar palavras-chave:", error);
                    });

                    
            }        
        })
    }

    dispatchSearchEvent(searchTerm) {
        if (!searchTerm.trim()) return;

        this.dispatchEvent(
        new CustomEvent('movieSearch', {
            detail: { searchTerm },
            bubbles: true,
        })
        );
    }
}

customElements.define('barra-de-pesquisa', BarraDePesquisa);
