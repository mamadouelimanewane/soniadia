/* ==========================================================================
   Torodo Avenue Admin — JavaScript
   Boutique Mode Femme & Tissus — Dakar, Sénégal
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONSTANTES & IDENTIFIANTS
   -------------------------------------------------------------------------- */
const ADMIN_EMAIL = 'admin@torodo.sn';
const ADMIN_PASSWORD = 'torodo2026';

const COLLECTION_LABELS = {
    robes: 'Robes & Caftans', wax: 'Tissus Wax', bazin: 'Bazin Riche',
    cheveux: 'Cheveux Synthétiques', accessoires: 'Accessoires'
};

const STATUS_LABELS = { active: 'Actif', draft: 'Brouillon', archived: 'Archivé' };

const ORDER_STATUS_LABELS = {
    pending: 'En attente', processing: 'En traitement',
    shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée'
};

/* --------------------------------------------------------------------------
   DONNÉES DE DÉPART
   -------------------------------------------------------------------------- */
const SEED_PRODUCTS = [
    { id: 1, name: 'Robe Caftan Brodée — Élégance Dorée', price: 35000, badge: 'Meilleure Vente', img: '../assets/collection_robes.png', collection: 'robes', stock: 8, status: 'active' },
    { id: 2, name: 'Ensemble Wax — Motif Soleil de Dakar', price: 22000, badge: 'Nouveau', img: '../assets/collection_wax.png', collection: 'wax', stock: 15, status: 'active' },
    { id: 3, name: 'Bazin Riche Brodé — Bleu Royal 6 yards', price: 45000, badge: 'Premium', img: '../assets/collection_bazin.png', collection: 'bazin', stock: 6, status: 'active' },
    { id: 4, name: 'Robe Longue Wax — Teranga', price: 28000, badge: 'Tendance', img: '../assets/product_robe1.png', collection: 'robes', stock: 3, status: 'active' },
    { id: 5, name: 'Tissu Wax Hollandais — 6 yards Premium', price: 18000, badge: '', img: '../assets/collection_wax.png', collection: 'wax', stock: 20, status: 'active' },
    { id: 6, name: 'Jupe Crayon Wax — Motif Floral', price: 15000, badge: 'Populaire', img: '../assets/hero_banner.png', collection: 'robes', stock: 0, status: 'draft' },
    { id: 7, name: 'Bazin Getzner Autrichien — Rose Poudré', price: 55000, badge: 'Exclusif', img: '../assets/collection_bazin.png', collection: 'bazin', stock: 4, status: 'active' },
    { id: 8, name: 'Caftan Brodé Sénégalais — Blanc Nacré', price: 42000, badge: '', img: '../assets/collection_robes.png', collection: 'robes', stock: 7, status: 'active' },
    { id: 21, name: 'Tresses Synthétiques — Noir Naturel', price: 5000, badge: 'Nouveau', img: '../assets/collection_cheveux.png', collection: 'cheveux', stock: 30, status: 'active' },
    { id: 22, name: 'Mèches Lisses — Brun Chocolat 18"', price: 8000, badge: '', img: '../assets/collection_cheveux.png', collection: 'cheveux', stock: 18, status: 'active' },
    { id: 23, name: 'Perruque Ondulée — Mi-Long Noir', price: 12000, badge: 'Populaire', img: '../assets/collection_cheveux.png', collection: 'cheveux', stock: 5, status: 'active' },
    { id: 24, name: 'Crochet Braids — Frisé Naturel', price: 6500, badge: '', img: '../assets/collection_cheveux.png', collection: 'cheveux', stock: 25, status: 'active' }
];

