/* ==========================================================================
   SooWigs — Main JavaScript
   ========================================================================== */

/* --------------------------------------------------------------------------
   DATA — Products Catalogue
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: 1,
    name: 'Bone Straight 26" — Noir Jet',
    price: 289,
    badge: 'Bestseller',
    img: 'assets/product_wig1.png',
    collection: 'raw'
  },
  {
    id: 2,
    name: 'Balayage Wavy 20" — Miel',
    price: 345,
    badge: 'Nouveau',
    img: 'assets/product_wig2.png',
    collection: 'balayage'
  },
  {
    id: 3,
    name: 'Indian Raw Bodywave 14" + 6x6 HD',
    price: 320,
    badge: '',
    img: 'assets/collection_brown.png',
    collection: 'indian'
  },
  {
    id: 4,
    name: 'Caramel Brown Straight 18"',
    price: 299,
    badge: 'Tendance',
    img: 'assets/collection_balayage.png',
    collection: 'brown'
  },
  {
    id: 5,
    name: 'Vietnamese Single Donor 14" + 13x6',
    price: 375,
    badge: '',
    img: 'assets/hero_banner.png',
    collection: 'vietnamese'
  },
  {
    id: 6,
    name: 'Coco Brown Body Wave 22"',
    price: 265,
    badge: 'Populaire',
    img: 'assets/collection_raw.png',
    collection: 'brown'
  },
  {
    id: 7,
    name: 'Blondie Balayage 20" Frontal',
    price: 399,
    badge: 'Exclusif',
    img: 'assets/product_wig2.png',
    collection: 'balayage'
  },
  {
    id: 8,
    name: 'Raw Vietnamese 16" + 6x6 HD Lace',
    price: 340,
    badge: '',
    img: 'assets/product_wig1.png',
    collection: 'raw'
  }
];

const BALAYAGE_PRODUCTS = [
  {
    id: 21,
    name: 'Being Blonde',
    price: 390,
    badge: 'New',
    img: 'assets/product_wig2.png'
  },
  {
    id: 22,
    name: 'Wig Cassie',
    price: 355,
    badge: '',
    img: 'assets/collection_balayage.png'
  },
  {
    id: 23,
    name: 'Blondie Wavy',
    price: 370,
    badge: 'Bestseller',
    img: 'assets/product_wig1.png'
  },
  {
    id: 24,
    name: 'Khaleesi Unit',
    price: 420,
    badge: 'Exclusif',
    img: 'assets/collection_raw.png'
  }
];

/* --------------------------------------------------------------------------
   Cart State
   -------------------------------------------------------------------------- */
let cart = [];

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function addToCart(productId) {
  const product = [...PRODUCTS, ...BALAYAGE_PRODUCTS].find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`✨ "${product.name}" ajouté au panier !`);
}

function updateCartUI() {
  const count = getCartCount();
  document.getElementById('cartCount').textContent = count;

  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Votre panier est vide.</p>
        <a href="#produits" class="btn btn-gold" onclick="closeCart()">Commencer à Shopper</a>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  totalEl.textContent = getCartTotal().toLocaleString('fr-FR') + ' €';

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price} €</p>
        <div class="cart-item-controls">
          <button onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button class="cart-remove" onclick="removeFromCart(${item.id})">🗑</button>
        </div>
      </div>
    </div>
  `).join('');
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

/* --------------------------------------------------------------------------
   Cart Drawer Toggle
   -------------------------------------------------------------------------- */
function openCart() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('cartBtn').addEventListener('click', openCart);

/* --------------------------------------------------------------------------
   Mobile Nav
   -------------------------------------------------------------------------- */
function openMobileMenu() {
  document.getElementById('mobileOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobileOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('hamburger').addEventListener('click', openMobileMenu);
document.getElementById('overlayClose').addEventListener('click', closeMobileMenu);

/* --------------------------------------------------------------------------
   Hero Slider
   -------------------------------------------------------------------------- */
let currentSlide = 0;
let sliderInterval;

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
  resetSliderTimer();
}

function prevSlide() {
  goToSlide(currentSlide - 1);
  resetSliderTimer();
}

function startSliderTimer() {
  sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
}

function resetSliderTimer() {
  clearInterval(sliderInterval);
  startSliderTimer();
}

startSliderTimer();

/* --------------------------------------------------------------------------
   Render Products
   -------------------------------------------------------------------------- */
function createProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img src="${product.img}" alt="${product.name}" class="product-image" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <div class="product-actions">
          <button class="add-to-cart" onclick="addToCart(${product.id})">+ Ajouter au Panier</button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price} €</p>
      </div>
    </div>
  `;
}

document.getElementById('productsGrid').innerHTML = PRODUCTS.map(createProductCard).join('');
document.getElementById('balayageGrid').innerHTML = BALAYAGE_PRODUCTS.map(createProductCard).join('');

/* --------------------------------------------------------------------------
   Reveal on Scroll (Intersection Observer)
   Registered AFTER products are injected so dynamic cards are included
   -------------------------------------------------------------------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // stop observing once visible
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.product-card, .collection-card, .testimonial-card, .feature-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* --------------------------------------------------------------------------
   Header Scroll Effect
   -------------------------------------------------------------------------- */
window.addEventListener('scroll', () => {
  const header = document.getElementById('mainHeader');
  if (window.scrollY > 80) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

/* --------------------------------------------------------------------------
   Toast Notification
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* --------------------------------------------------------------------------
   Newsletter
   -------------------------------------------------------------------------- */
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  if (email) {
    showToast(`💌 Bienvenue dans le cercle SooWigs, ${email} !`);
    document.getElementById('newsletterEmail').value = '';
  }
}

/* --------------------------------------------------------------------------
   Keyboard & Accessibility
   -------------------------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
    closeMobileMenu();
  }
});
