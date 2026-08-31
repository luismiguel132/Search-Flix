import { getToken } from './utils/auth.js';

if (getToken()) {
  window.location.href = '/';
}

const form = document.getElementById('register-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');
    if (errorMsg) errorMsg.classList.add('hidden');
    if (successMsg) successMsg.classList.add('hidden');

    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      let data = {};
      const text = await res.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!res.ok) {
        if (errorMsg) {
          errorMsg.textContent = data.error || 'Erro ao cadastrar. Tente novamente.';
          errorMsg.classList.remove('hidden');
        }
        return;
      }

      if (successMsg) {
        successMsg.textContent = 'Conta criada com sucesso! Redirecionando para o login...';
        successMsg.classList.remove('hidden');
      }
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 1500);
    } catch (err) {
      if (errorMsg) {
        errorMsg.textContent = 'Erro ao conectar ao servidor.';
        errorMsg.classList.remove('hidden');
      }
    }
  });
}
