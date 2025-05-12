// app.js

// Cart helpers
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const span = document.getElementById('cart-count');
  const count = getCart().length;

  if (count > 0) {
    span.textContent = count;
    span.style.display = 'inline-block';
  } else {
    span.style.display = 'none';
  }
}

// Notification (toast) helper
function showNotification(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.documentElement.appendChild(toast);
  // force reflow
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}

// Global click listener for add/remove/clear
document.addEventListener('click', e => {
  if (e.target.classList.contains('add-cart-btn')) {
    showNotification('Item added to cart');
  }
  else if (e.target.classList.contains('remove-btn')) {
    showNotification('Item removed from cart');
  }
  else if (e.target.id === 'clear-cart') {
    showNotification('All items cleared');
  }
});

// Search trigger
function doSearch() {
  const q = document.getElementById('search-input').value.trim();
  if (!q) return;
  window.location = `search.html?q=${encodeURIComponent(q)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('search-btn');
  const inp = document.getElementById('search-input');
  if (btn) btn.addEventListener('click', doSearch);
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // initialize badge
  if (document.getElementById('cart-count')) updateCartCount();
});


//Scroll-padding-top helper
const getNavigationHeight = document.querySelector('.more-navbar').offsetHeight;
document.documentElement.style.setProperty('--scroll-padding', getNavigationHeight + "px");
