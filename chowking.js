// chowking.js
document.addEventListener('DOMContentLoaded', ()=>{
  const products = [
    {name:'Chao Fan Lauriat', price:299, discount:0.15, img:'https://cdn-menu-us-east-1.tillster.com/ck-ph/b11f8d69-aff3-4a57-b309-f34452d0a003.png'},
    {name:'Beef Wanton Noodles', price:180, discount:0.10, img:'https://pinoycupidgifts.com/wp-content/uploads/2022/08/Beef-Wonton-Mami.jpg'},
    {name:'Siomai', price:69, discount:0.20, img:'https://www.chowking.ph/wp-content/uploads/2023/09/4pcs-Siomai-650-x-547px.png'},
    {name:'Halo-Halo', price:120, discount:0.25, img:'https://www.chowking.ph/wp-content/uploads/2023/09/SuperSangkap-Halo-Halo-850x715-1.png'},
    {name:'HK Rice Bowl', price:145, discount:0.10, img:'https://www.chowkingusa.com/cdn/shop/files/CKBeefBroccoliRiceBowlHHB600x480px.png?v=1701199167'},
    {name:'Sweet & Sour Pork', price:215, discount:0.25, img:'https://nas-public.sharetreats.ph/nas/goods/G00000004103/G00000004103_1.png'},
    {name:'Lemonade', price:50, discount:0.10, img:'https://www.chowkingusa.com/cdn/shop/files/CKWintermelonTea.jpg?v=1741032860'},
    {name:'Iced Coffee', price:65, discount:0.15, img:'https://static.vecteezy.com/system/resources/previews/010/099/250/large_2x/iced-latte-or-iced-coffee-in-takeaway-cup-on-white-background-free-photo.jpg'},
    {name:'Pork Dumplings', price:95, discount:0.20, img:'https://www.pinasgifts.com/image/cache/data/chowking/dumplings-500x500.jpg'},
    {name:'Bubble Tea', price:110, discount:0.20, img:'https://www.chowkingusa.com/cdn/shop/products/d37fa0fd4c2846058a992cf5d183f313.jpg?v=1631130865'}
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
        restaurant:'Chowking', 
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
