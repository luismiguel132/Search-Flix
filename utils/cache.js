/**
 * Sistema de Cache para Search Flix
 * Gerencia cache de dados da API usando localStorage
 */

export class CacheManager {
  constructor() {
    this.prefix = 'search_flix_cache_';
    this.defaultTTL = 30 * 60 * 1000; // 30 minutos em millisegundos
  }

  /**
   * Gera uma chave única para o cache baseada nos parâmetros
   * @param {string} endpoint - Endpoint da API
   * @param {object} params - Parâmetros da requisição
   * @returns {string} Chave única para o cache
   */
  generateKey(endpoint, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    return `${this.prefix}${endpoint}_${sortedParams}`;
  }

  /**
   * Armazena dados no cache
   * @param {string} key - Chave do cache
   * @param {any} data - Dados para armazenar
   * @param {number} ttl - Tempo de vida em millisegundos (opcional)
   */
  set(key, data, ttl = this.defaultTTL) {
    try {
      const cacheItem = {
        data: data,
        timestamp: Date.now(),
        ttl: ttl,
      };

      localStorage.setItem(key, JSON.stringify(cacheItem));
      console.log(`Cache armazenado: ${key}`);
    } catch (error) {
      console.warn('Erro ao armazenar no cache:', error);
    }
  }

  /**
   * Recupera dados do cache
   * @param {string} key - Chave do cache
   * @returns {any|null} Dados do cache ou null se expirado/inexistente
   */
  get(key) {
    try {
      const cached = localStorage.getItem(key);

      if (!cached) {
        return null;
      }

      const cacheItem = JSON.parse(cached);
      const now = Date.now();

      // Verifica se o cache expirou
      if (now - cacheItem.timestamp > cacheItem.ttl) {
        this.remove(key);
        console.log(`Cache expirado removido: ${key}`);
        return null;
      }

      console.log(`Cache encontrado: ${key}`);
      return cacheItem.data;
    } catch (error) {
      console.warn('Erro ao recuperar do cache:', error);
      return null;
    }
  }

  /**
   * Remove um item específico do cache
   * @param {string} key - Chave do cache
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      console.log(`Cache removido: ${key}`);
    } catch (error) {
      console.warn('Erro ao remover do cache:', error);
    }
  }

  /**
   * Limpa todo o cache da aplicação
   */
  clear() {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter((key) => key.startsWith(this.prefix));

      cacheKeys.forEach((key) => localStorage.removeItem(key));
      console.log(`Cache limpo: ${cacheKeys.length} itens removidos`);
    } catch (error) {
      console.warn('Erro ao limpar cache:', error);
    }
  }

  /**
   * Remove itens expirados do cache
   */
  cleanup() {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter((key) => key.startsWith(this.prefix));
      let removedCount = 0;

      cacheKeys.forEach((key) => {
        const cached = localStorage.getItem(key);
        if (cached) {
          try {
            const cacheItem = JSON.parse(cached);
            const now = Date.now();

            if (now - cacheItem.timestamp > cacheItem.ttl) {
              localStorage.removeItem(key);
              removedCount++;
            }
          } catch (error) {
            // Se não conseguir fazer parse, remove o item corrompido
            localStorage.removeItem(key);
            removedCount++;
          }
        }
      });

      if (removedCount > 0) {
        console.log(`Limpeza de cache: ${removedCount} itens expirados removidos`);
      }
    } catch (error) {
      console.warn('Erro na limpeza de cache:', error);
    }
  }

  /**
   * Obtém informações sobre o cache atual
   * @returns {object} Estatísticas do cache
   */
  getStats() {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter((key) => key.startsWith(this.prefix));
      let totalSize = 0;
      let expiredCount = 0;
      let validCount = 0;

      cacheKeys.forEach((key) => {
        const cached = localStorage.getItem(key);
        if (cached) {
          totalSize += cached.length;

          try {
            const cacheItem = JSON.parse(cached);
            const now = Date.now();

            if (now - cacheItem.timestamp > cacheItem.ttl) {
              expiredCount++;
            } else {
              validCount++;
            }
          } catch (error) {
            expiredCount++;
          }
        }
      });

      return {
        totalItems: cacheKeys.length,
        validItems: validCount,
        expiredItems: expiredCount,
        totalSize: totalSize,
        totalSizeKB: Math.round((totalSize / 1024) * 100) / 100,
      };
    } catch (error) {
      console.warn('Erro ao obter estatísticas do cache:', error);
      return null;
    }
  }
}

// Instância global do gerenciador de cache
export const cacheManager = new CacheManager();

// Limpeza automática do cache ao carregar a página
cacheManager.cleanup();

// Limpeza periódica a cada 5 minutos
setInterval(() => {
  cacheManager.cleanup();
}, 5 * 60 * 1000);
