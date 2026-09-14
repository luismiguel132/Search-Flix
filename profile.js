import { isLoggedIn, logout, getProfile, updateProfile, uploadAvatar, getUser, getFavorites } from './utils/auth.js';
import { sfConfirm } from './utils/modal.js';
import { getMyRatings, getPublicProfile } from './utils/ratings.js';
import { followUser, unfollowUser } from './utils/social.js';

const viewedUserId = new URLSearchParams(window.location.search).get('userId');
const isPublicProfile = Boolean(viewedUserId);

if (!isPublicProfile && !isLoggedIn()) {
  window.location.href = '/login.html';
}

// Elementos Globais
const successAlert = document.getElementById('global-alert-success');
const successText = document.getElementById('global-alert-success-text');
const errorAlert = document.getElementById('global-alert-error');
const errorText = document.getElementById('global-alert-error-text');

// Elementos do Card
const cardUserName = document.getElementById('card-user-name');
const cardUserEmail = document.getElementById('card-user-email');
const cardFavoritesCount = document.getElementById('card-favorites-count');
const cardMemberSince = document.getElementById('card-member-since');
const avatarDisplay = document.getElementById('avatar-display');
const avatarInitials = document.getElementById('avatar-initials');
const badgeNameStatus = document.getElementById('badge-name-status');
const containerRemoveAvatar = document.getElementById('container-remove-avatar');
const btnRemoveAvatar = document.getElementById('btn-remove-avatar');
const btnLogoutSidebar = document.getElementById('btn-logout-sidebar');
const profilePageTitle = document.getElementById('profile-page-title');
const profilePageDescription = document.getElementById('profile-page-description');
const profileSettings = document.getElementById('profile-settings');
const publicProfileLink = document.getElementById('public-profile-link');
const activityProfileLink = document.getElementById('activity-profile-link');
const myFavoritesLink = document.getElementById('my-favorites-link');
const btnFollowProfile = document.getElementById('btn-follow-profile');
const cardFollowersCount = document.getElementById('card-followers-count');
const ratingsTitle = document.getElementById('ratings-title');
const ratingsDescription = document.getElementById('ratings-description');
const ratingsSort = document.getElementById('ratings-sort');
const ratingsList = document.getElementById('ratings-list');

// Elementos do Formulário de Info
const formProfileInfo = document.getElementById('form-profile-info');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const inputAvatarUrl = document.getElementById('input-avatar-url');
const avatarFileInput = document.getElementById('avatar-file-input');
const btnSaveInfo = document.getElementById('btn-save-info');
const btnSaveInfoText = document.getElementById('btn-save-info-text');

// Elementos do Formulário de Senha
const formChangePassword = document.getElementById('form-change-password');
const inputCurrentPassword = document.getElementById('input-current-password');
const inputNewPassword = document.getElementById('input-new-password');
const inputConfirmPassword = document.getElementById('input-confirm-password');
const btnSavePassword = document.getElementById('btn-save-password');
const btnSavePasswordText = document.getElementById('btn-save-password-text');

let currentUser = isPublicProfile ? {} : (getUser() || {});
let currentAvatarUrl = currentUser.avatarUrl || null;
let selectedFile = null;
let ratings = [];

function showSuccess(msg) {
  errorAlert.classList.add('hidden');
  successText.textContent = msg;
  successAlert.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => successAlert.classList.add('hidden'), 5000);
}

