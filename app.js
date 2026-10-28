import { API_KEY_TMDB } from "./keys";
import { getFavorites, getUser, logout, isLoggedIn } from './utils/auth.js';

const languageDropdown = document.querySelector('language-dropdown');

// Ouvir o evento de mudança de idioma do componente
if (languageDropdown) {
  languageDropdown.addEventListener('languageChange', (event) => {
    const selectedLanguage = event.detail.language;
    const languageMap = {
      pt: 'pt-BR',
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
    };
    const apiLanguage = languageMap[selectedLanguage] || 'pt-BR';
  });
}

document.addEventListener('movieSearch', (event) => {
  const searchTerm = event.detail.searchTerm;
  searchMovie(searchTerm);
});

function searchMovie(searchTerm) {
  if (!searchTerm) return;
  window.location.href = `/search-results.html?q=${encodeURIComponent(searchTerm)}`;
}



// Contador de favoritos
async function atualizarContador() {
  const spanContador = document.getElementById('contador-favoritos');
  if (!spanContador) return;
  const favs = await getFavorites();
  const count = favs.length;
  spanContador.innerHTML = count || '';
  spanContador.classList.toggle('bg-transparent', count === 0);
  spanContador.classList.toggle('bg-red-500', count > 0);
}
atualizarContador();

function initHomeMotion() {
  document.querySelectorAll('movie-carousel').forEach((carousel) => {
    carousel.closest('.mb-10')?.classList.add('home-section');
  });

  const sections = document.querySelectorAll('.home-section');
  if (!sections.length) return;

  sections.forEach((section, index) => {
    section.style.setProperty('--motion-delay', `${Math.min(index, 6) * 60}ms`);
  });

  const reveal = (section) => section.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    sections.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  sections.forEach((section) => observer.observe(section));
}

initHomeMotion();
