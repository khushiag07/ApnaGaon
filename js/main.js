// Apna Gaon - Shared Web Interactions & State Manager

document.addEventListener('DOMContentLoaded', () => {
  initSharedComponents();
  highlightActiveLink();
  renderHeaderAuth();
  updateHeaderCart();
  createLocationModal();
});

// Toast Notifications
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Automatically remove toast after 3s
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s reverse forwards cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Cart State Manager
function getCart() {
  return JSON.parse(localStorage.getItem('apna_gaon_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('apna_gaon_cart', JSON.stringify(cart));
  updateHeaderCart();
  // Dispatch event for components that need to re-render when cart updates
  window.dispatchEvent(new Event('cartUpdated'));
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
  showToast(`Added ${item.name} to cart!`);
}

function updateHeaderCart() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartBadge = document.querySelector('.cart-count');
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Tiny micro-animation on badge when updated
    cartBadge.classList.add('badge-bounce');
    setTimeout(() => cartBadge.classList.remove('badge-bounce'), 400);
  }
}

// User Authentication State
const DEFAULT_USER = {
  name: 'Anjali Mehta',
  email: 'anjali@email.com',
  level: 'Loyal Customer',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  location: 'Jaipur, Rajasthan',
  wallet: 750,
  rewards: 120
};

function isLoggedIn() {
  return localStorage.getItem('apna_gaon_user') !== null;
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem('apna_gaon_user') || JSON.stringify(DEFAULT_USER));
}

function loginUser(userData = DEFAULT_USER) {
  localStorage.setItem('apna_gaon_user', JSON.stringify(userData));
  renderHeaderAuth();
  showToast(`Welcome back, ${userData.name}!`);
}

function logoutUser() {
  localStorage.removeItem('apna_gaon_user');
  renderHeaderAuth();
  showToast('Logged out successfully.', 'info');
  // If we are on user dashboard/orders, redirect to home
  if (window.location.pathname.includes('orders.html')) {
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

function renderHeaderAuth() {
  const authContainer = document.getElementById('header-auth-container');
  if (!authContainer) return;

  if (isLoggedIn()) {
    const user = getLoggedInUser();
    authContainer.innerHTML = `
      <div class="user-profile-header" onclick="window.location.href='orders.html'">
        <img src="${user.avatar}" alt="${user.name}">
        <span class="user-name">${user.name}</span>
      </div>
    `;
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="auth-btn">Login / Sign Up</a>
    `;
  }
}

// Active Nav highlight
function highlightActiveLink() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (path.endsWith(href) || (path.endsWith('/') && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Location Selector Modal
const LOCATIONS = [
  'Jaipur, Rajasthan',
  'Sikar, Rajasthan',
  'Bharatpur, Rajasthan',
  'Alwar, Rajasthan',
  'Udaipur, Rajasthan',
  'Jodhpur, Rajasthan'
];

function createLocationModal() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'location-modal-overlay';
  
  const activeLoc = localStorage.getItem('apna_gaon_location') || 'Jaipur, Rajasthan';
  
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>Select Your Location</h3>
        <button class="modal-close" onclick="closeLocationModal()">&times;</button>
      </div>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 15px;">Choose your location to see fresh harvest and nearby farms closer to you.</p>
      <div class="location-list">
        ${LOCATIONS.map(loc => `
          <div class="location-item" onclick="selectLocation('${loc}')">
            ${loc} ${loc === activeLoc ? '✔' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);

  // Bind click on selector in header
  const selector = document.querySelector('.location-selector');
  if (selector) {
    // Render current location
    selector.querySelector('.loc-text').textContent = activeLoc;
    selector.addEventListener('click', openLocationModal);
  }
}

function openLocationModal() {
  const modal = document.getElementById('location-modal-overlay');
  if (modal) modal.classList.add('active');
}

function closeLocationModal() {
  const modal = document.getElementById('location-modal-overlay');
  if (modal) modal.classList.remove('active');
}

function selectLocation(loc) {
  localStorage.setItem('apna_gaon_location', loc);
  const selector = document.querySelector('.location-selector .loc-text');
  if (selector) selector.textContent = loc;
  
  // Re-generate list items to update checkmark
  const list = document.querySelector('.location-list');
  if (list) {
    list.innerHTML = LOCATIONS.map(l => `
      <div class="location-item" onclick="selectLocation('${l}')">
        ${l} ${l === loc ? '✔' : ''}
      </div>
    `).join('');
  }
  
  closeLocationModal();
  showToast(`Location updated to ${loc}`);
  
  // Dispatch event for pages that want to filter products based on location
  window.dispatchEvent(new CustomEvent('locationChanged', { detail: loc }));
}

function initSharedComponents() {
  // Setup standard footer newsletter handler
  const footerNewsletter = document.querySelector('.footer-subscribe form');
  if (footerNewsletter) {
    footerNewsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = footerNewsletter.querySelector('input');
      if (input && input.value) {
        showToast('Subscribed to newsletter successfully!');
        input.value = '';
      }
    });
  }
}

// Add tiny keyframe animation CSS dynamically for Cart Count Badge Bounce
const style = document.createElement('style');
style.textContent = `
  @keyframes badgeBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
  }
  .badge-bounce {
    animation: badgeBounce 0.4s ease-out;
  }
`;
document.head.appendChild(style);
