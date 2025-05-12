// jollibee.js
document.addEventListener('DOMContentLoaded', ()=>{
  const products = [
    {name:'Chickenjoy', price:160, discount:0.20, img:'https://bucketeer-3eb16243-2c1c-43d2-be4e-1c2b3664d293.s3.amazonaws.com/2024/05/hex5QVM9-JBPH_CAUCASIA_PRODSHOT_PNG-1.jpg'},
    {name:'Yumburger', price:55, discount:0.15, img:'https://cdn-menu-us-east-1.tillster.com/jb-ph/9c9d4393-1949-4ad4-8d4b-91b611f8704b.png'},
    {name:'Large Fries', price:65, discount:0.10, img:'https://queen.jollibee.com.ph/2022/01/FRIES-SIDES-1.png'},
    {name:'Spaghetti', price:99, discount:0.10, img:'https://queen.jollibee.com.ph/2022/05/Jolly-Spaghetti-Solo.webp'},
    {name:'Jolly Hotdog', price:70, discount:0.15, img:'https://queen.jollibee.com.ph/2022/01/Cheesy-Classic-Jolly-Hotdog-Solo.png'},
    {name:'Peach Mango Pie', price:35, discount:0.25, img:'https://queen.jollibee.com.ph/2022/01/DESSERTS.png'},
    {name:'Iced Tea', price:40, discount:0.10, img:'https://queen.jollibee.com.ph/2022/01/Ice-Tea-Regular.png'},
    {name:'Coke Float', price:75, discount:0.20, img:'https://images.deliveryhero.io/image/fd-ph/Products/16339907.jpg?width=%s'},
    {name:'Mocha Frappe', price:110, discount:0.15, img:'https://img.freepik.com/premium-photo/chocolate-frappe-isolated-white-background_536380-34.jpg'},
    {name:'Chocolate Sundae', price:45, discount:0.25, img:'https://queen.jollibee.com.ph/2022/01/Chocolate-Sundae-Twirl.png'}
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
        restaurant:'Jollibee', 
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
