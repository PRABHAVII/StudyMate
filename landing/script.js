const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check saved preference on load
const savedTheme = sessionStorage.getItem('studymate-theme');
if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';

  if (isDark) {
    root.removeAttribute('data-theme');
    toggleBtn.textContent = '🌙';
    sessionStorage.setItem('studymate-theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '☀️';
    sessionStorage.setItem('studymate-theme', 'dark');
  }
});