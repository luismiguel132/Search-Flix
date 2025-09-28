export class LanguageDropdown extends HTMLElement {
    constructor() {
        super();
        this.currentLanguage = 'pt-BR';
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
    <div class="relative">
        <button id="languageButton" class="flex items-center gap-1 text-white hover:bg-slate-700 h-8 px-2 rounded transition-colors duration-200">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
          </svg>
          <span id="currentLanguage" class="text-sm font-medium">PT</span>
          <svg class="h-3 w-3 ml-1 transition-transform duration-200" id="dropdownArrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <div id="languageDropdown" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible transform scale-95 transition-all duration-200 origin-top-right">
          <div class="py-1">
            ${this.createLanguageOption('pt-BR', '🇧🇷', 'Português')}
            ${this.createLanguageOption('en', '🇺🇸', 'English')}
            ${this.createLanguageOption('es', '🇪🇸', 'Español')}
            ${this.createLanguageOption('fr', '🇫🇷', 'Français')}
            ${this.createLanguageOption('de', '🇩🇪', 'Deutsch')}
          </div>
        </div>
      </div>
    `;
    }

    createLanguageOption(code, flag, name) {
        return `
      <div class="language-option flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer" data-code="${code}">
        <div class="flex items-center gap-2">
          <span class="text-lg text-gray-700">${flag}</span>
          <span class="text-sm text-gray-700">${name}</span>
        </div>
        <svg class="h-4 w-4 text-blue-600 check-icon ${code === this.currentLanguage ? '' : 'hidden'
            }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    `;
    }

    setupEventListeners() {
        const languageButton = this.querySelector('#languageButton');
        const languageDropdown = this.querySelector('#languageDropdown');
        const dropdownArrow = this.querySelector('#dropdownArrow');
        const languageOptions = this.querySelectorAll('.language-option');

        // Toggle dropdown
        languageButton.addEventListener('click', () => {
            const isVisible = languageDropdown.classList.contains('opacity-100');

            if (isVisible) {
                this.hideDropdown(languageDropdown, dropdownArrow);
            } else {
                this.showDropdown(languageDropdown, dropdownArrow);
            }
        });

        // Handle language selection
        languageOptions.forEach((option) => {
            option.addEventListener('click', () => {
                const code = option.dataset.code;
                this.setLanguage(code);
                this.hideDropdown(languageDropdown, dropdownArrow);


                console.log("Monitoramento do Evento", code)
                // Dispatch custom event
                this.dispatchEvent(
                    new CustomEvent('languageChange', {
                        detail: { language: code },
                        bubbles: true,
                    })
                );
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
                this.hideDropdown(languageDropdown, dropdownArrow);
            }
        });
    }

    showDropdown(dropdown, arrow) {
        dropdown.classList.remove('opacity-0', 'invisible', 'scale-95');
        dropdown.classList.add('opacity-100', 'visible', 'scale-100');
        arrow.style.transform = 'rotate(180deg)';
    }

    hideDropdown(dropdown, arrow) {
        dropdown.classList.remove('opacity-100', 'visible', 'scale-100');
        dropdown.classList.add('opacity-0', 'invisible', 'scale-95');
        arrow.style.transform = 'rotate(0deg)';
    }

    setLanguage(code) {
        this.currentLanguage = code;
        const currentLanguageElement = this.querySelector('#currentLanguage');
        currentLanguageElement.textContent = code.toUpperCase();

        // Update check icons
        this.querySelectorAll('.check-icon').forEach((icon) => {
            icon.classList.add('hidden');
        });
        const selectedOption = this.querySelector(`[data-code="${code}"] .check-icon`);
        if (selectedOption) {
            selectedOption.classList.remove('hidden');
        }
    }
}

customElements.define('language-dropdown', LanguageDropdown);
