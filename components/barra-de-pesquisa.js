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
        <div class="mb-4">
            <div class="flex gap-2">
            <input type="text" id="search-movies" placeholder="Pesquisar filme"
                class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black" />
            <button id="request-api"
                class="bg-primary text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
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
