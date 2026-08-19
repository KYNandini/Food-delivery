import './style.css'

// Mock Data
let data = { categories: [], restaurants: [], orders: [] };

// State
let state = {
  cart: [],
  user: null,
  activeView: 'home',
  activeCategory: 'All',
  selectedRestaurant: null,
  searchQuery: ''
};

let userLocation = null;
let mapInstance = null;

// Geo Functions
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; 
}
function deg2rad(deg) { return deg * (Math.PI/180); }

function filterNearMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      state.activeCategory = 'Near Me';
      renderCategories();
      renderRestaurants();
    }, (error) => {
      alert("Error getting location: " + error.message);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

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
  logoutBtn: document.getElementById('logout-btn'),
  userName: document.querySelector('.user-name'),
  profileEmail: document.getElementById('profile-email'),
  searchInput: document.getElementById('search-input')
};

// Init
async function init() {
  checkAuth();
  
  try {
    const [catRes, restRes, ordRes] = await Promise.all([
      fetch('http://localhost:3000/api/categories'),
      fetch('http://localhost:3000/api/restaurants'),
      fetch('http://localhost:3000/api/orders')
    ]);
    
    data.categories = await catRes.json();
    data.restaurants = await restRes.json();
    data.orders = await ordRes.json();
    
    renderCategories();
    renderRestaurants();
    renderOrders();
  } catch (error) {
    console.error("Failed to load data from backend", error);
  }
  
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
        if(els.profileEmail) els.profileEmail.innerText = state.user.email || '';
        const profileName = document.querySelector('.profile-card h3');
        if(profileName) profileName.innerText = state.user.name;
    }
}

async function sendOTP(e) {
  e.preventDefault();
  const name = document.getElementById('auth-name').value;
  const email = document.getElementById('auth-email').value;
  if(!name || !email) return;
  
  state.tempUser = { name, email };
  
  try {
    const res = await fetch('http://localhost:3000/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const result = await res.json();
    
    if (result.success) {
      document.getElementById('email-form').style.display = 'none';
      document.getElementById('otp-form').style.display = 'block';
      document.getElementById('auth-title').innerText = 'Verify OTP';
      document.getElementById('auth-subtitle').innerHTML = `OTP sent to ${email} <br><small style="color:var(--primary)">(Check terminal or enter 1234)</small>`;
    }
  } catch (error) {
    console.error(error);
    alert('Failed to connect to backend.');
  }
}

async function verifyOTP(e) {
  e.preventDefault();
  const otp = document.getElementById('auth-otp').value;
  if(otp.length === 4) {
    try {
      const res = await fetch('http://localhost:3000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: state.tempUser.email, name: state.tempUser.name, otp })
      });
      const result = await res.json();
      
      if (result.success) {
        state.user = result.user;
        localStorage.setItem('user', JSON.stringify(state.user));
        els.authModal.classList.remove('show');
        updateUserUI();
        resetAuth();
      } else {
        alert(result.error || 'Invalid OTP');
      }
    } catch (error) {
      alert('Failed to connect to backend');
    }
  } else {
    alert('Please enter a valid 4-digit OTP');
  }
}

function resetAuth() {
  document.getElementById('email-form').style.display = 'block';
  document.getElementById('otp-form').style.display = 'none';
  document.getElementById('auth-title').innerText = 'Create Account';
  document.getElementById('auth-subtitle').innerText = 'Enter details to get started';
  document.getElementById('auth-otp').value = '';
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
  } else if (viewId === 'map') {
    document.getElementById('main-header').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'flex';
    setTimeout(() => {
      initMap();
      if(mapInstance) mapInstance.invalidateSize();
    }, 100);
  } else {
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'flex';
  }
}

// Render Functions
function renderCategories() {
  const container = document.getElementById('categories-container');
  let html = `
    <div class="category-chip ${state.activeCategory === 'All' ? 'active' : ''}" onclick="app.filterCategory('All')">
      <div class="category-icon">🍽️</div>
      <span class="category-name">All</span>
    </div>
    <div class="category-chip ${state.activeCategory === 'Near Me' ? 'active' : ''}" onclick="app.filterNearMe()">
      <div class="category-icon">📍</div>
      <span class="category-name">Near Me</span>
    </div>
  `;
  
  data.categories.forEach(c => {
    html += `
      <div class="category-chip ${state.activeCategory === c.name ? 'active' : ''}" onclick="app.filterCategory('${c.name}')">
        <div class="category-icon">${c.icon}</div>
        <span class="category-name">${c.name}</span>
      </div>
    `;
  });
  container.innerHTML = html;
}

