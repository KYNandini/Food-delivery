import './style.css'

// Mock Data
const data = {
  categories: [
    { id: 1, name: 'Burger', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Sushi', icon: '🍣' },
    { id: 4, name: 'Dessert', icon: '🍩' },
    { id: 5, name: 'Drinks', icon: '🥤' }
  ],
  restaurants: [
    {
      id: 1,
      name: 'Burger Joint',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      time: '15-25 min',
      price: '$$',
      category: 'Burger',
      menu: [
        { id: 101, name: 'Classic Cheeseburger', desc: 'Beef patty, cheddar, lettuce, tomato, special sauce', price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 102, name: 'Double Bacon Burger', desc: 'Two beef patties, bacon, cheddar, BBQ sauce', price: 12.99, image: 'https://images.unsplash.com/photo-1594212202875-861111812796?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 103, name: 'Fries', desc: 'Crispy golden fries', price: 3.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 2,
      name: 'Pizza Paradiso',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      time: '30-40 min',
      price: '$$$',
      category: 'Pizza',
      menu: [
        { id: 201, name: 'Margherita', desc: 'Tomato sauce, fresh mozzarella, basil', price: 14.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 202, name: 'Pepperoni', desc: 'Tomato sauce, mozzarella, pepperoni slices', price: 16.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 3,
      name: 'Sushi Zen',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      time: '25-35 min',
      price: '$$$',
      category: 'Sushi',
      menu: [
        { id: 301, name: 'Spicy Tuna Roll', desc: 'Fresh tuna, spicy mayo, cucumber', price: 11.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 302, name: 'Salmon Nigiri', desc: 'Fresh salmon over pressed vinegar rice (2pcs)', price: 7.99, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    }
  ],
  orders: [
    { id: 'ORD-8291', restaurantId: 1, items: [{name: 'Classic Cheeseburger', qty: 1}, {name: 'Fries', qty: 1}], total: 12.98, status: 'preparing', date: 'Today, 7:30 PM' },
    { id: 'ORD-7102', restaurantId: 2, items: [{name: 'Margherita', qty: 1}], total: 14.99, status: 'delivered', date: 'Yesterday, 8:15 PM' }
  ]
};

// State
let state = {
  cart: [],
  user: null,
  activeView: 'home',
  activeCategory: 'All',
  selectedRestaurant: null
};

// Elements
const els = {
  views: document.querySelectorAll('.view'),
  navItems: document.querySelectorAll('.nav-item'),
  cartBadge: document.getElementById('cart-badge'),
  cartDrawer: document.getElementById('cart-drawer'),
  drawerOverlay: document.getElementById('drawer-overlay'),
  cartItemsContainer: document.getElementById('cart-items-container'),
  cartTotalPrice: document.getElementById('cart-total-price'),
  authModal: document.getElementById('auth-modal'),
  loginForm: document.getElementById('login-form'),
  logoutBtn: document.getElementById('logout-btn'),
  userName: document.querySelector('.user-name'),
  profileEmail: document.getElementById('profile-email')
};

// Init
function init() {
  checkAuth();
  renderCategories();
  renderRestaurants();
  renderOrders();
  setupEventListeners();
  updateCartUI();
}

// Auth
function checkAuth() {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    state.user = JSON.parse(savedUser);
    els.authModal.classList.remove('show');
    updateUserUI();
  } else {
    els.authModal.classList.add('show');
  }
}

function updateUserUI() {
    if(state.user) {
        if(els.userName) els.userName.innerText = state.user.name;
        if(els.profileEmail) els.profileEmail.innerText = state.user.email;
        const profileName = document.querySelector('.profile-card h3');
        if(profileName) profileName.innerText = state.user.name;
    }
}

function login(e) {
  e.preventDefault();
  const emailInput = document.getElementById('email').value;
  const name = emailInput.split('@')[0] || 'User';
  
  state.user = { name: name.charAt(0).toUpperCase() + name.slice(1), email: emailInput };
  localStorage.setItem('user', JSON.stringify(state.user));
  els.authModal.classList.remove('show');
  updateUserUI();
}

function logout() {
  state.user = null;
  localStorage.removeItem('user');
  state.cart = [];
  updateCartUI();
  els.authModal.classList.add('show');
  navigate('home');
}

// Navigation
function navigate(viewId) {
  els.views.forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${viewId}`).classList.add('active');
  
  els.navItems.forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-target="${viewId}"]`);
  if (navItem) navItem.classList.add('active');

  state.activeView = viewId;
  
  // Hide header and bottom nav on restaurant details view
  if(viewId === 'restaurant') {
    document.getElementById('main-header').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'none';
  } else {
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'flex';
  }
}

// Render Functions
function renderCategories() {
  const container = document.getElementById('categories-container');
  let html = `
    <div class="category-chip active" onclick="app.filterCategory('All')">
      <div class="category-icon">🍽️</div>
      <span class="category-name">All</span>
    </div>
  `;
  
  data.categories.forEach(c => {
    html += `
      <div class="category-chip" onclick="app.filterCategory('${c.name}')">
        <div class="category-icon">${c.icon}</div>
        <span class="category-name">${c.name}</span>
      </div>
    `;
  });
  container.innerHTML = html;
}

function filterCategory(name) {
  state.activeCategory = name;
  const chips = document.querySelectorAll('.category-chip');
  chips.forEach(c => {
    if(c.querySelector('.category-name').innerText === name) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });
  renderRestaurants();
}

function renderRestaurants() {
  const container = document.getElementById('restaurants-container');
  const filtered = state.activeCategory === 'All' 
    ? data.restaurants 
    : data.restaurants.filter(r => r.category === state.activeCategory);
    
  if(filtered.length === 0) {
    container.innerHTML = `<p style="color: var(--text-secondary); text-align:center; padding: 20px;">No restaurants found.</p>`;
    return;
  }
  
  container.innerHTML = filtered.map(r => `
    <div class="restaurant-card" onclick="app.openRestaurant(${r.id})">
      <img src="${r.image}" class="restaurant-img" alt="${r.name}">
      <div class="restaurant-info">
        <div class="restaurant-header">
          <span class="restaurant-name">${r.name}</span>
          <span class="restaurant-rating">
            <span class="material-icons-round">star</span> ${r.rating}
          </span>
        </div>
        <div class="restaurant-meta">
          <div class="meta-item"><span class="material-icons-round">schedule</span> ${r.time}</div>
          <div class="meta-item"><span class="material-icons-round">delivery_dining</span> Free</div>
          <div class="meta-item">${r.price} • ${r.category}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function openRestaurant(id) {
  const restaurant = data.restaurants.find(r => r.id === id);
  if(!restaurant) return;
  state.selectedRestaurant = restaurant;
  
  // Populate UI
  document.getElementById('restaurant-hero').style.backgroundImage = `url(${restaurant.image})`;
  document.getElementById('restaurant-title').innerText = restaurant.name;
  document.getElementById('restaurant-meta').innerText = `${restaurant.rating} ★ • ${restaurant.time} • ${restaurant.price}`;
  
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = restaurant.menu.map(m => `
    <div class="menu-item">
      <div class="menu-item-info">
        <div class="menu-item-name">${m.name}</div>
        <div class="menu-item-desc">${m.desc}</div>
        <div class="menu-item-price">$${m.price.toFixed(2)}</div>
      </div>
      <div>
        <img src="${m.image}" class="menu-item-img" alt="${m.name}">
        <div style="display:flex; justify-content:center;">
          <button class="add-btn" onclick="app.addToCart(${restaurant.id}, ${m.id})">
            <span class="material-icons-round">add</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  navigate('restaurant');
}

function renderOrders() {
  const activeContainer = document.getElementById('active-orders-container');
  const pastContainer = document.getElementById('past-orders-container');
  
  const activeOrders = data.orders.filter(o => o.status !== 'delivered');
  const pastOrders = data.orders.filter(o => o.status === 'delivered');
  
  const renderOrderList = (orders) => orders.length ? orders.map(o => {
    const r = data.restaurants.find(r => r.id === o.restaurantId);
    return `
      <div class="order-card">
        <div class="order-header">
          <span class="order-id">${o.id}</span>
          <span class="order-status ${o.status === 'delivered' ? 'delivered' : ''}">${o.status}</span>
        </div>
        <div class="order-restaurant">${r ? r.name : 'Unknown Restaurant'}</div>
        <div class="order-items">${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</div>
        <div class="order-footer">
          <span style="color:var(--text-secondary); font-size:13px;">${o.date}</span>
          <span class="order-total">$${o.total.toFixed(2)}</span>
        </div>
      </div>
    `;
  }).join('') : '<p style="color:var(--text-secondary);">No orders found.</p>';
  
  activeContainer.innerHTML = renderOrderList(activeOrders);
  pastContainer.innerHTML = renderOrderList(pastOrders);
}

// Cart Logic
function addToCart(restaurantId, itemId) {
  const restaurant = data.restaurants.find(r => r.id === restaurantId);
  const item = restaurant.menu.find(m => m.id === itemId);
  
  const existing = state.cart.find(c => c.item.id === itemId);
  if(existing) {
    existing.qty++;
  } else {
    state.cart.push({ restaurant, item, qty: 1 });
  }
  updateCartUI();
  
  // Animation feedback
  els.cartBadge.style.transform = 'scale(1.5)';
  setTimeout(() => els.cartBadge.style.transform = 'scale(1)', 200);
}

function updateCartQty(itemId, delta) {
  const cartItem = state.cart.find(c => c.item.id === itemId);
  if(!cartItem) return;
  
  cartItem.qty += delta;
  if(cartItem.qty <= 0) {
    state.cart = state.cart.filter(c => c.item.id !== itemId);
  }
  updateCartUI();
}

function updateCartUI() {
  const totalQty = state.cart.reduce((sum, c) => sum + c.qty, 0);
  const totalPrice = state.cart.reduce((sum, c) => sum + (c.item.price * c.qty), 0);
  
  els.cartBadge.innerText = totalQty;
  els.cartBadge.style.display = totalQty > 0 ? 'flex' : 'none';
  els.cartTotalPrice.innerText = `$${totalPrice.toFixed(2)}`;
  
  if(state.cart.length === 0) {
    els.cartItemsContainer.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-secondary); opacity:0.5;">
        <span class="material-icons-round" style="font-size: 64px; margin-bottom:16px;">remove_shopping_cart</span>
        <p>Your cart is empty</p>
      </div>
    `;
    return;
  }
  
  els.cartItemsContainer.innerHTML = state.cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${c.item.name}</div>
        <div class="cart-item-price">$${(c.item.price * c.qty).toFixed(2)}</div>
        <div style="font-size:12px; color:var(--text-secondary);">${c.restaurant.name}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="app.updateCartQty(${c.item.id}, -1)">-</button>
        <span class="qty-val">${c.qty}</span>
        <button class="qty-btn" onclick="app.updateCartQty(${c.item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
}

function toggleCart() {
  els.cartDrawer.classList.toggle('open');
  els.drawerOverlay.classList.toggle('show');
}

function checkout() {
  if(state.cart.length === 0) return;
  
  // Create order
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    restaurantId: state.cart[0].restaurant.id, 
    items: state.cart.map(c => ({ name: c.item.name, qty: c.qty })),
    total: state.cart.reduce((sum, c) => sum + (c.item.price * c.qty), 0),
    status: 'preparing',
    date: 'Just now'
  };
  
  data.orders.unshift(newOrder);
  state.cart = [];
  updateCartUI();
  renderOrders();
  toggleCart();
  navigate('orders');
}

// Event Listeners
function setupEventListeners() {
  els.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      navigate(target);
    });
  });
  
  document.getElementById('cart-btn').addEventListener('click', toggleCart);
  document.getElementById('close-cart-btn').addEventListener('click', toggleCart);
  els.drawerOverlay.addEventListener('click', toggleCart);
  
  els.loginForm.addEventListener('submit', login);
  els.logoutBtn.addEventListener('click', logout);
  document.getElementById('checkout-btn').addEventListener('click', checkout);
}

// Expose methods to global scope for inline handlers
window.app = {
  navigate,
  filterCategory,
  openRestaurant,
  addToCart,
  updateCartQty
};

// Start
init();
