// mcdonalds.js
document.addEventListener('DOMContentLoaded', ()=>{
  const products = [
    { name: 'Big Mac',                   price: 185, discount: 0.20, img: 'https://media.cnn.com/api/v1/images/stellar/prod/240110090823-mcdonalds-double-big-mac-011024.jpg?c=original' },
    { name: 'Fries',               price:  79, discount: 0.15, img: 'https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-fries-medium-april-promo:nutrition-calculator-tile?wid=822&hei=822&dpr=off' },
    { name: 'McFlurry',                  price:  79, discount: 0.10, img: 'https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-oreo-mcflurry-March-New-promo:nutrition-calculator-tile?wid=822&hei=822&dpr=off' },
    { name: 'McChicken',                 price:  99, discount: 0.25, img: 'https://mcdomenu.ph/wp-content/uploads/2024/09/1pc-Chicken-McDo-with-Rice.webp' },
    { name: 'Quarter Pounder',           price: 195, discount: 0.15, img: 'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202201_0007-005_QuarterPounderwithCheese_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off' },
    { name: 'Filet-O-Fish',              price: 129, discount: 0.10, img: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202302_5926-999_Filet-O-Fish_HalfSlice_Alt_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off' },
    { name: 'Iced Caramel Latte',        price: 140, discount: 0.15, img: 'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_201906_0379_MediumIcedCaramelLatte_Glass_A1_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off' },
    { name: 'Chocolate Shake',     price: 110, discount: 0.20, img: 'https://www.mcdonalds.co.za/media/products/medium-chocolate-shake/Chocolate-Shake.png' },
    { name: 'Nuggets',           price:  99, discount: 0.20, img: 'https://assets.vegconom.de/media/wp-content/uploads/sites/3/2024/10/08093811/McPlant-Nuggets-Die-vorsichtige-Veggie-Strategie-von-McDonald-_jsonld.jpg' },
    { name: 'Apple Pie',                 price:  45, discount: 0.25, img: 'https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-ApplePie:1-3-product-tile-desktop?wid=829&hei=515&dpr=off' }
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
        restaurant:'McDonald\'s', 
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
