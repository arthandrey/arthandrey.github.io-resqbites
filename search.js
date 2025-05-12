// search.js
document.addEventListener('DOMContentLoaded', () => {
  const params    = new URLSearchParams(location.search);
  const rawQuery  = params.get('q') || '';
  const query     = rawQuery.trim().toLowerCase();
  const titleEl   = document.getElementById('search-title');
  const container = document.getElementById('search-results');

  if (rawQuery) {
    const headerText = `Search Results for "${rawQuery}"`;
    titleEl.textContent = headerText;

    document.title = `${headerText} – RESQBITES`;

  } else {
    titleEl.textContent = 'Please enter a search term';
    return;
  }

  const displayNames = {
    jollibee:   'Jollibee',
    chowking:   'Chowking',
    mcdonalds:  "McDonald's",
    dunkin:     'Dunkin Donuts',
    burgerking: 'Burger King'
  };
  const prettyNorm = Object.fromEntries(
    Object.entries(displayNames).map(([k,v]) =>
      [k, v.toLowerCase().replace(/\s+/g, '')]
    )
  );
  const normQuery = query.replace(/\s+/g, '');

  const productsData = {
    jollibee: [
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
    ],
    chowking: [
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
    ],
    mcdonalds: [
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
    ],
    dunkin: [
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
    ],
    burgerking: [
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
    ]
  };

  // renderProduct now creates a flex-row with an Add button
  function renderProduct(p, restKey, idx) {
    const discounted = (p.price * (1 - p.discount)).toFixed(2);
    const card = document.createElement('div');
    card.className = 'search-item-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="search-item-img">
      <div class="search-item-details">
        <h3>${displayNames[restKey]} – ${p.name}</h3>
        <div class="search-item-price">
          <span class="price">₱${p.price.toFixed(2)}</span>
          <span class="discounted">₱${discounted}</span>
        </div>
      </div>
      <button class="add-cart-btn" data-rest="${restKey}" data-idx="${idx}">
        Add to Cart
      </button>
    `;
    container.appendChild(card);

    card.querySelector('.add-cart-btn')
      .addEventListener('click', e => {
        const i = productsData[restKey][idx];
        const disc = parseFloat((i.price*(1-i.discount)).toFixed(2));
        const cart = getCart();
        cart.push({
          restaurant: displayNames[restKey],
          name:       i.name,
          img:        i.img,
          original:   i.price,
          price:      disc
        });
        setCart(cart);
        updateCartCount();
      });
  }

  let found = false;
  // a) Restaurant‐level substring match
  for (const restKey in productsData) {
    const keyMatch    = restKey.includes(normQuery);
    const prettyMatch = prettyNorm[restKey].includes(normQuery);
    if (keyMatch || prettyMatch) {
      found = true;
      productsData[restKey].forEach((p,i) => renderProduct(p, restKey, i));
      break;
    }
  }

  // product‐name substring match
  if (!found) {
    for (const restKey in productsData) {
      productsData[restKey].forEach((p,i) => {
        if (p.name.toLowerCase().includes(query)) {
          found = true;
          renderProduct(p, restKey, i);
        }
      });
    }
  }
  if (!found) {
    container.innerHTML = '<p class="no-match">No matches found.</p>';
  }
});
