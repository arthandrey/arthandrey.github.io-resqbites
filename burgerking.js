// burgerking.js
document.addEventListener('DOMContentLoaded', ()=>{
  const products = [
    { name: 'Whopper',                   price: 180, discount: 0.20, img: 'https://www.burgerking.com.ph/images/products/Plant-Based%20Whopper.webp?version=1.15.5.1742445351619' },
    { name: 'Large Fries',               price:  85, discount: 0.15, img: 'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/cg1ka/86928fe838062b1acbdb2a6f7b497aa4.jpg?width=%s' },
    { name: 'Onion Rings',               price:  70, discount: 0.10, img: 'https://bk-apac-prd.s3.amazonaws.com/sites/burgerking.com.fj/files/BK_OnionRings_detail.png' },
    { name: 'Chicken Sandwich',          price: 120, discount: 0.25, img: 'https://www.burgerking.com.ph/images/products/Chicken_King_P155.webp?version=1.15.5.1742445351619' },
    { name: 'Bacon King',                price: 245, discount: 0.15, img: 'https://cdn.phonebooky.com/blog/wp-content/uploads/2020/07/14163003/Single-Bacon-King-from-Burger-King.jpg' },
    { name: 'Veggie Burger',             price: 160, discount: 0.10, img: 'https://burgerking.com.cy/sites/default/files/Veggie%20Burger-01_1.png' },
    { name: 'Iced Coffee',               price:  80, discount: 0.15, img: 'https://www.pngkey.com/png/detail/302-3026977_ice-coffee-burger-king.png' },
    { name: 'Soft Drink',          price:  60, discount: 0.20, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb8xx8D0TrfZHdVgnwifhdJk8qqHJtslivzg&s' },
    { name: 'King’s Sundae',             price:  50, discount: 0.25, img: 'https://www.burgerking.com.sg/upload/image/Product/62/ChocolateSundae.png' },
    { name: 'Melt Cheeseburger',         price: 130, discount: 0.20, img: 'https://www.burgerking.com.ph/images/products/Flame-Grilled_Double_Cheeseburger_P156.webp?version=1.15.5.1742445351619&s=256x' }
  ];

  const container = document.getElementById('product-list');
  products.forEach(p=>{
    const disc = (p.price*(1-p.discount)).toFixed(2);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" class="product-img" alt="${p.name}">
      <h2>${p.name}</h2>
      <div class="price">₱${p.price.toFixed(2)}</div>
      <div class="discounted">₱${disc}</div>
      <button class="add-cart-btn">Add to Cart</button>
    `;
    container.appendChild(card);

    card.querySelector('.add-cart-btn').addEventListener('click', ()=>{
      const cart = getCart();
      cart.push({ 
        restaurant:'Burger King', 
        name:p.name, 
        img:p.img,
        original:p.price,
        price:parseFloat(disc) 
      });
      setCart(cart);
      updateCartCount();
    });
  });
});
