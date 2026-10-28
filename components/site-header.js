import './barra-de-pesquisa.js';
import './LanguageDropdown.js';
import './user-menu.js';

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const hasBack = this.hasAttribute('back');
    const backId = this.getAttribute('back-id') || '';

    this.innerHTML = `
      <header class="site-header fixed inset-x-0 top-0 z-50 border-b border-slate-700/70 bg-slate-900/90 px-4 py-3 text-white shadow-lg shadow-slate-950/20 backdrop-blur-xl">
        <div class="mx-auto flex min-h-10 w-full max-w-7xl items-center gap-3 md:gap-6">
          <div class="flex shrink-0 items-center gap-3">
            ${hasBack ? `
              <a ${backId ? `id="${backId}"` : ''} href="/" aria-label="Voltar para início"
                class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600/80 bg-slate-800/70 text-slate-200 transition hover:border-yellow-400 hover:text-yellow-400">
                <i class="fa-solid fa-arrow-left"></i>
              </a>
            ` : ''}
            <a href="/" aria-label="Search Flix" class="shrink-0 transition hover:opacity-85">
              <img src="/assets/searchflix-logo.svg" alt="Search Flix" class="h-8 w-auto md:h-9">
            </a>
          </div>

          <barra-de-pesquisa class="site-header-search min-w-0 flex-1"></barra-de-pesquisa>

          <div class="flex shrink-0 items-center">
            <user-menu></user-menu>
          </div>
        </div>
      </header>
    `;
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