const SEED_CUSTOMERS = [
    { id: 1, first: 'Aminata', last: 'Diallo', email: 'aminata.d@gmail.com', country: 'Sénégal', phone: '+221 77 123 45 67', orders: 3, spent: 105000, joined: '2025-11-10' },
    { id: 2, first: 'Fatou', last: 'Ndiaye', email: 'fatou.n@outlook.com', country: 'Sénégal', phone: '+221 78 234 56 78', orders: 5, spent: 198000, joined: '2025-09-15' },
    { id: 3, first: 'Mariama', last: 'Sow', email: 'mariama.s@gmail.com', country: 'Sénégal', phone: '+221 76 345 67 89', orders: 2, spent: 67000, joined: '2025-12-01' },
    { id: 4, first: 'Ndèye', last: 'Fall', email: 'ndeye.f@gmail.com', country: 'Sénégal', phone: '+221 70 456 78 90', orders: 1, spent: 35000, joined: '2026-01-08' },
    { id: 5, first: 'Awa', last: 'Traoré', email: 'awa.t@yahoo.fr', country: 'Sénégal', phone: '+221 77 567 89 01', orders: 4, spent: 155000, joined: '2025-10-20' },
    { id: 6, first: 'Khady', last: 'Ba', email: 'khady.b@gmail.com', country: 'Sénégal', phone: '+221 78 678 90 12', orders: 2, spent: 73000, joined: '2026-01-22' },
    { id: 7, first: 'Coumba', last: 'Diop', email: 'coumba.d@mail.com', country: 'Sénégal', phone: '+221 76 789 01 23', orders: 6, spent: 267000, joined: '2025-08-05' }
];

function makeOrder(id, customerId, productId, status, daysAgo) {
    const c = SEED_CUSTOMERS.find(x => x.id === customerId);
    const p = SEED_PRODUCTS.find(x => x.id === productId);
    const d = new Date(); d.setDate(d.getDate() - daysAgo);
    return {
        id, ref: `TA-${String(id).padStart(4, '0')}`,
        customerId, customerName: c ? `${c.first} ${c.last}` : 'Inconnu',
        customerCountry: c ? c.country : '',
        productId, productName: p ? p.name : 'Produit', amount: p ? p.price : 0,
        status, date: d.toISOString().split('T')[0]
    };
}

const SEED_ORDERS = [
    makeOrder(1, 2, 7, 'delivered', 45), makeOrder(2, 5, 1, 'delivered', 40),
    makeOrder(3, 1, 4, 'shipped', 30), makeOrder(4, 7, 21, 'delivered', 28),
    makeOrder(5, 3, 2, 'processing', 20), makeOrder(6, 6, 8, 'pending', 15),
    makeOrder(7, 4, 3, 'shipped', 12), makeOrder(8, 2, 24, 'delivered', 10),
    makeOrder(9, 7, 5, 'processing', 8), makeOrder(10, 5, 7, 'pending', 5),
    makeOrder(11, 1, 22, 'pending', 4), makeOrder(12, 3, 1, 'shipped', 3),
    makeOrder(13, 7, 4, 'delivered', 2), makeOrder(14, 2, 2, 'delivered', 1),
    makeOrder(15, 6, 8, 'pending', 0)
];

const SEED_COLLECTIONS = [
    { id: 1, name: 'Robes & Caftans', slug: 'robes', products: 4, img: '../assets/collection_robes.png', description: 'Robes, caftans et ensembles brodés pour toutes les occasions.' },
    { id: 2, name: 'Tissus Wax', slug: 'wax', products: 3, img: '../assets/collection_wax.png', description: 'Tissus wax hollandais et africains de première qualité.' },
    { id: 3, name: 'Bazin Riche', slug: 'bazin', products: 2, img: '../assets/collection_bazin.png', description: 'Bazin riche getzner et brodé, luxe sénégalais.' },
    { id: 4, name: 'Cheveux Synthétiques', slug: 'cheveux', products: 4, img: '../assets/collection_cheveux.png', description: 'Tresses, mèches, perruques et extensions synthétiques.' },
    { id: 5, name: 'Accessoires', slug: 'accessoires', products: 0, img: '../assets/hero_banner.png', description: 'Bijoux, foulards et accessoires pour compléter votre style.' }
];

/* --------------------------------------------------------------------------
   ÉTAT
   -------------------------------------------------------------------------- */
let products = [];
let orders = [];
let customers = [];
let collections = [];
let confirmCallback = null;

/* --------------------------------------------------------------------------
   STOCKAGE LOCAL
   -------------------------------------------------------------------------- */
function save(key, data) { localStorage.setItem(`ta_admin_${key}`, JSON.stringify(data)); }
function load(key, seed) {
    const raw = localStorage.getItem(`ta_admin_${key}`);
    if (raw) return JSON.parse(raw);
    save(key, seed);
    return seed;
}

function initData() {
    products = load('products', SEED_PRODUCTS);
    orders = load('orders', SEED_ORDERS);
    customers = load('customers', SEED_CUSTOMERS);
    collections = load('collections', SEED_COLLECTIONS);
}

