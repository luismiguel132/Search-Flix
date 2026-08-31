import { getUser, isLoggedIn, logout, getProfile } from '../utils/auth.js';

export class UserMenu extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
  }

  async connectedCallback() {
    this.render();
    this.setupEvents();

    // Se estiver logado, busca os dados mais recentes do perfil em segundo plano
    if (isLoggedIn()) {
      try {
        const freshUser = await getProfile();
        if (freshUser) {
          this.render();
          this.setupEvents();
        }
      } catch {
        // ignora se falhar
      }
    }
  }

  getInitials(name, email) {
    if (name && name.trim()) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.trim().slice(0, 2).toUpperCase();
    }
    if (email && email.trim()) {
      return email.trim().slice(0, 2).toUpperCase();
    }
    return 'SF';
  }

  render() {
    const logged = isLoggedIn();
    const user = getUser() || {};

    if (!logged) {
      this.innerHTML = `
        <a href="/login.html"
          id="btn-login-header"
          class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-lg transition-all duration-200 shadow-md text-sm md:text-base hover:scale-105"
          style="font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em;">
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
          <span>Entrar</span>
        </a>
      `;
      return;
    }

    const displayName = user.name ? user.name.split(' ')[0] : 'Meu Perfil';
    const initials = this.getInitials(user.name, user.email);
    const hasAvatar = !!user.avatarUrl;

    this.innerHTML = `
      <div class="relative inline-block text-left" id="user-menu-container">
        <button
          type="button"
          id="user-menu-btn"
          class="flex items-center gap-2.5 bg-slate-700/80 hover:bg-slate-700 text-white px-3 py-1.5 rounded-full border border-slate-600/80 hover:border-yellow-400 transition-all duration-200 shadow-lg group focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-expanded="false"
          aria-haspopup="true">
          
          <div class="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-yellow-500 to-yellow-300 text-black font-bold text-xs shadow-inner flex-shrink-0">
            ${
              hasAvatar
                ? `<img src="${user.avatarUrl}" alt="${user.name || 'Avatar'}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <span class="hidden w-full h-full items-center justify-center">${initials}</span>`
                : `<span>${initials}</span>`
            }
          </div>

          <span class="text-sm font-medium text-slate-100 max-w-[110px] truncate hidden sm:inline group-hover:text-yellow-400 transition-colors">
            ${displayName}
          </span>

          <i class="fa-solid fa-chevron-down text-xs text-slate-400 group-hover:text-yellow-400 transition-transform duration-200" id="user-chevron"></i>
        </button>

        <!-- Dropdown Menu -->
        <div
          id="user-dropdown"
          class="hidden absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-slate-800 border border-slate-700 shadow-2xl ring-1 ring-black ring-opacity-5 divide-y divide-slate-700/70 focus:outline-none z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
          tabindex="-1">
          
          <div class="px-4 py-3 bg-slate-800/90 rounded-t-xl">
            <p class="text-xs text-slate-400 font-medium">Logado como</p>
            <p class="text-sm font-semibold text-white truncate">${user.name || 'Usuário Search-Flix'}</p>
            <p class="text-xs text-slate-400 truncate">${user.email || ''}</p>
          </div>

          <div class="py-1">
            <a href="/profile.html"
              id="menu-item-profile"
              class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-yellow-400 transition-colors"
              role="menuitem">
              <i class="fa-solid fa-user-gear text-slate-400 w-4"></i>
              <span>Meu Perfil</span>
            </a>

            <a href="/filmesFavoritos.html"
              id="menu-item-favorites"
              class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-yellow-400 transition-colors"
              role="menuitem">
              <i class="fa-solid fa-bookmark text-slate-400 w-4"></i>
              <span>Meus Favoritos</span>
            </a>
          </div>

          <div class="py-1">
            <button
              type="button"
              id="btn-logout"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
              role="menuitem">
              <i class="fa-solid fa-right-from-bracket text-red-400 w-4"></i>
              <span>Sair da conta</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  setupEvents() {
    const btn = this.querySelector('#user-menu-btn');
    const dropdown = this.querySelector('#user-dropdown');
    const chevron = this.querySelector('#user-chevron');
    const logoutBtn = this.querySelector('#btn-logout');

    if (!btn || !dropdown) return;

    const toggle = (force) => {
      this.isOpen = force !== undefined ? force : !this.isOpen;
      dropdown.classList.toggle('hidden', !this.isOpen);
      if (chevron) {
        chevron.style.transform = this.isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      }
      btn.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    }

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && this.isOpen) {
        toggle(false);
      }
    });

    // Fecha ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        toggle(false);
      }
    });
  }
}

if (!customElements.get('user-menu')) {
  customElements.define('user-menu', UserMenu);
}
