/* ==========================================================================
   Torodo Avenue — JavaScript Principal
   Boutique Mode Femme & Tissus — Dakar, Sénégal
   ========================================================================== */

/* --------------------------------------------------------------------------
   DONNÉES — Catalogue Produits
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: 1,
    name: 'Robe Caftan Brodée — Élégance Dorée',
    price: 35000,
    badge: 'Meilleure Vente',
    img: 'assets/collection_robes.png',
    collection: 'robes'
  },
  {
    id: 2,
    name: 'Ensemble Wax — Motif Soleil de Dakar',
    price: 22000,
    badge: 'Nouveau',
    img: 'assets/collection_wax.png',
    collection: 'wax'
  },
  {
    id: 3,
    name: 'Bazin Riche Brodé — Bleu Royal 6 yards',
    price: 45000,
    badge: 'Premium',
    img: 'assets/collection_bazin.png',
    collection: 'bazin'
  },
  {
    id: 4,
    name: 'Robe Longue Wax — Teranga',
    price: 28000,
    badge: 'Tendance',
    img: 'assets/product_robe1.png',
    collection: 'robes'
  },
  {
    id: 5,
    name: 'Tissu Wax Hollandais — 6 yards Premium',
    price: 18000,
    badge: '',
    img: 'assets/collection_wax.png',
    collection: 'wax'
  },
  {
    id: 6,
    name: 'Jupe Crayon Wax — Motif Floral',
    price: 15000,
    badge: 'Populaire',
    img: 'assets/hero_banner.png',
    collection: 'robes'
  },
  {
    id: 7,
    name: 'Bazin Getzner Autrichien — Rose Poudré',
    price: 55000,
    badge: 'Exclusif',
    img: 'assets/collection_bazin.png',
    collection: 'bazin'
  },
  {
    id: 8,
    name: 'Caftan Brodé Sénégalais — Blanc Nacré',
    price: 42000,
    badge: '',
    img: 'assets/collection_robes.png',
    collection: 'robes'
  }
];

const CHEVEUX_PRODUCTS = [
  {
    id: 21,
    name: 'Tresses Synthétiques — Noir Naturel',
    price: 5000,
    badge: 'Nouveau',
    img: 'assets/collection_cheveux.png'
  },
  {
    id: 22,
    name: 'Mèches Lisses — Brun Chocolat 18"',
    price: 8000,
    badge: '',
    img: 'assets/collection_cheveux.png'
  },
  {
    id: 23,
    name: 'Perruque Ondulée — Mi-Long Noir',
    price: 12000,
    badge: 'Populaire',
    img: 'assets/collection_cheveux.png'
  },
  {
    id: 24,
    name: 'Crochet Braids — Frisé Naturel',
    price: 6500,
    badge: '',
    img: 'assets/collection_cheveux.png'
  }
];

/* --------------------------------------------------------------------------
   Panier
   -------------------------------------------------------------------------- */
let cart = [];

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function formatPrice(n) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

function addToCart(productId) {
  const product = [...PRODUCTS, ...CHEVEUX_PRODUCTS].find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`Produit "${product.name}" ajouté au panier !`);
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
        <div class="cart-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>
        <p>Votre panier est vide.</p>
        <a href="#produits" class="btn btn-gold" onclick="closeCart()">Commencer vos Achats</a>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  totalEl.textContent = formatPrice(getCartTotal());

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
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
  const item = cart.find(i => id === i.id);
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
   Tiroir Panier
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
   Navigation Mobile
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
   Diaporama Héro
   -------------------------------------------------------------------------- */
let currentSlide = 0;
let sliderInterval;

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;
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
   Rendu des Produits
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
        <p class="product-price">${formatPrice(product.price)}</p>
      </div>
    </div>
  `;
}

if (document.getElementById('productsGrid')) {
  document.getElementById('productsGrid').innerHTML = PRODUCTS.map(createProductCard).join('');
}
if (document.getElementById('cheveuxGrid')) {
  document.getElementById('cheveuxGrid').innerHTML = CHEVEUX_PRODUCTS.map(createProductCard).join('');
}

/* --------------------------------------------------------------------------
   Animation au Défilement (Intersection Observer)
   Enregistré APRÈS l'injection des produits
   -------------------------------------------------------------------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.product-card, .collection-card, .testimonial-card, .feature-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* --------------------------------------------------------------------------
   Effet de Défilement de l'En-tête
   -------------------------------------------------------------------------- */
window.addEventListener('scroll', () => {
  const header = document.getElementById('mainHeader');
  if (!header) return;
  if (window.scrollY > 80) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

/* --------------------------------------------------------------------------
   Notification
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* --------------------------------------------------------------------------
   Newsletter
   -------------------------------------------------------------------------- */
function subscribeNewsletter(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletterEmail');
  if (!emailInput) return;
  const email = emailInput.value;
  if (email) {
    showToast(`Bienvenue dans la communauté Torodo Avenue, ${email} !`);
    emailInput.value = '';
  }
}

/* --------------------------------------------------------------------------
   Clavier & Accessibilité
   -------------------------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
    closeMobileMenu();
  }
});
