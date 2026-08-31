import { getComments, postComment } from '../utils/comments.js';
import { getUser, isLoggedIn } from '../utils/auth.js';

function getInitials(name, email) {
  if (name?.trim()) {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.trim().slice(0, 2).toUpperCase();
  }
  if (email?.trim()) return email.trim().slice(0, 2).toUpperCase();
  return 'SF';
}

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function renderAvatar(user) {
  const name = user.name || 'Usuário';
  const initials = getInitials(user.name, user.email);
  const hasAvatar = !!user.avatarUrl;

  if (hasAvatar) {
    return `
      <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-tr from-yellow-500 to-yellow-300">
        <img src="${user.avatarUrl}" alt="${name}" class="w-full h-full object-cover"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="hidden w-full h-full items-center justify-center text-black font-bold text-xs">${initials}</span>
      </div>`;
  }

  return `
    <div class="w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center text-black font-bold text-xs">
      ${initials}
    </div>`;
}

export class MovieComments extends HTMLElement {
  constructor() {
    super();
    this.comments = [];
    this.loading = true;
    this.submitting = false;
  }

  static get observedAttributes() {
    return ['movie-id', 'eh-serie'];
  }

  connectedCallback() {
    this.render();
    this.loadComments();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.loadComments();
  }

  get movieId() {
    return this.getAttribute('movie-id');
  }

  get ehSerie() {
    return this.getAttribute('eh-serie') === 'true';
  }

  async loadComments() {
    if (!this.movieId) return;

    this.loading = true;
    this.render();

    try {
      this.comments = await getComments(this.movieId, this.ehSerie);
    } catch {
      this.comments = [];
    } finally {
      this.loading = false;
      this.render();
      this.bindEvents();
    }
  }

  renderCommentForm() {
    if (!isLoggedIn()) {
      return `
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-xl p-4 text-center">
          <p class="text-slate-300 mb-3">Faça login para deixar seu comentário.</p>
          <a href="/login.html"
            class="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
            Entrar
          </a>
        </div>`;
    }

    const user = getUser() || {};

    return `
      <form id="comment-form" class="flex gap-3 items-start">
        ${renderAvatar(user)}
        <div class="flex-1 space-y-2">
          <textarea
            id="comment-input"
            rows="3"
            maxlength="1000"
            placeholder="Escreva seu comentário..."
            class="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          ></textarea>
          <div class="flex justify-end">
            <button
              type="submit"
              id="comment-submit"
              class="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold px-5 py-2 rounded-lg transition-colors"
              ${this.submitting ? 'disabled' : ''}>
              ${this.submitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>
      </form>`;
  }

  renderCommentsList() {
    if (this.loading) {
      return `<p class="text-slate-400 text-center py-6">Carregando comentários...</p>`;
    }

    if (!this.comments.length) {
      return `<p class="text-slate-400 text-center py-6">Nenhum comentário ainda. Seja o primeiro!</p>`;
    }

    return `
      <ul class="space-y-4">
        ${this.comments.map((comment) => `
          <li class="flex gap-3 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
            ${renderAvatar(comment.user)}
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-baseline gap-2 mb-1">
                <span class="font-semibold text-white">${comment.user.name || 'Usuário'}</span>
                <time class="text-xs text-slate-400">${formatDate(comment.createdAt)}</time>
              </div>
              <p class="text-slate-200 whitespace-pre-wrap break-words">${this.escapeHtml(comment.content)}</p>
            </div>
          </li>
        `).join('')}
      </ul>`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  render() {
    this.innerHTML = `
      <section class="w-full">
        <h2 class="text-white text-2xl font-bold mb-4">Comentários</h2>
        <div class="space-y-6">
          ${this.renderCommentForm()}
          <div id="comments-list">
            ${this.renderCommentsList()}
          </div>
        </div>
      </section>`;
  }

  bindEvents() {
    const form = this.querySelector('#comment-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = this.querySelector('#comment-input');
      const content = input?.value?.trim();
      if (!content || this.submitting) return;

      this.submitting = true;
      this.render();
      this.bindEvents();

      try {
        const newComment = await postComment(this.movieId, this.ehSerie, content);
        this.comments = [newComment, ...this.comments];
        input.value = '';
      } catch (err) {
        alert(err.message || 'Erro ao publicar comentário');
      } finally {
        this.submitting = false;
        this.render();
        this.bindEvents();
      }
    });
  }
}

customElements.define('movie-comments', MovieComments);
