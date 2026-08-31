import { isLoggedIn, logout, getProfile, updateProfile, uploadAvatar, getUser, getFavorites } from './utils/auth.js';

if (!isLoggedIn()) {
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

let currentUser = getUser() || {};
let currentAvatarUrl = currentUser.avatarUrl || null;
let selectedFile = null;

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
  cardUserEmail.textContent = user.email || '';

  if (!user.name) {
    badgeNameStatus.classList.remove('hidden');
  } else {
    badgeNameStatus.classList.add('hidden');
  }

  if (user.favoritesCount !== undefined) {
    cardFavoritesCount.textContent = user.favoritesCount;
  }

  if (user.createdAt) {
    const date = new Date(user.createdAt);
    cardMemberSince.textContent = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  }

  renderAvatar(user.avatarUrl, user.name, user.email);

  // Atualiza Inputs
  inputName.value = user.name || '';
  inputEmail.value = user.email || '';
  inputAvatarUrl.value = user.avatarUrl || '';

  // Atualiza o componente de menu no header se existir
  const headerMenu = document.querySelector('user-menu');
  if (headerMenu && typeof headerMenu.render === 'function') {
    headerMenu.render();
    headerMenu.setupEvents();
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
  btnLogoutSidebar.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja deslogar da sua conta?')) {
      logout();
    }
  });
}

// Carrega dados iniciais
loadProfile();
