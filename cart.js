// cart.js

document.addEventListener('DOMContentLoaded', () => {
  let items = getCart();
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const clearBtn = document.getElementById('clear-cart');

  function renderCart() {
    container.innerHTML = '';
    if (!items.length) {
      container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      totalEl.textContent = '';
      return;
    }

    items.forEach((i, idx) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-content">
          <img src="${i.img}" alt="${i.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h3>${i.restaurant} – ${i.name}</h3>
            <div class="cart-item-price">
              <span class="price">₱${i.original.toFixed(2)}</span>
              <span class="discounted">₱${i.price.toFixed(2)}</span>
            </div>
          </div>
          <button class="remove-btn" data-index="${idx}">&times;</button>
        </div>
      `;
      container.appendChild(div);
    });

    // Wire up remove buttons
    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(btn.dataset.index, 10);
        items.splice(idx, 1);
        setCart(items);
        updateCartCount();
        renderCart();
      });
    });

    updateTotal();
  }

  function updateTotal() {
    const total = items.reduce((sum, i) => sum + i.price, 0);
    totalEl.textContent = `Total: ₱${total.toFixed(2)}`;
  }

  // Clear cart
  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('cart');
    items = [];
    updateCartCount();
    renderCart();
  });

  // Initial render
  renderCart();
});
