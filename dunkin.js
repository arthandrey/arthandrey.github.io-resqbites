// dunkin.js
document.addEventListener('DOMContentLoaded', ()=>{
  const products = [
    { name: 'Glazed Donut',       price: 25,  discount: 0.20, img: 'https://media.istockphoto.com/id/183181304/photo/doughnut-or-donut-isolated-on-white.jpg?s=612x612&w=0&k=20&c=z-c_gVqEJW5Nd8gkyyLmE1omhchQ71oa7AYZuO5MHa0=' },
    { name: 'Hot Coffee',         price: 80,  discount: 0.15, img: 'https://www.shape.com/thmb/DJKMBoJgTF_lfPnzAI4cnLhGD5w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hot-coffee-8079cd4654e84c07924b12d4f78b2cb5.jpg' },
    { name: 'Boston Kreme',       price: 35,  discount: 0.25, img: 'https://img.lazcdn.com/g/p/d7032d16a305cdfe71841edad78d3fe0.png' },
    { name: 'Munchkins',  price: 60,  discount: 0.10, img: 'https://www.dunkinksa.com/Media//Menu/06112023072253~Munchkins_checkfil.png' },
    { name: 'Choco Iced',         price: 110, discount: 0.15, img: 'https://img.lazcdn.com/g/p/ac2d2e52f6065b614221ee24d35c9acb.png_720x720q80.png' },
    { name: 'Matcha Latte',       price: 130, discount: 0.10, img: 'https://dunkin.co.uk/media/catalog/product/cache/59f43ce58882b8d0a2cdacb95e7b95d8/s/t/strawberry-and-white-chocolate-iced-matcha.png' },
    { name: 'Bagel Sandwich',     price: 150, discount: 0.15, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw-io3AOvuvL3r_ENEL0ljTKV5ClgopzYqRg&s' },
    { name: 'Strawberry Frosted', price: 30,  discount: 0.25, img: 'https://static.wixstatic.com/media/ce4f87_4abfa7553d48459295d6e895b5f8d682~mv2.png' },
    { name: 'Espresso Shot',      price: 65,  discount: 0.20, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmL8zRbo3FuwtCqHe68dxPVs6oXOgi8z0usQ&s' },
    { name: 'Vanilla Coolatta',   price: 120, discount: 0.15, img: 'https://www.eatthis.com/wp-content/uploads/sites/4/2024/02/Dunkin-Macchiato.jpg?quality=82&strip=all&w=640' }
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
        restaurant:'Dunkin Donuts', 
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
