import { cacheManager } from '../utils/cache.js';

export class CacheManagerComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initEventListeners();
    this.updateStats();
  }

  render() {
    this.innerHTML = `
      <div class="cache-manager bg-slate-800 p-4 rounded-lg border border-slate-600">
        <h3 class="text-white text-lg font-semibold mb-4">Gerenciador de Cache</h3>
        
        <div class="stats mb-4">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="text-slate-300">
              <span class="font-medium">Total de itens:</span>
              <span id="total-items" class="text-white ml-2">-</span>
            </div>
            <div class="text-slate-300">
              <span class="font-medium">Itens válidos:</span>
              <span id="valid-items" class="text-green-400 ml-2">-</span>
            </div>
            <div class="text-slate-300">
              <span class="font-medium">Itens expirados:</span>
              <span id="expired-items" class="text-red-400 ml-2">-</span>
            </div>
            <div class="text-slate-300">
              <span class="font-medium">Tamanho total:</span>
              <span id="total-size" class="text-white ml-2">-</span>
            </div>
          </div>
        </div>

        <div class="actions flex gap-2">
          <button id="refresh-stats" 
                  class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
            Atualizar Stats
          </button>
          <button id="cleanup-cache" 
                  class="px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm">
            Limpar Expirados
          </button>
          <button id="clear-all-cache" 
                  class="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
            Limpar Tudo
          </button>
        </div>

        <div id="cache-message" class="mt-3 text-sm hidden"></div>
      </div>
    `;
  }

  initEventListeners() {
    const refreshBtn = this.querySelector('#refresh-stats');
    const cleanupBtn = this.querySelector('#cleanup-cache');
    const clearAllBtn = this.querySelector('#clear-all-cache');

    refreshBtn?.addEventListener('click', () => {
      this.updateStats();
      this.showMessage('Estatísticas atualizadas!', 'success');
    });

    cleanupBtn?.addEventListener('click', () => {
      const beforeStats = cacheManager.getStats();
      cacheManager.cleanup();
      const afterStats = cacheManager.getStats();

      const removed = beforeStats.totalItems - afterStats.totalItems;
      this.updateStats();

      if (removed > 0) {
        this.showMessage(`${removed} itens expirados removidos!`, 'success');
      } else {
        this.showMessage('Nenhum item expirado encontrado.', 'info');
      }
    });

    clearAllBtn?.addEventListener('click', () => {
      if (
        confirm(
          'Tem certeza que deseja limpar todo o cache? Isso fará com que todos os dados sejam recarregados da API.'
        )
      ) {
        const stats = cacheManager.getStats();
        cacheManager.clear();
        this.updateStats();
        this.showMessage(`Todo o cache foi limpo! ${stats.totalItems} itens removidos.`, 'warning');
      }
    });
  }

  updateStats() {
    const stats = cacheManager.getStats();

    if (stats) {
      this.querySelector('#total-items').textContent = stats.totalItems;
      this.querySelector('#valid-items').textContent = stats.validItems;
      this.querySelector('#expired-items').textContent = stats.expiredItems;
      this.querySelector('#total-size').textContent = `${stats.totalSizeKB} KB`;
    } else {
      this.querySelector('#total-items').textContent = '0';
      this.querySelector('#valid-items').textContent = '0';
      this.querySelector('#expired-items').textContent = '0';
      this.querySelector('#total-size').textContent = '0 KB';
    }
  }

  showMessage(message, type = 'info') {
    const messageEl = this.querySelector('#cache-message');
    messageEl.textContent = message;
    messageEl.className = `mt-3 text-sm ${this.getMessageClass(type)}`;
    messageEl.classList.remove('hidden');

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
      messageEl.classList.add('hidden');
    }, 3000);
  }

  getMessageClass(type) {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  }
}

customElements.define('cache-manager', CacheManagerComponent);