function showError(msg) {
  successAlert.classList.add('hidden');
  errorText.textContent = msg;
  errorAlert.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getInitials(name, email) {
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

function renderAvatar(avatarUrl, name, email) {
  const initials = getInitials(name, email);
  if (avatarUrl) {
    avatarDisplay.innerHTML = `
      <img src="${avatarUrl}" alt="${name || 'Avatar'}" class="w-full h-full object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<span>${initials}</span>';">
    `;
    containerRemoveAvatar.classList.remove('hidden');
  } else {
    avatarDisplay.innerHTML = `<span id="avatar-initials">${initials}</span>`;
    containerRemoveAvatar.classList.add('hidden');
  }
}

function updateUI(user) {
  currentUser = user;
  currentAvatarUrl = user.avatarUrl || null;

  // Atualiza Card
  const displayName = user.name ? user.name : 'Nome não definido';
  cardUserName.textContent = displayName;
  cardUserEmail.textContent = user.email || (isPublicProfile ? 'Perfil público' : '');

  if (!user.name) {
    badgeNameStatus.classList.remove('hidden');
  } else {
    badgeNameStatus.classList.add('hidden');
  }

  if (user.favoritesCount !== undefined) {
    cardFavoritesCount.textContent = user.favoritesCount;
  }
  if (cardFollowersCount && user.followersCount !== undefined) {
    cardFollowersCount.textContent = user.followersCount;
  }

  if (user.createdAt) {
    const date = new Date(user.createdAt);
    cardMemberSince.textContent = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  }

  renderAvatar(user.avatarUrl, user.name, user.email);

  // Atualiza Inputs
  if (inputName) inputName.value = user.name || '';
  if (inputEmail) inputEmail.value = user.email || '';
  if (inputAvatarUrl) inputAvatarUrl.value = user.avatarUrl || '';

  // Atualiza o componente de menu no header se existir
  const headerMenu = document.querySelector('user-menu');
  if (headerMenu && typeof headerMenu.render === 'function') {
    headerMenu.render();
    headerMenu.setupEvents();
  }
}

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = String(value ?? '');
  return element.innerHTML;
}

function ratingPosterPath(path) {
  if (!path) return 'https://via.placeholder.com/185x278/1e293b/94a3b8?text=Sem+poster';
  return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w185${path}`;
}

function sortedRatings() {
  const list = [...ratings];
  switch (ratingsSort?.value) {
    case 'lowest': return list.sort((a, b) => a.rating - b.rating || a.title.localeCompare(b.title));
    case 'highest': return list.sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title));
    case 'az': return list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    default: return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

function renderRatings() {
  if (!ratingsList) return;
  const list = sortedRatings();
  if (!list.length) {
    ratingsList.innerHTML = '<p class="col-span-full text-center text-sm text-slate-400 py-8">Nenhuma nota foi dada ainda.</p>';
    return;
  }

  ratingsList.innerHTML = list.map((item) => `
    <a href="/movie-details.html?id=${item.movieId}${item.ehSerie ? '-serie' : ''}" class="flex gap-3 rounded-xl border border-slate-700/80 bg-slate-900/60 p-3 transition hover:border-yellow-400/60 hover:bg-slate-900">
      <img src="${ratingPosterPath(item.posterPath)}" alt="${escapeHtml(item.title)}" class="h-24 w-16 flex-shrink-0 rounded-lg object-cover" loading="lazy">
      <div class="min-w-0 flex-1">
        <p class="truncate font-semibold text-white">${escapeHtml(item.title)}</p>
        <p class="mt-1 text-xs text-slate-500">${item.ehSerie ? 'Série' : 'Filme'}</p>
        <p class="mt-3 text-lg font-bold text-yellow-400">★ ${item.rating}/10</p>
        <p class="text-xs text-slate-500">${new Date(item.createdAt).toLocaleDateString('pt-BR')}</p>
      </div>
    </a>`).join('');
}

async function loadRatings() {
  try {
    ratings = isPublicProfile
      ? (await getPublicProfile(viewedUserId)).ratings || []
      : await getMyRatings();
    renderRatings();
  } catch (error) {
    ratingsList.innerHTML = `<p class="col-span-full text-sm text-rose-300">${escapeHtml(error.message || 'Não foi possível carregar as notas.')}</p>`;
  }
}

async function refreshFavoritesCount() {
  try {
    const favs = await getFavorites();
    if (cardFavoritesCount && Array.isArray(favs)) {
      cardFavoritesCount.textContent = favs.length;
    }
  } catch (err) {
    console.error('Erro ao atualizar contagem de favoritos:', err);
  }
}

async function loadProfile() {
  const local = getUser();
  if (local) updateUI(local);

  await refreshFavoritesCount();

  try {
    const remote = await getProfile();
    if (remote) {
      updateUI(remote);
      await refreshFavoritesCount();
    }
  } catch (err) {
    console.error('Erro ao carregar dados do perfil:', err);
  }
}

async function loadPublicProfile() {
  profileSettings?.classList.add('hidden');
  btnLogoutSidebar?.classList.add('hidden');
  publicProfileLink?.classList.add('hidden');
  myFavoritesLink?.classList.add('hidden');
  activityProfileLink?.classList.remove('hidden');
  activityProfileLink?.classList.add('inline-flex');
  if (activityProfileLink) activityProfileLink.href = `/activity.html?userId=${viewedUserId}`;
  btnFollowProfile?.classList.remove('hidden');
  btnFollowProfile?.classList.add('inline-flex');
  document.getElementById('global-alert-success')?.classList.add('hidden');
  document.getElementById('global-alert-error')?.classList.add('hidden');
  if (profilePageTitle) profilePageTitle.textContent = 'Perfil público';
  if (profilePageDescription) profilePageDescription.textContent = 'Veja as notas dadas por este usuário aos filmes e séries.';
  if (ratingsTitle) ratingsTitle.textContent = 'Notas deste usuário';
  if (ratingsDescription) ratingsDescription.textContent = 'Avaliações públicas de filmes e séries.';
  if (ratingsSort) ratingsSort.disabled = false;

  try {
    const user = await getPublicProfile(viewedUserId);
    updateUI(user);
    updateFollowButton(user.isFollowing);
    btnFollowProfile.onclick = async () => {
      btnFollowProfile.disabled = true;
      try {
        const result = user.isFollowing
          ? await unfollowUser(viewedUserId)
          : await followUser(viewedUserId);
        user.isFollowing = result.isFollowing;
        user.followersCount = result.followersCount;
        updateUI(user);
        updateFollowButton(user.isFollowing);
      } catch (error) {
        showError(error.message || 'Não foi possível atualizar o acompanhamento.');
      } finally {
        btnFollowProfile.disabled = false;
      }
    };
    await loadRatings();
  } catch (error) {
    showError(error.message || 'Não foi possível carregar este perfil.');
  }
}

function updateFollowButton(isFollowing) {
  if (!btnFollowProfile) return;
  btnFollowProfile.innerHTML = isFollowing
    ? '<i class="fa-solid fa-user-check"></i><span>Seguindo</span>'
    : '<i class="fa-solid fa-user-plus"></i><span>Seguir</span>';
  btnFollowProfile.classList.toggle('bg-yellow-400', !isFollowing);
  btnFollowProfile.classList.toggle('text-black', !isFollowing);
  btnFollowProfile.classList.toggle('bg-slate-800', isFollowing);
  btnFollowProfile.classList.toggle('text-white', isFollowing);
}

if (!isPublicProfile && publicProfileLink && currentUser.id) {
  publicProfileLink.href = `/profile.html?userId=${currentUser.id}`;
  activityProfileLink?.classList.remove('hidden');
  activityProfileLink?.classList.add('inline-flex');
  activityProfileLink.href = `/activity.html?userId=${currentUser.id}`;
}

ratingsSort?.addEventListener('change', renderRatings);

// ── Preview de Arquivo de Imagem ─────────────────────────
avatarFileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showError('Por favor selecione um arquivo de imagem válido (JPG, PNG, WebP).');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showError('A imagem deve ter no máximo 5MB.');
    return;
  }

  selectedFile = file;
  const reader = new FileReader();
  reader.onload = (event) => {
    renderAvatar(event.target.result, inputName.value, currentUser.email);
    inputAvatarUrl.value = '';
  };
  reader.readAsDataURL(file);
});

// Preview de URL de Imagem digitada
inputAvatarUrl.addEventListener('input', () => {
  const url = inputAvatarUrl.value.trim();
  selectedFile = null;
  if (url) {
    renderAvatar(url, inputName.value, currentUser.email);
  } else {
    renderAvatar(null, inputName.value, currentUser.email);
  }
});

// Remover Avatar
btnRemoveAvatar.addEventListener('click', () => {
  selectedFile = null;
  currentAvatarUrl = null;
  inputAvatarUrl.value = '';
  avatarFileInput.value = '';
  renderAvatar(null, inputName.value, currentUser.email);
});

// ── Formulário: Atualizar Nome e Imagem ───────────────────
formProfileInfo.addEventListener('submit', async (e) => {
  e.preventDefault();

  btnSaveInfo.disabled = true;
  btnSaveInfoText.textContent = 'Salvando...';

  try {
    let finalAvatarUrl = inputAvatarUrl.value.trim() || currentAvatarUrl;

    // Se um novo arquivo foi selecionado no input
    if (selectedFile) {
      btnSaveInfoText.textContent = 'Enviando imagem...';
      finalAvatarUrl = await uploadAvatar(selectedFile);
    }

    const payload = {
      name: inputName.value.trim(),
      avatarUrl: finalAvatarUrl || null,
    };

    const res = await updateProfile(payload);
    selectedFile = null;
    updateUI(res.user);
    showSuccess('Perfil e foto atualizados com sucesso!');
  } catch (err) {
    showError(err.message || 'Erro ao atualizar dados pessoais.');
  } finally {
    btnSaveInfo.disabled = false;
    btnSaveInfoText.textContent = 'Salvar Alterações';
  }
});

// ── Formulário: Alterar Senha ────────────────────────────
formChangePassword.addEventListener('submit', async (e) => {
  e.preventDefault();

  const currentPassword = inputCurrentPassword.value;
  const newPassword = inputNewPassword.value;
  const confirmPassword = inputConfirmPassword.value;

  if (newPassword !== confirmPassword) {
    showError('A nova senha e a confirmação não coincidem.');
    return;
  }

  if (newPassword.length < 6) {
    showError('A nova senha deve ter no mínimo 6 caracteres.');
    return;
  }

  btnSavePassword.disabled = true;
  btnSavePasswordText.textContent = 'Alterando senha...';

  try {
    await updateProfile({ currentPassword, newPassword });
    showSuccess('Senha alterada com sucesso!');
    formChangePassword.reset();
  } catch (err) {
    showError(err.message || 'Erro ao alterar senha. Verifique a senha atual.');
  } finally {
    btnSavePassword.disabled = false;
    btnSavePasswordText.textContent = 'Atualizar Senha';
  }
});

// Toggle Password Visibility
document.querySelectorAll('.toggle-pass').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    const icon = btn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-eye', !isPassword);
      icon.classList.toggle('fa-eye-slash', isPassword);
    }
  });
});

// Botão Logout Lateral
if (btnLogoutSidebar) {
  btnLogoutSidebar.addEventListener('click', async () => {
    if (await sfConfirm('Tem certeza que deseja deslogar da sua conta?', { title: 'Sair da conta' })) {
      logout();
    }
  });
}

// Carrega dados iniciais
if (isPublicProfile) {
  loadPublicProfile();
} else {
  loadProfile();
  loadRatings();
}
