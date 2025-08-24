// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const isDark = localStorage.getItem('cognitio-theme') === 'dark';
  if (isDark) document.documentElement.classList.add('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    const isNowDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('cognitio-theme', isNowDark ? 'dark' : 'light');
    themeToggle.textContent = isNowDark ? '☀️' : '🌙';
  });
}

// Auth Functions
function showMessage(el, text, success) {
  el.textContent = text;
  el.className = `resp-message ${success ? 'success' : 'error'}`;
  el.style.display = 'block';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function registerUser(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const c_password = form.c_password.value;

  const msgEl = form.querySelector('.resp-message');

  if (!name || !email || !password || !c_password) {
    return showMessage(msgEl, 'All fields are required.', false);
  }
  if (!validateEmail(email)) {
    return showMessage(msgEl, 'Please enter a valid email.', false);
  }
  if (password !== c_password) {
    return showMessage(msgEl, 'Passwords do not match.', false);
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === email)) {
    return showMessage(msgEl, 'Email already registered.', false);
  }

  users.push({ name, email, password: btoa(password) }); // Note: btoa is NOT secure. Use bcrypt on server.
  localStorage.setItem('users', JSON.stringify(users));
  showMessage(msgEl, 'Registration successful! Redirecting...', true);
  setTimeout(() => window.location.href = 'login.html', 1500);
}

function loginUser(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;
  const msgEl = form.querySelector('.resp-message');

  if (!email || !password) {
    return showMessage(msgEl, 'Please fill all fields.', false);
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === btoa(password));

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    showMessage(msgEl, 'Login successful! Redirecting...', true);
    setTimeout(() => window.location.href = 'index.html', 1500);
  } else {
    showMessage(msgEl, 'Invalid email or password.', false);
  }
}

// Attach Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  if (registerForm) registerForm.addEventListener('submit', registerUser);
  if (loginForm) loginForm.addEventListener('submit', loginUser);
});