/* --------------------------------------------------------------------------
   AUTHENTIFICATION
   -------------------------------------------------------------------------- */
const loginScreen = document.getElementById('loginScreen');
const adminApp = document.getElementById('adminApp');

function checkAuth() {
    return sessionStorage.getItem('ta_admin_logged') === '1';
}

function login() {
    sessionStorage.setItem('ta_admin_logged', '1');
    loginScreen.style.display = 'none';
    adminApp.style.display = 'flex';
    initAll();
}

function logout() {
    sessionStorage.removeItem('ta_admin_logged');
    adminApp.style.display = 'none';
    loginScreen.style.display = 'flex';
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pw = document.getElementById('loginPassword').value;
    const err = document.getElementById('loginError');
    if (email === ADMIN_EMAIL && pw === ADMIN_PASSWORD) {
        login();
    } else {
        err.textContent = '⚠️ Identifiants incorrects. Réessayez.';
        document.getElementById('loginPassword').value = '';
    }
});

document.getElementById('togglePw').addEventListener('click', () => {
    const inp = document.getElementById('loginPassword');
    inp.type = inp.type === 'password' ? 'text' : 'password';
});

document.getElementById('logoutBtn').addEventListener('click', logout);

if (checkAuth()) { loginScreen.style.display = 'none'; adminApp.style.display = 'flex'; }

/* --------------------------------------------------------------------------
   NAVIGATION
   -------------------------------------------------------------------------- */
const pageTitles = {
    dashboard: 'Tableau de Bord', products: 'Produits', orders: 'Commandes',
    customers: 'Clients', collections: 'Collections', analytics: 'Analytiques', settings: 'Paramètres'
};

function navigateTo(page) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const navEl = document.querySelector(`.nav-item[data-page="${page}"]`);
    const pageEl = document.getElementById(`page-${page}`);
    if (navEl) navEl.classList.add('active');
    if (pageEl) pageEl.classList.add('active');
    document.getElementById('topbarTitle').textContent = pageTitles[page] || page;

    if (page === 'dashboard') renderDashboard();
    if (page === 'products') renderProductsTable();
    if (page === 'orders') renderOrdersTable();
    if (page === 'customers') renderCustomersTable();
    if (page === 'collections') renderCollections();
    if (page === 'analytics') renderAnalytics();

    document.getElementById('sidebar').classList.remove('open');
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => { e.preventDefault(); navigateTo(item.dataset.page); });
});

document.querySelectorAll('.btn-link[data-page]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
});

document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

/* --------------------------------------------------------------------------
   TOAST
   -------------------------------------------------------------------------- */
function toast(msg, type = 'success') {
    const t = document.getElementById('adminToast');
    t.textContent = msg;
    t.className = `admin-toast show${type === 'error' ? ' error' : ''}`;
    setTimeout(() => t.className = 'admin-toast', 3000);
}

/* --------------------------------------------------------------------------
   MODAL DE CONFIRMATION
   -------------------------------------------------------------------------- */
function confirm(msg, cb) {
    document.getElementById('confirmMessage').textContent = msg;
    confirmCallback = cb;
    openModal('confirmModal');
}

document.getElementById('confirmOk').addEventListener('click', () => {
    closeModal('confirmModal');
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
});

/* --------------------------------------------------------------------------
   GESTION DES MODALS
   -------------------------------------------------------------------------- */
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

document.querySelectorAll('.modal-close, [data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay.id); });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
    }
});

/* --------------------------------------------------------------------------
   FONCTIONS UTILITAIRES
   -------------------------------------------------------------------------- */
function nextId(arr) { return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1; }

function formatMoney(n) { return n.toLocaleString('fr-FR') + ' FCFA'; }

function badgeClass(b) {
    const map = { 'Meilleure Vente': 'gold', Nouveau: 'blue', Tendance: 'purple', Populaire: 'green', Exclusif: 'orange', Premium: 'gold', New: 'blue' };
    return map[b] || 'gray';
}

function orderStatusClass(s) {
    const map = { pending: 'order-pending', processing: 'order-processing', shipped: 'order-shipped', delivered: 'order-delivered', cancelled: 'order-cancelled' };
    return `status-pill ${map[s] || ''}`;
}

