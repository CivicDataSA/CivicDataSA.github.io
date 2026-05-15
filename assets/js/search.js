function search(query) {
  if (!query.trim() || !window.ANALYSES) return [];
  const q = query.toLowerCase();
  return window.ANALYSES.filter(item =>
    (item.title && item.title.toLowerCase().includes(q)) ||
    (item.desc && item.desc.toLowerCase().includes(q)) ||
    (item.tag && item.tag.toLowerCase().includes(q)) ||
    (item.tags && item.tags.some(t => String(t).toLowerCase().includes(q)))
  );
}

function renderResults(results, query) {
  const container = document.getElementById('search-results');
  if (!container) return;
  if (!query.trim()) { container.innerHTML = ''; return; }
  if (results.length === 0) {
    container.innerHTML = '<p class="no-results">No results found for "' + query + '"</p>';
    return;
  }
  container.innerHTML = results.map(r => `
    <a href="${r.url}" class="result-item">
      <h3>${r.title}</h3>
      <p>${r.desc || ''}</p>
    </a>
  `).join('');
}

const input = document.getElementById('search-input');
const btn = document.getElementById('search-btn');

if (input) {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') renderResults(search(input.value), input.value);
  });
  input.addEventListener('input', () => {
    if (input.value.length > 2) renderResults(search(input.value), input.value);
    if (input.value.length === 0) renderResults([], '');
  });
}
if (btn) {
  btn.addEventListener('click', () => renderResults(search(input.value), input.value));
}
