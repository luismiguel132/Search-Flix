import { getToken } from './utils/auth.js';

if (getToken()) {
  window.location.href = '/';
}

const form = document.getElementById('login-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorMsg = document.getElementById('error-msg');
    if (errorMsg) errorMsg.classList.add('hidden');

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
          errorMsg.textContent = data.error || 'Erro ao entrar. Tente novamente.';
          errorMsg.classList.remove('hidden');
        }
        return;
      }

      localStorage.setItem('sf-token', data.token);
      localStorage.setItem('sf-user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch (err) {
      if (errorMsg) {
        errorMsg.textContent = 'Erro ao conectar ao servidor.';
        errorMsg.classList.remove('hidden');
      }
    }
  });
}