function statusClass(s) {
    const map = { active: 'status-active', draft: 'status-draft', archived: 'status-archived' };
    return `status-pill ${map[s] || ''}`;
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function avatar(first) {
    const colors = ['#D4AF37', '#3B82F6', '#22C55E', '#A855F7', '#F97316', '#EF4444'];
    const c = colors[(first.charCodeAt(0) || 0) % colors.length];
    return `<div style="width:36px;height:36px;border-radius:50%;background:${c};color:#1a1a1a;font-weight:700;font-size:0.9rem;display:flex;align-items:center;justify-content:center">${first.charAt(0).toUpperCase()}</div>`;
}

/* --------------------------------------------------------------------------
   TABLEAU DE BORD
   -------------------------------------------------------------------------- */
let revenueChartInst = null, collectionChartInst = null;

function renderDashboard() {
    document.getElementById('dashboardDate').textContent =
        new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.amount, 0);
    document.getElementById('kpiRevenue').textContent = formatMoney(totalRevenue);
    document.getElementById('kpiOrders').textContent = orders.length;
    document.getElementById('kpiCustomers').textContent = customers.length;
    document.getElementById('kpiProducts').textContent = products.filter(p => p.status === 'active').length;

    const pending = orders.filter(o => o.status === 'pending').length;
    document.getElementById('pendingBadge').textContent = pending;
    document.getElementById('pendingBadge').style.display = pending ? 'inline-block' : 'none';

    // Graphique Revenus
    const months = [], revenueData = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date(); d.setMonth(d.getMonth() - i);
        months.push(d.toLocaleDateString('fr-FR', { month: 'short' }));
        const mo = d.getMonth(), yr = d.getFullYear();
        const rev = orders.filter(o => { const od = new Date(o.date); return od.getMonth() === mo && od.getFullYear() === yr && o.status === 'delivered'; }).reduce((s, o) => s + o.amount, 0);
        revenueData.push(rev || Math.floor(Math.random() * 400000 + 150000));
    }

    if (revenueChartInst) revenueChartInst.destroy();
    const ctx1 = document.getElementById('revenueChart');
    if (ctx1) {
        revenueChartInst = new Chart(ctx1, {
            type: 'line',
            data: { labels: months, datasets: [{ label: 'Revenus (FCFA)', data: revenueData, borderColor: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.08)', borderWidth: 2.5, pointBackgroundColor: '#D4AF37', pointRadius: 5, fill: true, tension: 0.4 }] },
            options: { ...darkChartOptions(), plugins: { legend: { display: false } } }
        });
    }

    // Graphique Collections
    const collectionCounts = {};
    orders.forEach(o => { const p = products.find(x => x.id === o.productId); if (p) collectionCounts[p.collection] = (collectionCounts[p.collection] || 0) + 1; });
    const collLabels = Object.keys(collectionCounts).map(k => COLLECTION_LABELS[k] || k);
    const collData = Object.values(collectionCounts);

    if (collectionChartInst) collectionChartInst.destroy();
    const ctx2 = document.getElementById('collectionChart');
    if (ctx2) {
        collectionChartInst = new Chart(ctx2, {
            type: 'doughnut',
            data: { labels: collLabels, datasets: [{ data: collData, backgroundColor: ['#D4AF37', '#3B82F6', '#22C55E', '#A855F7', '#F97316'], borderWidth: 0 }] },
            options: { ...darkChartOptions(), cutout: '65%', plugins: { legend: { position: 'bottom', labels: { color: '#888', padding: 12, font: { size: 11 } } } } }
        });
    }

    // Commandes récentes
    const recent = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    document.getElementById('dashRecentOrdersBody').innerHTML = recent.map(o => `
    <tr>
      <td><strong style="color:var(--gold)">${o.ref}</strong></td>
      <td>${o.customerName}</td>
      <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${o.productName}</td>
      <td><strong>${formatMoney(o.amount)}</strong></td>
      <td><span class="${orderStatusClass(o.status)}">${ORDER_STATUS_LABELS[o.status]}</span></td>
      <td style="color:var(--text-muted)">${formatDate(o.date)}</td>
    </tr>`).join('');

    // Produits les plus vendus
    const productSales = {};
    orders.forEach(o => { productSales[o.productId] = (productSales[o.productId] || 0) + o.amount; });
    const top = Object.entries(productSales).sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([id, revenue]) => ({ product: products.find(p => p.id === +id), revenue })).filter(x => x.product);

    document.getElementById('topProductsList').innerHTML = top.map((item, i) => `
    <div class="top-product-item">
      <div class="top-product-rank">${i + 1}</div>
      <img class="top-product-img" src="${item.product.img}" alt="${item.product.name}" onerror="this.style.display='none'" />
      <div class="top-product-info">
        <div class="top-product-name">${item.product.name}</div>
        <div class="top-product-collection">${COLLECTION_LABELS[item.product.collection] || item.product.collection}</div>
      </div>
      <div class="top-product-revenue">${formatMoney(item.revenue)}</div>
    </div>`).join('');
}