function filterCategory(name) {
  state.activeCategory = name;
  renderCategories();
  renderRestaurants();
}

function renderRestaurants() {
  const container = document.getElementById('restaurants-container');
  let filtered = [...data.restaurants];
  
  if (state.activeCategory === 'Near Me' && userLocation) {
    filtered.forEach(r => {
      r.distance = getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, r.location[0], r.location[1]);
    });
    filtered.sort((a, b) => a.distance - b.distance);
  } else if (state.activeCategory !== 'All' && state.activeCategory !== 'Near Me') {
    filtered = data.restaurants.filter(r => r.category === state.activeCategory);
  }
  
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(r => 
      r.name.toLowerCase().includes(q) || 
      r.category.toLowerCase().includes(q) ||
      r.menu.some(m => m.name.toLowerCase().includes(q))
    );
  }
    
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
          <div class="meta-item"><span class="material-icons-round">${r.distance ? 'place' : 'schedule'}</span> ${r.distance ? r.distance.toFixed(1) + ' km' : r.time}</div>
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
  menuContainer.innerHTML = restaurant.menu.map(m => {
    const isNonVeg = /chicken|mutton|fish|prawn|kebab|egg/i.test(m.name) || /chicken|mutton|fish|prawn|kebab|egg/i.test(m.desc);
    return `
    <div class="menu-item">
      <div class="menu-item-info">
        <div class="diet-icon ${isNonVeg ? 'diet-nonveg' : 'diet-veg'}"></div>
        <div class="menu-item-name">${m.name}</div>
        <div class="menu-item-price">₹${m.price}</div>
        <div class="menu-item-desc">${m.desc}</div>
      </div>
      <div class="menu-item-img-container">
        <img src="${m.image}" class="menu-item-img" alt="${m.name}">
        <button class="add-btn" onclick="app.addToCart(${restaurant.id}, ${m.id})">ADD</button>
      </div>
    </div>
  `}).join('');
  
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
          <span class="order-total">₹${o.total}</span>
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
  els.cartTotalPrice.innerText = `₹${totalPrice}`;
  
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
        <div class="cart-item-price">₹${(c.item.price * c.qty)}</div>
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

async function checkout() {
  if(state.cart.length === 0) return;
  
  const orderPayload = {
    restaurantId: state.cart[0].restaurant.id, 
    items: state.cart.map(c => ({ name: c.item.name, qty: c.qty })),
    total: state.cart.reduce((sum, c) => sum + (c.item.price * c.qty), 0)
  };
  
  try {
    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const result = await res.json();
    
    if(result.success) {
      data.orders.unshift(result.order);
      state.cart = [];
      updateCartUI();
      renderOrders();
      toggleCart();
      navigate('orders');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to create order. Is backend running?');
  }
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
  
  const emailForm = document.getElementById('email-form');
  const otpForm = document.getElementById('otp-form');
  if(emailForm) emailForm.addEventListener('submit', sendOTP);
  if(otpForm) otpForm.addEventListener('submit', verifyOTP);
  
  els.logoutBtn.addEventListener('click', logout);
  document.getElementById('checkout-btn').addEventListener('click', checkout);
  
  if(els.searchInput) {
    els.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderRestaurants();
    });
  }
}

// Map Logic
function initMap() {
  if(mapInstance) return;
  mapInstance = L.map('map-container').setView([12.9716, 77.5946], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(mapInstance);
  
  data.restaurants.forEach(r => {
    L.marker(r.location).addTo(mapInstance)
      .bindPopup(`<b>${r.name}</b><br>${r.category}`);
  });
  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const userMarker = L.circleMarker([lat, lng], {color: 'red', radius: 8, fillOpacity: 0.8}).addTo(mapInstance);
      userMarker.bindPopup("<b>You are here</b>").openPopup();
      mapInstance.setView([lat, lng], 13);
    });
  }
}

// Expose methods to global scope for inline handlers
window.app = {
  navigate,
  filterCategory,
  filterNearMe,
  openRestaurant,
  addToCart,
  updateCartQty,
  resetAuth
};

// Start
init();
