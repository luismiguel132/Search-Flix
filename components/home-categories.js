const movieGenres = [
  ['80', 'Crime'],
  ['18', 'Drama'],
  ['14', 'Fantasia'],
  ['36', 'História'],
  ['27', 'Terror'],
  ['10402', 'Música'],
  ['9648', 'Mistério'],
  ['10749', 'Romance'],
  ['10770', 'Cinema TV'],
  ['53', 'Thriller'],
  ['10752', 'Guerra'],
];

const tvGenres = [
  ['10759', 'Ação e aventura'],
  ['16', 'Animação'],
  ['35', 'Comédia'],
  ['80', 'Crime'],
  ['99', 'Documentário'],
  ['18', 'Drama'],
  ['10751', 'Família'],
  ['10762', 'Kids'],
  ['9648', 'Mistério'],
  ['10763', 'Notícias'],
  ['10764', 'Reality'],
  ['10765', 'Ficção científica e fantasia'],
  ['10766', 'Novelas'],
  ['10767', 'Talk shows'],
  ['10768', 'Guerra e política'],
];

function createCategorySection({ id, label, type }) {
  const section = document.createElement('div');
  section.className = 'mb-10';

  const params = new URLSearchParams({
    category: id,
    type,
    label,
  });

  section.innerHTML = `
    <div class="mb-4 flex min-h-9 items-center justify-between gap-4 border-b border-slate-700/60 pb-3">
      <h2 class="text-xl font-bold text-white md:text-2xl">${label}</h2>
      <a href="/category-results.html?${params.toString()}" class="inline-flex flex-shrink-0 items-center gap-2 text-sm font-semibold text-yellow-400 transition hover:text-yellow-300">
        Ver mais <i class="fa-solid fa-arrow-right text-xs"></i>
      </a>
    </div>
    <movie-carousel data-category="${id}" data-label="${label}"${type === 'tv' ? ' data-category-serie="true"' : ''}></movie-carousel>`;

  return section;
}

const container = document.getElementById('all-categories');
if (container) {
  movieGenres.forEach(([id, label]) => {
    container.appendChild(createCategorySection({ id, label, type: 'movie' }));
  });

  tvGenres.forEach(([id, label]) => {
    container.appendChild(createCategorySection({ id, label: `Séries - ${label}`, type: 'tv' }));
  });
}