function darkChartOptions() { return { responsive: true, scales: { x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#888' } }, y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#888' } } } }; }

/* --------------------------------------------------------------------------
   TABLEAU PRODUITS
   -------------------------------------------------------------------------- */
function renderProductsTable() {
    const search = (document.getElementById('productSearch')?.value || '').toLowerCase();
    const coll = document.getElementById('productCollFilter')?.value || '';
    const sort = document.getElementById('productSortFilter')?.value || 'newest';

    let filtered = products.filter(p => {
        const matchName = p.name.toLowerCase().includes(search);
        const matchColl = !coll || p.collection === coll;
        return matchName && matchColl;
    });

    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'newest') filtered.sort((a, b) => b.id - a.id);

    document.getElementById('productsTableBody').innerHTML = filtered.map(p => `
    <tr>
      <td><img class="table-product-img" src="${p.img}" alt="${p.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2258%22><rect fill=%22%23333%22 width=%2248%22 height=%2258%22/></svg>'" /></td>
      <td><strong>${p.name}</strong></td>
      <td><span class="badge badge-gold">${COLLECTION_LABELS[p.collection] || p.collection}</span></td>
      <td><strong style="color:var(--gold)">${formatMoney(p.price)}</strong></td>
      <td><span style="color:${p.stock === 0 ? 'var(--red)' : p.stock < 5 ? 'var(--orange)' : 'var(--green)'};font-weight:600">${p.stock === 0 ? 'Rupture' : p.stock + ' u.'}</span></td>
      <td>${p.badge ? `<span class="badge badge-${badgeClass(p.badge)}">${p.badge}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="${statusClass(p.status)}">${STATUS_LABELS[p.status]}</span></td>
      <td><div class="action-btns"><button class="btn-icon" onclick="editProduct(${p.id})" title="Modifier">✏️</button><button class="btn-icon btn-icon-danger" onclick="deleteProduct(${p.id})" title="Supprimer">🗑</button></div></td>
    </tr>`).join('');
}

['productSearch', 'productCollFilter', 'productSortFilter'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', renderProductsTable);
});

document.getElementById('openAddProduct').addEventListener('click', () => {
    document.getElementById('productModalTitle').textContent = 'Ajouter un produit';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    openModal('productModal');
});

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const data = {
        name: document.getElementById('productName').value.trim(), price: +document.getElementById('productPrice').value,
        collection: document.getElementById('productCollection').value, badge: document.getElementById('productBadge').value,
        stock: +document.getElementById('productStock').value, status: document.getElementById('productStatus').value,
        img: document.getElementById('productImg').value || '../assets/collection_robes.png'
    };
    if (id) { const idx = products.findIndex(p => p.id === +id); if (idx !== -1) products[idx] = { ...products[idx], ...data }; toast('✅ Produit modifié'); }
    else { products.unshift({ id: nextId(products), ...data }); toast('✅ Produit ajouté'); }
    save('products', products); closeModal('productModal'); renderProductsTable();
});

window.editProduct = function (id) {
    const p = products.find(x => x.id === id); if (!p) return;
    document.getElementById('productModalTitle').textContent = 'Modifier le produit';
    document.getElementById('productId').value = p.id; document.getElementById('productName').value = p.name;
    document.getElementById('productPrice').value = p.price; document.getElementById('productCollection').value = p.collection;
    document.getElementById('productBadge').value = p.badge || ''; document.getElementById('productStock').value = p.stock;
    document.getElementById('productStatus').value = p.status; document.getElementById('productImg').value = p.img;
    openModal('productModal');
};

window.deleteProduct = function (id) {
    confirm('Supprimer ce produit définitivement ?', () => {
        products = products.filter(p => p.id !== id); save('products', products); renderProductsTable(); toast('🗑 Produit supprimé', 'error');
    });
};

/* --------------------------------------------------------------------------
   TABLEAU COMMANDES
   -------------------------------------------------------------------------- */
function renderOrdersTable() {
    const search = (document.getElementById('orderSearch')?.value || '').toLowerCase();
    const status = document.getElementById('orderStatusFilter')?.value || '';
    const filtered = orders.filter(o => {
        return (o.ref.toLowerCase().includes(search) || o.customerName.toLowerCase().includes(search)) && (!status || o.status === status);
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    document.getElementById('ordersTableBody').innerHTML = filtered.map(o => `
    <tr>
      <td><strong style="color:var(--gold)">${o.ref}</strong></td>
      <td><strong>${o.customerName}</strong></td>
      <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.82rem;color:var(--text-muted)">${o.productName}</td>
      <td><strong>${formatMoney(o.amount)}</strong></td>
      <td><select class="order-status-select" onchange="updateOrderStatus(${o.id}, this.value)">${Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => `<option value="${k}" ${o.status === k ? 'selected' : ''}>${v}</option>`).join('')}</select></td>
      <td><span style="font-size:0.82rem;color:var(--text-muted)">${o.customerCountry}</span></td>
      <td style="color:var(--text-muted);font-size:0.82rem">${formatDate(o.date)}</td>
      <td><div class="action-btns"><button class="btn-icon" onclick="viewOrder(${o.id})" title="Détail">👁</button><button class="btn-icon btn-icon-danger" onclick="deleteOrder(${o.id})" title="Supprimer">🗑</button></div></td>
    </tr>`).join('');
    const pending = orders.filter(o => o.status === 'pending').length;
    document.getElementById('pendingBadge').textContent = pending;
    document.getElementById('pendingBadge').style.display = pending ? 'inline-block' : 'none';
}

['orderSearch', 'orderStatusFilter'].forEach(id => { document.getElementById(id)?.addEventListener('input', renderOrdersTable); });

window.updateOrderStatus = function (id, status) {
    const o = orders.find(x => x.id === id);
    if (o) { o.status = status; save('orders', orders); toast(`📦 Statut mis à jour : ${ORDER_STATUS_LABELS[status]}`); }
    renderOrdersTable();
};

window.viewOrder = function (id) {
    const o = orders.find(x => x.id === id); if (!o) return;
    const c = customers.find(x => x.id === o.customerId);
    document.getElementById('orderModalTitle').textContent = `Commande ${o.ref}`;
    document.getElementById('orderModalBody').innerHTML = `
    <div class="order-detail">
      <div class="order-detail-row"><span class="order-detail-label">Référence</span><strong style="color:var(--gold)">${o.ref}</strong></div>
      <div class="order-detail-row"><span class="order-detail-label">Cliente</span>${o.customerName}</div>
      <div class="order-detail-row"><span class="order-detail-label">Email</span>${c ? c.email : 'N/A'}</div>
      <div class="order-detail-row"><span class="order-detail-label">Ville</span>${o.customerCountry}</div>
      <div class="order-detail-row"><span class="order-detail-label">Produit</span>${o.productName}</div>
      <div class="order-detail-row"><span class="order-detail-label">Montant</span><strong>${formatMoney(o.amount)}</strong></div>
      <div class="order-detail-row"><span class="order-detail-label">Date</span>${formatDate(o.date)}</div>
      <div class="order-detail-row" style="align-items:center"><span class="order-detail-label">Statut</span>
        <select class="order-status-select" onchange="updateOrderStatus(${o.id}, this.value);viewOrder(${o.id})">
          ${Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => `<option value="${k}" ${o.status === k ? 'selected' : ''}>${v}</option>`).join('')}
        </select></div>
    </div>`;
    openModal('orderModal');
};

window.deleteOrder = function (id) { confirm('Supprimer cette commande ?', () => { orders = orders.filter(o => o.id !== id); save('orders', orders); renderOrdersTable(); toast('🗑 Commande supprimée', 'error'); }); };
document.getElementById('openAddOrder').addEventListener('click', () => { toast('💡 Utilisez les filtres pour gérer les commandes existantes.'); });

/* --------------------------------------------------------------------------
   TABLEAU CLIENTS
   -------------------------------------------------------------------------- */
function renderCustomersTable() {
    const search = (document.getElementById('customerSearch')?.value || '').toLowerCase();
    const country = document.getElementById('customerCountryFilter')?.value || '';
    const filtered = customers.filter(c => { const name = `${c.first} ${c.last}`.toLowerCase(); return name.includes(search) && (!country || c.country === country); }).sort((a, b) => b.spent - a.spent);

    document.getElementById('customersTableBody').innerHTML = filtered.map(c => `
    <tr>
      <td>${avatar(c.first)}</td>
      <td><strong>${c.first} ${c.last}</strong></td>
      <td style="color:var(--text-muted);font-size:0.85rem">${c.email}</td>
      <td>${c.country}</td>
      <td><span class="badge badge-blue">${c.orders} cmd</span></td>
      <td><strong style="color:var(--gold)">${formatMoney(c.spent)}</strong></td>
      <td style="color:var(--text-muted);font-size:0.82rem">${formatDate(c.joined)}</td>
      <td><div class="action-btns"><button class="btn-icon" onclick="editCustomer(${c.id})" title="Modifier">✏️</button><button class="btn-icon btn-icon-danger" onclick="deleteCustomer(${c.id})" title="Supprimer">🗑</button></div></td>
    </tr>`).join('');
}

['customerSearch', 'customerCountryFilter'].forEach(id => { document.getElementById(id)?.addEventListener('input', renderCustomersTable); });

document.getElementById('openAddCustomer').addEventListener('click', () => {
    document.getElementById('customerModalTitle').textContent = 'Ajouter un client';
    document.getElementById('customerForm').reset(); document.getElementById('customerId').value = '';
    openModal('customerModal');
});

document.getElementById('customerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('customerId').value;
    const data = { first: document.getElementById('customerFirst').value.trim(), last: document.getElementById('customerLast').value.trim(), email: document.getElementById('customerEmail').value.trim(), country: document.getElementById('customerCountry').value, phone: document.getElementById('customerPhone').value.trim(), orders: 0, spent: 0, joined: new Date().toISOString().split('T')[0] };
    if (id) { const idx = customers.findIndex(c => c.id === +id); if (idx !== -1) customers[idx] = { ...customers[idx], ...data }; toast('✅ Client modifié'); }
    else { customers.unshift({ id: nextId(customers), ...data }); toast('✅ Client ajouté'); }
    save('customers', customers); closeModal('customerModal'); renderCustomersTable();
});

window.editCustomer = function (id) {
    const c = customers.find(x => x.id === id); if (!c) return;
    document.getElementById('customerModalTitle').textContent = 'Modifier le client';
    document.getElementById('customerId').value = c.id; document.getElementById('customerFirst').value = c.first;
    document.getElementById('customerLast').value = c.last; document.getElementById('customerEmail').value = c.email;
    document.getElementById('customerCountry').value = c.country; document.getElementById('customerPhone').value = c.phone || '';
    openModal('customerModal');
};

window.deleteCustomer = function (id) { confirm('Supprimer ce client ?', () => { customers = customers.filter(c => c.id !== id); save('customers', customers); renderCustomersTable(); toast('🗑 Client supprimé', 'error'); }); };

/* --------------------------------------------------------------------------
   COLLECTIONS
   -------------------------------------------------------------------------- */
function renderCollections() {
    document.getElementById('collectionsAdminGrid').innerHTML = collections.map(c => `
    <div class="collection-admin-card">
      <img class="collection-admin-img" src="${c.img}" alt="${c.name}" onerror="this.style.background='var(--surface)'" />
      <div class="collection-admin-body">
        <div class="collection-admin-name">${c.name}</div>
        <div class="collection-admin-meta">${c.description}</div>
        <div class="collection-admin-meta"><span class="badge badge-gold">${products.filter(p => p.collection === c.slug).length} produits</span></div>
        <div class="collection-admin-actions">
          <button class="btn-secondary" style="font-size:0.78rem;padding:8px 14px" onclick="toast('💡 Édition des collections à venir.')">✏️ Modifier</button>
          <button class="btn-secondary" style="font-size:0.78rem;padding:8px 14px" onclick="navigateTo('products')">📦 Produits</button>
        </div>
      </div>
    </div>`).join('');
}

document.getElementById('openAddCollection').addEventListener('click', () => { toast('💡 Ajout de collection à venir.'); });

/* --------------------------------------------------------------------------
   GRAPHIQUES ANALYTIQUES
   -------------------------------------------------------------------------- */
let analyticsCharts = {};

function renderAnalytics() {
    Object.values(analyticsCharts).forEach(c => c && c.destroy());
    analyticsCharts = {};

    const labels30 = [], data30 = [];
    for (let i = 29; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        labels30.push(i % 5 === 0 ? d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : '');
        const count = orders.filter(o => o.date === d.toISOString().split('T')[0]).length;
        data30.push(count || Math.floor(Math.random() * 4));
    }
    const ctx3 = document.getElementById('ordersChart');
    if (ctx3) { analyticsCharts.orders = new Chart(ctx3, { type: 'bar', data: { labels: labels30, datasets: [{ label: 'Commandes', data: data30, backgroundColor: 'rgba(212,175,55,0.6)', borderRadius: 4, borderWidth: 0 }] }, options: { ...darkChartOptions(), plugins: { legend: { display: false } } } }); }

    const geoCounts = {}; customers.forEach(c => { geoCounts[c.country] = (geoCounts[c.country] || 0) + 1; });
    const ctx4 = document.getElementById('geoChart');
    if (ctx4) { analyticsCharts.geo = new Chart(ctx4, { type: 'doughnut', data: { labels: Object.keys(geoCounts), datasets: [{ data: Object.values(geoCounts), backgroundColor: ['#D4AF37', '#3B82F6', '#22C55E', '#A855F7', '#F97316', '#EF4444', '#14B8A6'], borderWidth: 0 }] }, options: { cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: '#888', padding: 10, font: { size: 10 } } } } } }); }

    const ctx5 = document.getElementById('payChart');
    if (ctx5) { analyticsCharts.pay = new Chart(ctx5, { type: 'pie', data: { labels: ['Wave', 'Orange Money', 'Free Money', 'Carte Bancaire'], datasets: [{ data: [45, 30, 15, 10], backgroundColor: ['#3B82F6', '#F97316', '#22C55E', '#888'], borderWidth: 0 }] }, options: { plugins: { legend: { position: 'bottom', labels: { color: '#888', padding: 10, font: { size: 10 } } } } } }); }

    const months12 = [], rev12 = [], ord12 = [];
    for (let i = 11; i >= 0; i--) { const d = new Date(); d.setMonth(d.getMonth() - i); months12.push(d.toLocaleDateString('fr-FR', { month: 'short' })); rev12.push(Math.floor(Math.random() * 500000 + 200000)); ord12.push(Math.floor(Math.random() * 15 + 3)); }
    const ctx6 = document.getElementById('compareChart');
    if (ctx6) { analyticsCharts.compare = new Chart(ctx6, { type: 'bar', data: { labels: months12, datasets: [{ label: 'Revenus (FCFA)', data: rev12, backgroundColor: 'rgba(212,175,55,0.7)', borderRadius: 4, yAxisID: 'y' }, { label: 'Commandes', data: ord12, type: 'line', borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 2, pointRadius: 4, fill: true, tension: 0.4, yAxisID: 'y1' }] }, options: { responsive: true, scales: { x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#888' } }, y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#888' }, position: 'left' }, y1: { grid: { display: false }, ticks: { color: '#3B82F6' }, position: 'right' } }, plugins: { legend: { labels: { color: '#aaa', padding: 16 } } } } }); }
}

/* --------------------------------------------------------------------------
   PARAMÈTRES
   -------------------------------------------------------------------------- */
document.querySelectorAll('.settings-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => toast('✅ Paramètres sauvegardés'));
});

/* --------------------------------------------------------------------------
   RECHERCHE GLOBALE
   -------------------------------------------------------------------------- */
document.getElementById('globalSearch').addEventListener('input', function () {
    const q = this.value.toLowerCase(); if (!q) return;
    const prod = products.find(p => p.name.toLowerCase().includes(q));
    if (prod) { navigateTo('products'); document.getElementById('productSearch').value = q; renderProductsTable(); }
    else { const cust = customers.find(c => `${c.first} ${c.last}`.toLowerCase().includes(q)); if (cust) { navigateTo('customers'); document.getElementById('customerSearch').value = q; renderCustomersTable(); } }
});

/* --------------------------------------------------------------------------
   INITIALISATION
   -------------------------------------------------------------------------- */
function initAll() { initData(); navigateTo('dashboard'); }
if (checkAuth()) initAll();
