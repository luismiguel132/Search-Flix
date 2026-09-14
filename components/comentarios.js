import {
  getComments, postComment, postReply,
  editComment, editReply, deleteComment, deleteReply,
  likeComment, likeReply,
} from '../utils/comments.js';
import { getUser, isLoggedIn } from '../utils/auth.js';
import { sfAlert, sfConfirm } from '../utils/modal.js';

// ── Helpers ────────────────────────────────────────────────────────────

function getInitials(name) {
  if (!name?.trim()) return 'SF';
  const p = name.trim().split(' ');
  return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : name.trim().slice(0, 2).toUpperCase();
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function avatarHTML(user, size = 10) {
  const initials = getInitials(user.name);
  const sz = `w-${size} h-${size}`;
  if (user.avatarUrl) {
    return `<div class="${sz} rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-tr from-yellow-500 to-yellow-300">
      <img src="${user.avatarUrl}" alt="${user.name || ''}" class="w-full h-full object-cover"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
      <span class="hidden w-full h-full items-center justify-center text-black font-bold text-xs">${initials}</span>
    </div>`;
  }
  return `<div class="${sz} rounded-full flex-shrink-0 bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center text-black font-bold text-xs">${initials}</div>`;
}

function escapeHtml(t) {
  const d = document.createElement('div');
  d.textContent = t;
  return d.innerHTML;
}

function authorHTML(user, textClass = 'text-sm') {
  const rating = user.userRating
    ? `<span class="text-xs text-yellow-400" title="Nota dada por este usuário">★ ${user.userRating}/10</span>`
    : '';
  return `<a href="/profile.html?userId=${encodeURIComponent(user.id)}" class="font-semibold text-white ${textClass} hover:text-yellow-400 transition">${escapeHtml(user.name || 'Usuário')}</a>${rating}`;
}

// ── Component ──────────────────────────────────────────────────────────

export class MovieComments extends HTMLElement {
  constructor() {
    super();
    this.comments = [];
    this.loading = true;
    this.submitting = false;
    this._activeEdit = null; // { type: 'comment'|'reply', id }
    this._activeReplyForm = null; // commentId
  }

  static get observedAttributes() { return ['movie-id', 'eh-serie']; }

  connectedCallback() { this.render(); this.loadComments(); }
  attributeChangedCallback() { if (this.isConnected) this.loadComments(); }

  get movieId() { return this.getAttribute('movie-id'); }
  get ehSerie() { return this.getAttribute('eh-serie') === 'true'; }

  async loadComments() {
    if (!this.movieId) return;
    this.loading = true; this.renderList();
    try { this.comments = await getComments(this.movieId, this.ehSerie); }
    catch { this.comments = []; }
    finally { this.loading = false; this.renderList(); this.bindEvents(); }
  }

  // ── Render completo (só no início) ────────────────────────────────
  render() {
    const loggedIn = isLoggedIn();
    const user = getUser() || {};

    this.innerHTML = `
      <section class="w-full font-['Inter',sans-serif]">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="text-white text-2xl font-bold">Comentários</h2>
          <span id="comment-count-badge" class="bg-slate-700 text-slate-300 text-sm px-2.5 py-0.5 rounded-full">${this.comments.length}</span>
        </div>

        ${loggedIn ? `
          <form id="comment-form" class="flex gap-3 items-start mb-8">
            ${avatarHTML(user)}
            <div class="flex-1 space-y-2">
              <textarea id="comment-input" rows="3" maxlength="1000"
                placeholder="Escreva seu comentário..."
                class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"></textarea>
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-500" id="char-count">0 / 1000</span>
                <button type="submit" id="comment-submit"
                  class="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold px-5 py-2 rounded-lg transition text-sm">
                  Publicar
                </button>
              </div>
            </div>
          </form>
        ` : `
          <div class="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 text-center mb-8">
            <p class="text-slate-300 mb-3">Faça login para comentar.</p>
            <a href="/login.html" class="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-lg transition text-sm">
              <i class="fa-solid fa-arrow-right-to-bracket"></i> Entrar
            </a>
          </div>
        `}

        <div id="comments-list" class="space-y-5"></div>
      </section>`;

    this.renderList();
    this.bindEvents();
  }

  // ── Renderiza só a lista (sem reconstruir o form principal) ────────
  renderList() {
    const container = this.querySelector('#comments-list');
    if (!container) return;

    // Atualizar badge
    const badge = this.querySelector('#comment-count-badge');
    if (badge) badge.textContent = this.comments.length;

    if (this.loading) {
      container.innerHTML = `<div class="flex items-center justify-center py-12 gap-3 text-slate-400">
        <i class="fa-solid fa-spinner animate-spin text-yellow-400 text-xl"></i>
        <span>Carregando comentários...</span>
      </div>`;
      return;
    }

    if (!this.comments.length) {
      container.innerHTML = `<div class="text-center py-12 text-slate-400">
        <i class="fa-regular fa-comment-dots text-4xl mb-3 block text-slate-600"></i>
        <p>Nenhum comentário ainda. Seja o primeiro!</p>
      </div>`;
      return;
    }

    const currentUser = getUser();
    const myId = currentUser?.id;

    container.innerHTML = this.comments.map(c => this.renderCommentItem(c, myId)).join('');
  }

  renderCommentItem(c, myId) {
    const isMine = myId && c.user.id === myId;
    const isEditingThis = this._activeEdit?.type === 'comment' && this._activeEdit?.id === c.id;
    const showReplyForm = this._activeReplyForm === c.id;

    return `
    <article class="comment-item bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 md:p-5" data-comment-id="${c.id}">
      <div class="flex gap-3">
        ${avatarHTML(c.user)}
        <div class="flex-1 min-w-0">

          <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2">
            ${authorHTML(c.user)}
            <time class="text-xs text-slate-500">${formatDate(c.createdAt)}</time>
            ${c.edited ? `<span class="text-xs text-slate-500 italic">(editado)</span>` : ''}
          </div>

          ${isEditingThis ? `
            <div class="edit-form-comment space-y-2">
              <textarea class="edit-textarea w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400" rows="3" maxlength="1000">${escapeHtml(c.content)}</textarea>
              <div class="flex gap-2">
                <button class="btn-save-edit-comment bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-1.5 rounded-lg text-xs transition">Salvar</button>
                <button class="btn-cancel-edit text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-xs border border-slate-600 hover:border-slate-400 transition">Cancelar</button>
              </div>
            </div>
          ` : `
            <p class="text-slate-200 text-sm whitespace-pre-wrap break-words">${escapeHtml(c.content)}</p>
          `}

          <div class="flex items-center gap-4 mt-3 flex-wrap">
            <!-- Like -->
            <button class="btn-like-comment flex items-center gap-1.5 text-xs transition group ${c.likedByMe ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}" data-id="${c.id}">
              <i class="fa-${c.likedByMe ? 'solid' : 'regular'} fa-thumbs-up text-sm group-hover:scale-110 transition-transform"></i>
              <span class="like-count">${c.likeCount || 0}</span>
            </button>

            <!-- Responder -->
            ${isLoggedIn() ? `
            <button class="btn-toggle-reply text-xs text-slate-400 hover:text-yellow-400 flex items-center gap-1.5 transition" data-id="${c.id}">
              <i class="fa-regular fa-comment text-sm"></i>
              <span>Responder${c.replies?.length ? ` (${c.replies.length})` : ''}</span>
            </button>` : ''}

            <!-- Ações do dono -->
            ${isMine ? `
            <div class="ml-auto flex items-center gap-2">
              <button class="btn-edit-comment text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition" data-id="${c.id}">
                <i class="fa-solid fa-pen text-xs"></i><span>Editar</span>
              </button>
              <button class="btn-delete-comment text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition" data-id="${c.id}">
                <i class="fa-solid fa-trash text-xs"></i><span>Excluir</span>
              </button>
            </div>` : ''}
          </div>
        </div>
      </div>

      <!-- Respostas -->
      ${c.replies?.length || showReplyForm ? `
      <div class="replies-section mt-4 ml-13 pl-4 border-l-2 border-slate-700/60 space-y-4">
        ${(c.replies || []).map(r => this.renderReplyItem(r, myId, c.id)).join('')}
        ${showReplyForm ? this.renderReplyForm(c) : ''}
      </div>
      ` : (showReplyForm ? `<div class="replies-section mt-4 ml-13 pl-4 border-l-2 border-slate-700/60">${this.renderReplyForm(c)}</div>` : '')}
    </article>`;
  }

  renderReplyItem(r, myId, commentId) {
    const isMine = myId && r.user.id === myId;
    const isEditingThis = this._activeEdit?.type === 'reply' && this._activeEdit?.id === r.id;

    return `
    <div class="reply-item flex gap-3" data-reply-id="${r.id}" data-comment-id="${commentId}">
      ${avatarHTML(r.user, 8)}
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1.5">
          ${authorHTML(r.user, 'text-xs')}
          <time class="text-xs text-slate-500">${formatDate(r.createdAt)}</time>
          ${r.edited ? `<span class="text-xs text-slate-500 italic">(editada)</span>` : ''}
        </div>

        ${isEditingThis ? `
          <div class="edit-form-reply space-y-2">
            <textarea class="edit-textarea w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400" rows="2" maxlength="1000">${escapeHtml(r.content)}</textarea>
            <div class="flex gap-2">
              <button class="btn-save-edit-reply bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-3 py-1 rounded-lg text-xs transition">Salvar</button>
              <button class="btn-cancel-edit text-slate-400 hover:text-white px-2 py-1 rounded-lg text-xs border border-slate-600 hover:border-slate-400 transition">Cancelar</button>
            </div>
          </div>
        ` : `
          <p class="text-slate-300 text-xs whitespace-pre-wrap break-words">${escapeHtml(r.content)}</p>
        `}

        <div class="flex items-center gap-3 mt-2">
          <button class="btn-like-reply flex items-center gap-1 text-xs transition group ${r.likedByMe ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}" data-id="${r.id}">
            <i class="fa-${r.likedByMe ? 'solid' : 'regular'} fa-thumbs-up text-xs group-hover:scale-110 transition-transform"></i>
            <span class="like-count">${r.likeCount || 0}</span>
          </button>
          ${isMine ? `
          <div class="ml-auto flex items-center gap-2">
            <button class="btn-edit-reply text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition" data-id="${r.id}" data-comment-id="${commentId}">
              <i class="fa-solid fa-pen text-xs"></i><span>Editar</span>
            </button>
            <button class="btn-delete-reply text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition" data-id="${r.id}" data-comment-id="${commentId}">
              <i class="fa-solid fa-trash text-xs"></i><span>Excluir</span>
            </button>
          </div>` : ''}
        </div>
      </div>
    </div>`;
  }

  renderReplyForm(c) {
    const user = getUser() || {};
    return `
    <form class="reply-form flex gap-2 items-start pt-2" data-comment-id="${c.id}">
      ${avatarHTML(user, 8)}
      <div class="flex-1 space-y-2">
        <textarea class="reply-input w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400" rows="2" maxlength="1000" placeholder="Escreva sua resposta..."></textarea>
        <div class="flex gap-2">
          <button type="submit" class="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-1.5 rounded-lg text-xs transition">Responder</button>
          <button type="button" class="btn-cancel-reply text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-xs border border-slate-600 hover:border-slate-400 transition" data-id="${c.id}">Cancelar</button>
        </div>
      </div>
    </form>`;
  }

  // ── Event binding ──────────────────────────────────────────────────
  bindEvents() {
    // Form principal de comentário
    const form = this.querySelector('#comment-form');
    if (form) {
      const input = form.querySelector('#comment-input');
      const charCount = this.querySelector('#char-count');
      input?.addEventListener('input', () => {
        if (charCount) charCount.textContent = `${input.value.length} / 1000`;
      });
      form.addEventListener('submit', (e) => this.handleNewComment(e));
    }

    // Botões em comentários
    this.querySelectorAll('.btn-like-comment').forEach(btn =>
      btn.addEventListener('click', (e) => this.handleLikeComment(btn.dataset.id)));

    this.querySelectorAll('.btn-toggle-reply').forEach(btn =>
      btn.addEventListener('click', () => this.toggleReplyForm(Number(btn.dataset.id))));

    this.querySelectorAll('.btn-edit-comment').forEach(btn =>
      btn.addEventListener('click', () => {
        this._activeEdit = { type: 'comment', id: Number(btn.dataset.id) };
        this.renderList(); this.bindEvents();
      }));

    this.querySelectorAll('.btn-delete-comment').forEach(btn =>
      btn.addEventListener('click', () => this.handleDeleteComment(Number(btn.dataset.id))));

    this.querySelectorAll('.btn-save-edit-comment').forEach(btn => {
      const article = btn.closest('.comment-item');
      const id = Number(article?.dataset.commentId);
      btn.addEventListener('click', () => this.handleEditComment(id, article));
    });

    // Botões em respostas
    this.querySelectorAll('.btn-like-reply').forEach(btn =>
      btn.addEventListener('click', () => this.handleLikeReply(Number(btn.dataset.id))));

    this.querySelectorAll('.btn-edit-reply').forEach(btn =>
      btn.addEventListener('click', () => {
        this._activeEdit = { type: 'reply', id: Number(btn.dataset.id) };
        this.renderList(); this.bindEvents();
      }));

    this.querySelectorAll('.btn-delete-reply').forEach(btn =>
      btn.addEventListener('click', () =>
        this.handleDeleteReply(Number(btn.dataset.id), Number(btn.dataset.commentId))));

    this.querySelectorAll('.btn-save-edit-reply').forEach(btn => {
      const replyDiv = btn.closest('.reply-item');
      const replyId = Number(replyDiv?.dataset.replyId);
      const commentId = Number(replyDiv?.dataset.commentId);
      btn.addEventListener('click', () => this.handleEditReply(replyId, commentId, replyDiv));
    });

    // Cancelar edição
    this.querySelectorAll('.btn-cancel-edit').forEach(btn =>
      btn.addEventListener('click', () => {
        this._activeEdit = null; this.renderList(); this.bindEvents();
      }));

    // Forms de resposta
    this.querySelectorAll('.reply-form').forEach(f =>
      f.addEventListener('submit', (e) => this.handleNewReply(e)));

    // Cancelar form de resposta
    this.querySelectorAll('.btn-cancel-reply').forEach(btn =>
      btn.addEventListener('click', () => {
        this._activeReplyForm = null; this.renderList(); this.bindEvents();
      }));
  }

  toggleReplyForm(commentId) {
    this._activeReplyForm = this._activeReplyForm === commentId ? null : commentId;
    this.renderList();
    this.bindEvents();
    if (this._activeReplyForm) {
      setTimeout(() => this.querySelector(`.reply-form[data-comment-id="${commentId}"] .reply-input`)?.focus(), 50);
    }
  }

  // ── Handlers ─────────────────────────────────────────────────────

  async handleNewComment(e) {
    e.preventDefault();
    if (this.submitting) return;
    const input = this.querySelector('#comment-input');
    const content = input?.value?.trim();
    if (!content) return;

    const btn = this.querySelector('#comment-submit');
    this.submitting = true;
    if (btn) { btn.disabled = true; btn.textContent = 'Publicando...'; }

    try {
      const comment = await postComment(this.movieId, this.ehSerie, content);
      this.comments = [comment, ...this.comments];
      if (input) input.value = '';
      const cc = this.querySelector('#char-count');
      if (cc) cc.textContent = '0 / 1000';
    } catch (err) { await sfAlert(err.message, { type: 'error' }); }
    finally {
      this.submitting = false;
      if (btn) { btn.disabled = false; btn.textContent = 'Publicar'; }
      this.renderList(); this.bindEvents();
    }
  }

  async handleNewReply(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const commentId = Number(form.dataset.commentId);
    const input = form.querySelector('.reply-input');
    const content = input?.value?.trim();
    if (!content) return;

    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

    try {
      const reply = await postReply(commentId, content);
      const c = this.comments.find(c => c.id === commentId);
      if (c) { c.replies = [...(c.replies || []), reply]; }
      this._activeReplyForm = null;
    } catch (err) { await sfAlert(err.message, { type: 'error' }); }
    finally { this.renderList(); this.bindEvents(); }
  }

  async handleEditComment(id, article) {
    const textarea = article?.querySelector('.edit-textarea');
    const content = textarea?.value?.trim();
    if (!content) return;

    try {
      const updated = await editComment(id, content);
      const idx = this.comments.findIndex(c => c.id === id);
      if (idx !== -1) {
        this.comments[idx] = { ...this.comments[idx], ...updated, replies: this.comments[idx].replies };
      }
      this._activeEdit = null;
    } catch (err) { await sfAlert(err.message, { type: 'error' }); }
    finally { this.renderList(); this.bindEvents(); }
  }

  async handleEditReply(replyId, commentId, replyDiv) {
    const textarea = replyDiv?.querySelector('.edit-textarea');
    const content = textarea?.value?.trim();
    if (!content) return;

    try {
      const updated = await editReply(replyId, content);
      const c = this.comments.find(c => c.id === commentId);
      if (c) {
        const ri = c.replies.findIndex(r => r.id === replyId);
        if (ri !== -1) c.replies[ri] = { ...c.replies[ri], ...updated };
      }
      this._activeEdit = null;
    } catch (err) { await sfAlert(err.message, { type: 'error' }); }
    finally { this.renderList(); this.bindEvents(); }
  }

  async handleDeleteComment(id) {
    const confirmed = await sfConfirm('Tem certeza que deseja excluir este comentário?', {
      title: 'Excluir comentário', confirmLabel: 'Excluir', type: 'warning', danger: true,
    });
    if (!confirmed) return;
    try {
      await deleteComment(id);
      this.comments = this.comments.filter(c => c.id !== id);
    } catch (err) { await sfAlert(err.message, { type: 'error' }); }
    finally { this.renderList(); this.bindEvents(); }
  }

  async handleDeleteReply(replyId, commentId) {
    const confirmed = await sfConfirm('Tem certeza que deseja excluir esta resposta?', {
      title: 'Excluir resposta', confirmLabel: 'Excluir', type: 'warning', danger: true,
    });
    if (!confirmed) return;
    try {
      await deleteReply(replyId);
      const c = this.comments.find(c => c.id === commentId);
      if (c) c.replies = c.replies.filter(r => r.id !== replyId);
    } catch (err) { await sfAlert(err.message, { type: 'error' }); }
    finally { this.renderList(); this.bindEvents(); }
  }

  async handleLikeComment(id) {
    if (!isLoggedIn()) { await sfAlert('Faça login para curtir.', { title: 'Login necessário' }); return; }
    const numId = Number(id);
    try {
      const { liked } = await likeComment(numId);
      const c = this.comments.find(c => c.id === numId);
      if (c) { c.likedByMe = liked; c.likeCount = (c.likeCount || 0) + (liked ? 1 : -1); }
    } catch (err) { await sfAlert(err.message, { type: 'error' }); }
    finally { this.renderList(); this.bindEvents(); }
  }

  async handleLikeReply(replyId) {
    if (!isLoggedIn()) { await sfAlert('Faça login para curtir.', { title: 'Login necessário' }); return; }
    try {
      const { liked } = await likeReply(replyId);
      for (const c of this.comments) {
        const r = c.replies?.find(r => r.id === replyId);
        if (r) { r.likedByMe = liked; r.likeCount = (r.likeCount || 0) + (liked ? 1 : -1); break; }
      }
    } catch (err) { await sfAlert(err.message, { type: 'error' }); }
    finally { this.renderList(); this.bindEvents(); }
  }
}

if (!customElements.get('movie-comments')) {
  customElements.define('movie-comments', MovieComments);
}
