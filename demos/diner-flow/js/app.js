/**
 * diner-flow - Customer Ordering Engine & App Controller
 */

// Global State
const State = {
  cart: [],
  orderType: 'dine-in', // 'dine-in' | 'takeaway'
  tableNumber: '01',
  customerName: '',
  customerPhone: '',
  deliveryAddress: '',
  specialNotes: '',
  activeCategory: 'all',
  searchQuery: '',
  filterVegOnly: false,
  filterSpicyOnly: false,
  appliedCoupon: null,
  tipAmount: 0,
  currentModalItem: null,
  activeOrder: null,
  broadcastChannel: null
};

// Initialize BroadcastChannel for cross-tab communication with Kitchen Screen
try {
  State.broadcastChannel = new BroadcastChannel('diner_flow_channel');
  State.broadcastChannel.onmessage = (event) => {
    if (event.data && event.data.type === 'ORDER_STATUS_UPDATE') {
      handleOrderStatusUpdateFromKitchen(event.data.order);
    }
  };
} catch (e) {
  console.warn('BroadcastChannel not supported in this browser.', e);
}

// Storage helpers
function getStoredOrders() {
  const data = localStorage.getItem('diner_flow_orders');
  if (!data) {
    localStorage.setItem('diner_flow_orders', JSON.stringify(INITIAL_KOT_ORDERS));
    return INITIAL_KOT_ORDERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_KOT_ORDERS;
  }
}

function saveOrderToStorage(order) {
  const orders = getStoredOrders();
  const existingIndex = orders.findIndex(o => o.orderId === order.orderId);
  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.unshift(order);
  }
  localStorage.setItem('diner_flow_orders', JSON.stringify(orders));
  
  // Notify other tabs
  if (State.broadcastChannel) {
    State.broadcastChannel.postMessage({ type: 'NEW_ORDER_PLACED', order });
  }
}

// Check URL Params for Table Number and Dine-in/Takeaway
function initUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const table = params.get('table');
  const type = params.get('type') || params.get('orderType');

  if (table) {
    State.tableNumber = String(table).padStart(2, '0');
    State.orderType = 'dine-in';
  }
  if (type === 'takeaway' || type === 'delivery') {
    State.orderType = 'takeaway';
  }
}

// DOM Elements
let elements = {};

document.addEventListener('DOMContentLoaded', () => {
  initUrlParams();
  cacheDOMElements();
  initRestaurantBranding();
  renderCategories();
  renderTableSelector();
  renderMenuItems();
  setupEventListeners();
  updateCartUI();
  
  // Check if there is an existing active order in sessionStorage
  const savedActiveOrder = sessionStorage.getItem('diner_active_order');
  if (savedActiveOrder) {
    try {
      State.activeOrder = JSON.parse(savedActiveOrder);
      showToast(`Welcome back! Tracking active order #${State.activeOrder.orderId}`, 'info');
      renderActiveOrderBanner();
    } catch (e) {}
  }
});

function cacheDOMElements() {
  elements = {
    // Branding
    restaurantName: document.getElementById('restaurantName'),
    restaurantTagline: document.getElementById('restaurantTagline'),
    brandBannerName: document.getElementById('brandBannerName'),
    // Table & Order Type
    orderTypeToggle: document.getElementById('orderTypeToggle'),
    tableSelectorContainer: document.getElementById('tableSelectorContainer'),
    tableSelect: document.getElementById('tableSelect'),
    takeawayFields: document.getElementById('takeawayFields'),
    dineInBadge: document.getElementById('dineInBadge'),
    // Search & Filter
    searchInput: document.getElementById('searchInput'),
    filterVeg: document.getElementById('filterVeg'),
    filterSpicy: document.getElementById('filterSpicy'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    categoryTabs: document.getElementById('categoryTabs'),
    // Menu Grid
    menuGrid: document.getElementById('menuGrid'),
    menuEmptyState: document.getElementById('menuEmptyState'),
    itemCountDisplay: document.getElementById('itemCountDisplay'),
    // Cart Floating Bar
    cartFloatingBar: document.getElementById('cartFloatingBar'),
    cartFloatCount: document.getElementById('cartFloatCount'),
    cartFloatTotal: document.getElementById('cartFloatTotal'),
    viewCartBtn: document.getElementById('viewCartBtn'),
    // Cart Drawer
    cartDrawerBackdrop: document.getElementById('cartDrawerBackdrop'),
    cartDrawer: document.getElementById('cartDrawer'),
    closeCartDrawerBtn: document.getElementById('closeCartDrawerBtn'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartContentState: document.getElementById('cartContentState'),
    // Bill breakdown
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartDiscountRow: document.getElementById('cartDiscountRow'),
    cartDiscount: document.getElementById('cartDiscount'),
    cartGst: document.getElementById('cartGst'),
    cartDeliveryRow: document.getElementById('cartDeliveryRow'),
    cartDelivery: document.getElementById('cartDelivery'),
    cartPackingRow: document.getElementById('cartPackingRow'),
    cartPacking: document.getElementById('cartPacking'),
    cartGrandTotal: document.getElementById('cartGrandTotal'),
    // Coupon & Notes
    couponInput: document.getElementById('couponInput'),
    applyCouponBtn: document.getElementById('applyCouponBtn'),
    couponMessage: document.getElementById('couponMessage'),
    orderNotesInput: document.getElementById('orderNotesInput'),
    customerNameInput: document.getElementById('customerNameInput'),
    customerPhoneInput: document.getElementById('customerPhoneInput'),
    customerAddressInput: document.getElementById('customerAddressInput'),
    // Order Action Buttons
    whatsappOrderBtn: document.getElementById('whatsappOrderBtn'),
    payUpiBtn: document.getElementById('payUpiBtn'),
    // Modals
    customizerModal: document.getElementById('customizerModal'),
    upiModal: document.getElementById('upiModal'),
    orderSuccessModal: document.getElementById('orderSuccessModal'),
    activeOrderBanner: document.getElementById('activeOrderBanner'),
    toastContainer: document.getElementById('toastContainer')
  };
}

function initRestaurantBranding() {
  if (elements.restaurantName) elements.restaurantName.textContent = RESTAURANT_CONFIG.shortName;
  if (elements.restaurantTagline) elements.restaurantTagline.textContent = RESTAURANT_CONFIG.tagline;
  if (elements.brandBannerName) elements.brandBannerName.textContent = RESTAURANT_CONFIG.name;
}

// Categories Tab Rendering
function renderCategories() {
  if (!elements.categoryTabs) return;
  elements.categoryTabs.innerHTML = MENU_CATEGORIES.map(cat => {
    const isActive = State.activeCategory === cat.id;
    return `
      <button 
        onclick="selectCategory('${cat.id}')"
        class="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 ring-2 ring-amber-400' 
            : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
        }">
        <span>${getCategoryIcon(cat.icon)}</span>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
}

function getCategoryIcon(iconName) {
  const iconMap = {
    'utensils': '🍴',
    'sparkles': '✨',
    'flame': '🔥',
    'sandwich': '🍔',
    'coffee': '☕',
    'cake-slice': '🍰'
  };
  return iconMap[iconName] || '🍽️';
}

function selectCategory(categoryId) {
  State.activeCategory = categoryId;
  renderCategories();
  renderMenuItems();
}

// Table Selector Rendering
function renderTableSelector() {
  if (!elements.tableSelect) return;
  
  let options = '';
  for (let i = 1; i <= RESTAURANT_CONFIG.tablesCount; i++) {
    const num = String(i).padStart(2, '0');
    const selected = State.tableNumber === num ? 'selected' : '';
    options += `<option value="${num}" ${selected}>Table ${num}</option>`;
  }
  elements.tableSelect.innerHTML = options;
  updateOrderTypeUI();
}

function updateOrderTypeUI() {
  const isDineIn = State.orderType === 'dine-in';
  
  // Toggle buttons
  const dineInBtn = document.getElementById('typeDineInBtn');
  const takeawayBtn = document.getElementById('typeTakeawayBtn');
  
  if (dineInBtn && takeawayBtn) {
    if (isDineIn) {
      dineInBtn.className = 'flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 text-slate-950 shadow-md flex items-center justify-center gap-1.5 transition-all';
      takeawayBtn.className = 'flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-all';
    } else {
      takeawayBtn.className = 'flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 text-slate-950 shadow-md flex items-center justify-center gap-1.5 transition-all';
      dineInBtn.className = 'flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-all';
    }
  }

  if (elements.tableSelectorContainer) {
    elements.tableSelectorContainer.style.display = isDineIn ? 'flex' : 'none';
  }
  if (elements.takeawayFields) {
    elements.takeawayFields.style.display = isDineIn ? 'none' : 'block';
  }
  if (elements.dineInBadge) {
    elements.dineInBadge.textContent = isDineIn ? `Table ${State.tableNumber}` : 'Takeaway / Delivery';
  }

  updateCartCalculation();
}

function setOrderType(type) {
  State.orderType = type;
  updateOrderTypeUI();
  updateCartUI();
  showToast(`Switched order mode to ${type === 'dine-in' ? 'Dine-In' : 'Takeaway & Delivery'}`, 'info');
}

function setTableNumber(tableNum) {
  State.tableNumber = String(tableNum).padStart(2, '0');
  updateOrderTypeUI();
}

// Menu Items Filtering & Rendering
function getFilteredMenuItems() {
  return MENU_ITEMS.filter(item => {
    // Category filter
    if (State.activeCategory !== 'all' && item.category !== State.activeCategory) {
      return false;
    }
    // Veg only filter
    if (State.filterVegOnly && !item.veg) {
      return false;
    }
    // Spicy only filter
    if (State.filterSpicyOnly && item.spiceLevel === 0) {
      return false;
    }
    // Search query filter
    if (State.searchQuery.trim() !== '') {
      const q = State.searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.categoryName.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    return true;
  });
}

function renderMenuItems() {
  if (!elements.menuGrid) return;
  const filtered = getFilteredMenuItems();
  
  if (elements.itemCountDisplay) {
    elements.itemCountDisplay.textContent = `${filtered.length} dishes`;
  }

  if (filtered.length === 0) {
    elements.menuGrid.innerHTML = '';
    if (elements.menuEmptyState) elements.menuEmptyState.style.display = 'block';
    return;
  }

  if (elements.menuEmptyState) elements.menuEmptyState.style.display = 'none';

  elements.menuGrid.innerHTML = filtered.map(item => {
    const cartCount = getCartItemQuantity(item.id);
    const spiceBadges = '🌶️'.repeat(item.spiceLevel);

    return `
      <div class="dish-card group relative bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-amber-500/10">
        
        <!-- Dish Image & Overlays -->
        <div class="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>
          
          <!-- Badges on top of image -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <!-- Veg / Non-Veg Indicator -->
            <span class="bg-slate-950/90 p-1.5 rounded-md border border-slate-700 shadow-md flex items-center justify-center" title="${item.veg ? 'Pure Vegetarian' : 'Non-Vegetarian'}">
              <span class="${item.veg ? 'veg-symbol' : 'non-veg-symbol'}"></span>
            </span>

            ${item.bestseller ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                Bestseller
              </span>
            ` : ''}

            ${item.chefSpecial ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white shadow-md">
                Chef's Pick
              </span>
            ` : ''}
          </div>

          <!-- Spice & Rating Pill -->
          <div class="absolute bottom-2.5 left-3 flex items-center gap-2 text-xs font-semibold">
            <span class="bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg text-amber-400 border border-amber-500/30 flex items-center gap-1">
              ★ ${item.rating} <span class="text-slate-400 text-[10px]">(${item.votes})</span>
            </span>
            ${item.spiceLevel > 0 ? `
              <span class="bg-black/80 backdrop-blur-md px-1.5 py-1 rounded-lg border border-red-500/30 text-[11px]" title="Spice: Level ${item.spiceLevel}">
                ${spiceBadges}
              </span>
            ` : ''}
            <span class="bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg text-slate-300 border border-slate-700 text-[11px]">
              ⏱️ ${item.prepTime}
            </span>
          </div>
        </div>

        <!-- Dish Content -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <h3 class="font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                ${item.name}
              </h3>
            </div>
            <p class="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed font-light">
              ${item.description}
            </p>
          </div>

          <!-- Price & Add Button Row -->
          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
            <div>
              <span class="text-xs text-slate-400 font-medium">Price</span>
              <div class="text-lg sm:text-xl font-extrabold text-amber-400 tracking-tight">
                ${RESTAURANT_CONFIG.currency}${item.price}
              </div>
            </div>

            <!-- Add to Cart or Stepper -->
            <div>
              ${cartCount === 0 ? `
                <button 
                  onclick="handleAddItemClick('${item.id}')"
                  class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all glow-amber-btn">
                  <span>+</span>
                  <span>ADD</span>
                  ${item.customizations && item.customizations.length > 0 ? '<span class="text-[10px] opacity-75">★</span>' : ''}
                </button>
              ` : `
                <div class="flex items-center bg-slate-800 border border-amber-500/50 rounded-xl overflow-hidden shadow-md">
                  <button 
                    onclick="decrementCartItem('${item.id}')"
                    class="px-2.5 py-1.5 text-amber-400 hover:bg-slate-700 active:bg-slate-600 font-bold transition-colors">
                    -
                  </button>
                  <span class="px-2.5 py-1 text-xs sm:text-sm font-bold text-white min-w-[24px] text-center">
                    ${cartCount}
                  </span>
                  <button 
                    onclick="handleAddItemClick('${item.id}')"
                    class="px-2.5 py-1.5 text-amber-400 hover:bg-slate-700 active:bg-slate-600 font-bold transition-colors">
                    +
                  </button>
                </div>
              `}
            </div>
          </div>

        </div>

      </div>
    `;
  }).join('');
}

// Cart Quantity helper
function getCartItemQuantity(itemId) {
  return State.cart
    .filter(entry => entry.item.id === itemId)
    .reduce((sum, entry) => sum + entry.qty, 0);
}

// Handle Add Click: If item has customizations, open modal; otherwise add directly
function handleAddItemClick(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  if (item.customizations && item.customizations.length > 0) {
    openCustomizerModal(item);
  } else {
    addToCart(item, 1, [], '');
    showToast(`Added ${item.name} to order`, 'success');
  }
}

// Customizer Modal
function openCustomizerModal(item) {
  State.currentModalItem = item;
  const modal = elements.customizerModal;
  if (!modal) return;

  const content = document.getElementById('customizerContent');
  if (!content) return;

  let customizationsHTML = '';
  
  item.customizations.forEach((group, gIdx) => {
    customizationsHTML += `
      <div class="mb-5 pb-4 border-b border-slate-800 last:border-0 last:pb-0 last:mb-0">
        <div class="flex items-center justify-between mb-2.5">
          <h4 class="font-bold text-sm text-slate-200">${group.name}</h4>
          <span class="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            ${group.type === 'radio' ? 'Select 1 (Required)' : 'Optional Add-ons'}
          </span>
        </div>
        <div class="space-y-2">
          ${group.options.map((opt, oIdx) => {
            const inputId = `custom_${gIdx}_${oIdx}`;
            const isChecked = group.type === 'radio' && oIdx === 0 ? 'checked' : '';
            return `
              <label for="${inputId}" class="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer select-none transition-colors">
                <div class="flex items-center gap-3">
                  <input 
                    type="${group.type}" 
                    id="${inputId}" 
                    name="custom_group_${gIdx}" 
                    value="${opt.label}" 
                    data-price="${opt.price}"
                    onchange="updateModalCustomizerTotal()"
                    ${isChecked}
                    class="w-4 h-4 text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500 focus:ring-offset-slate-900"
                  />
                  <span class="text-xs sm:text-sm text-slate-200">${opt.label}</span>
                </div>
                <span class="text-xs font-semibold ${opt.price > 0 ? 'text-amber-400' : 'text-slate-500'}">
                  ${opt.price > 0 ? `+${RESTAURANT_CONFIG.currency}${opt.price}` : 'Free'}
                </span>
              </label>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  content.innerHTML = `
    <!-- Header -->
    <div class="flex items-start justify-between p-4 sm:p-5 border-b border-slate-800">
      <div class="flex items-center gap-3">
        <span class="${item.veg ? 'veg-symbol' : 'non-veg-symbol'} mt-0.5"></span>
        <div>
          <h3 class="font-bold text-base sm:text-lg text-white">${item.name}</h3>
          <p class="text-xs text-slate-400">Base Price: ${RESTAURANT_CONFIG.currency}${item.price}</p>
        </div>
      </div>
      <button onclick="closeCustomizerModal()" class="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800">
        ✕
      </button>
    </div>

    <!-- Options Body -->
    <div class="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
      ${customizationsHTML}
      
      <!-- Special Instruction for this item -->
      <div class="mt-4">
        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Special note for Chef (Optional)</label>
        <input 
          type="text" 
          id="itemSpecialNote" 
          placeholder="e.g., Less spicy, no mayo, extra hot"
          class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>
    </div>

    <!-- Footer Action -->
    <div class="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
      <div>
        <span class="text-xs text-slate-400 block">Item Total</span>
        <span id="modalFinalPrice" class="text-lg font-extrabold text-amber-400">
          ${RESTAURANT_CONFIG.currency}${item.price}
        </span>
      </div>
      <button 
        onclick="confirmCustomizedAdd()"
        class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all">
        <span>Add to Order</span>
        <span>➔</span>
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  updateModalCustomizerTotal();
}

function closeCustomizerModal() {
  const modal = elements.customizerModal;
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  State.currentModalItem = null;
}

function updateModalCustomizerTotal() {
  if (!State.currentModalItem) return;
  let total = State.currentModalItem.price;

  const checkedInputs = document.querySelectorAll('#customizerContent input:checked');
  checkedInputs.forEach(input => {
    const price = parseFloat(input.dataset.price) || 0;
    total += price;
  });

  const priceEl = document.getElementById('modalFinalPrice');
  if (priceEl) {
    priceEl.textContent = `${RESTAURANT_CONFIG.currency}${total}`;
  }
}

function confirmCustomizedAdd() {
  if (!State.currentModalItem) return;
  const item = State.currentModalItem;
  
  const selectedCustomizations = [];
  let calculatedUnitPrice = item.price;

  const checkedInputs = document.querySelectorAll('#customizerContent input:checked');
  checkedInputs.forEach(input => {
    const price = parseFloat(input.dataset.price) || 0;
    calculatedUnitPrice += price;
    selectedCustomizations.push({
      label: input.value,
      price: price
    });
  });

  const noteInput = document.getElementById('itemSpecialNote');
  const itemNote = noteInput ? noteInput.value.trim() : '';

  addToCart(item, 1, selectedCustomizations, itemNote, calculatedUnitPrice);
  closeCustomizerModal();
  showToast(`Added ${item.name} with customizations`, 'success');
}

// Add Item to Cart Array
function addToCart(item, qty = 1, customizations = [], note = '', customPrice = null) {
  const unitPrice = customPrice !== null ? customPrice : item.price;
  
  // Look for exact match with same customizations & note
  const customKey = JSON.stringify(customizations) + '::' + note;
  const existing = State.cart.find(entry => entry.item.id === item.id && entry.customKey === customKey);

  if (existing) {
    existing.qty += qty;
  } else {
    State.cart.push({
      cartId: 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      item: item,
      qty: qty,
      unitPrice: unitPrice,
      customizations: customizations,
      note: note,
      customKey: customKey
    });
  }

  updateCartUI();
}

function decrementCartItem(itemId) {
  // Find first match of this item
  const index = State.cart.findIndex(entry => entry.item.id === itemId);
  if (index >= 0) {
    if (State.cart[index].qty > 1) {
      State.cart[index].qty -= 1;
    } else {
      State.cart.splice(index, 1);
    }
  }
  updateCartUI();
}

function removeCartEntry(cartId) {
  State.cart = State.cart.filter(entry => entry.cartId !== cartId);
  updateCartUI();
  showToast('Item removed from cart', 'info');
}

function changeCartEntryQty(cartId, delta) {
  const entry = State.cart.find(e => e.cartId === cartId);
  if (!entry) return;

  entry.qty += delta;
  if (entry.qty <= 0) {
    removeCartEntry(cartId);
    return;
  }
  updateCartUI();
}

// Calculate Cart Totals
function calculateCartTotals() {
  const isDineIn = State.orderType === 'dine-in';
  let subtotal = 0;
  let totalItemsCount = 0;

  State.cart.forEach(entry => {
    subtotal += entry.unitPrice * entry.qty;
    totalItemsCount += entry.qty;
  });

  // Discount
  let discount = 0;
  if (State.appliedCoupon && subtotal >= State.appliedCoupon.minOrder) {
    if (State.appliedCoupon.discountType === 'percent') {
      discount = (subtotal * State.appliedCoupon.value) / 100;
      if (State.appliedCoupon.maxDiscount && discount > State.appliedCoupon.maxDiscount) {
        discount = State.appliedCoupon.maxDiscount;
      }
    } else if (State.appliedCoupon.discountType === 'flat') {
      discount = State.appliedCoupon.value;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = taxableAmount * RESTAURANT_CONFIG.gstRate;

  // Packaging & Delivery fees for takeaway
  let packingFee = 0;
  let deliveryFee = 0;
  if (!isDineIn && totalItemsCount > 0) {
    packingFee = RESTAURANT_CONFIG.packingFeeTakeaway;
    if (subtotal < RESTAURANT_CONFIG.freeDeliveryThreshold) {
      deliveryFee = RESTAURANT_CONFIG.deliveryFee;
    }
  }

  const grandTotal = Math.round((taxableAmount + gst + packingFee + deliveryFee + State.tipAmount) * 100) / 100;

  return {
    subtotal,
    totalItemsCount,
    discount,
    gst,
    packingFee,
    deliveryFee,
    grandTotal
  };
}

// Update Cart UI, Floating Bar, and Drawer
function updateCartUI() {
  const totals = calculateCartTotals();
  
  // Re-render menu item buttons to update stepper counts
  renderMenuItems();

  // Floating Bar
  if (elements.cartFloatingBar) {
    if (totals.totalItemsCount > 0) {
      elements.cartFloatingBar.classList.remove('hidden');
      elements.cartFloatingBar.classList.add('flex');
      if (elements.cartFloatCount) elements.cartFloatCount.textContent = `${totals.totalItemsCount} ${totals.totalItemsCount === 1 ? 'item' : 'items'}`;
      if (elements.cartFloatTotal) elements.cartFloatTotal.textContent = `${RESTAURANT_CONFIG.currency}${totals.grandTotal.toFixed(2)}`;
    } else {
      elements.cartFloatingBar.classList.add('hidden');
      elements.cartFloatingBar.classList.remove('flex');
    }
  }

  // Cart Drawer
  renderCartDrawerItems(totals);
  updateCartCalculation(totals);
}

function renderCartDrawerItems(totals) {
  if (!elements.cartItemsList) return;

  if (State.cart.length === 0) {
    if (elements.cartEmptyState) elements.cartEmptyState.style.display = 'flex';
    if (elements.cartContentState) elements.cartContentState.style.display = 'none';
    return;
  }

  if (elements.cartEmptyState) elements.cartEmptyState.style.display = 'none';
  if (elements.cartContentState) elements.cartContentState.style.display = 'block';

  elements.cartItemsList.innerHTML = State.cart.map(entry => {
    const item = entry.item;
    const customText = entry.customizations.map(c => c.label).join(', ');

    return `
      <div class="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-start justify-between gap-3">
        <div class="flex items-start gap-2.5 flex-1 min-w-0">
          <span class="${item.veg ? 'veg-symbol' : 'non-veg-symbol'} mt-1 flex-shrink-0"></span>
          <div class="min-w-0">
            <h4 class="text-sm font-bold text-white truncate">${item.name}</h4>
            <div class="text-xs text-amber-400 font-semibold mt-0.5">
              ${RESTAURANT_CONFIG.currency}${entry.unitPrice} each
            </div>
            ${customText ? `
              <p class="text-[11px] text-slate-400 mt-1 leading-tight line-clamp-2">
                <span class="text-slate-500">Choice:</span> ${customText}
              </p>
            ` : ''}
            ${entry.note ? `
              <p class="text-[11px] text-amber-300/80 italic mt-0.5">
                Note: "${entry.note}"
              </p>
            ` : ''}
          </div>
        </div>

        <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
          <!-- Stepper -->
          <div class="flex items-center bg-slate-950 border border-slate-700 rounded-lg overflow-hidden">
            <button 
              onclick="changeCartEntryQty('${entry.cartId}', -1)"
              class="px-2 py-1 text-amber-400 hover:bg-slate-800 text-xs font-bold transition-colors">
              -
            </button>
            <span class="px-2 text-xs font-bold text-white min-w-[20px] text-center">
              ${entry.qty}
            </span>
            <button 
              onclick="changeCartEntryQty('${entry.cartId}', 1)"
              class="px-2 py-1 text-amber-400 hover:bg-slate-800 text-xs font-bold transition-colors">
              +
            </button>
          </div>

          <!-- Total for this item -->
          <span class="text-xs font-bold text-white">
            ${RESTAURANT_CONFIG.currency}${(entry.unitPrice * entry.qty).toFixed(2)}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function updateCartCalculation(totals) {
  if (!totals) totals = calculateCartTotals();

  if (elements.cartSubtotal) elements.cartSubtotal.textContent = `${RESTAURANT_CONFIG.currency}${totals.subtotal.toFixed(2)}`;
  
  // Discount Row
  if (elements.cartDiscountRow) {
    if (totals.discount > 0) {
      elements.cartDiscountRow.style.display = 'flex';
      if (elements.cartDiscount) elements.cartDiscount.textContent = `-${RESTAURANT_CONFIG.currency}${totals.discount.toFixed(2)}`;
    } else {
      elements.cartDiscountRow.style.display = 'none';
    }
  }

  // GST
  if (elements.cartGst) elements.cartGst.textContent = `${RESTAURANT_CONFIG.currency}${totals.gst.toFixed(2)}`;

  // Packaging Row
  if (elements.cartPackingRow) {
    if (totals.packingFee > 0) {
      elements.cartPackingRow.style.display = 'flex';
      if (elements.cartPacking) elements.cartPacking.textContent = `${RESTAURANT_CONFIG.currency}${totals.packingFee.toFixed(2)}`;
    } else {
      elements.cartPackingRow.style.display = 'none';
    }
  }

  // Delivery Row
  if (elements.cartDeliveryRow) {
    if (totals.deliveryFee > 0) {
      elements.cartDeliveryRow.style.display = 'flex';
      if (elements.cartDelivery) elements.cartDelivery.textContent = `${RESTAURANT_CONFIG.currency}${totals.deliveryFee.toFixed(2)}`;
    } else {
      elements.cartDeliveryRow.style.display = 'none';
    }
  }

  // Grand Total
  if (elements.cartGrandTotal) elements.cartGrandTotal.textContent = `${RESTAURANT_CONFIG.currency}${totals.grandTotal.toFixed(2)}`;
}

// Drawer Open/Close
function openCartDrawer() {
  if (elements.cartDrawerBackdrop && elements.cartDrawer) {
    elements.cartDrawerBackdrop.classList.remove('hidden');
    elements.cartDrawerBackdrop.classList.add('block');
    setTimeout(() => {
      elements.cartDrawerBackdrop.classList.remove('opacity-0');
      elements.cartDrawerBackdrop.classList.add('opacity-100');
      elements.cartDrawer.classList.remove('translate-x-full');
      elements.cartDrawer.classList.add('translate-x-0');
    }, 10);
  }
}

function closeCartDrawer() {
  if (elements.cartDrawerBackdrop && elements.cartDrawer) {
    elements.cartDrawerBackdrop.classList.remove('opacity-100');
    elements.cartDrawerBackdrop.classList.add('opacity-0');
    elements.cartDrawer.classList.remove('translate-x-0');
    elements.cartDrawer.classList.add('translate-x-full');
    setTimeout(() => {
      elements.cartDrawerBackdrop.classList.add('hidden');
      elements.cartDrawerBackdrop.classList.remove('block');
    }, 300);
  }
}

// Coupon Logic
function applyCouponCode() {
  const code = (elements.couponInput ? elements.couponInput.value : '').trim().toUpperCase();
  if (!code) {
    showToast('Please enter a valid promo code', 'error');
    return;
  }

  const found = RESTAURANT_CONFIG.coupons.find(c => c.code === code);
  if (!found) {
    showToast(`Invalid promo code "${code}"`, 'error');
    return;
  }

  const totals = calculateCartTotals();
  if (totals.subtotal < found.minOrder) {
    showToast(`Min order of ${RESTAURANT_CONFIG.currency}${found.minOrder} required for ${code}`, 'warning');
    return;
  }

  State.appliedCoupon = found;
  if (elements.couponMessage) {
    elements.couponMessage.textContent = `Applied "${code}" - ${found.desc}`;
    elements.couponMessage.className = 'text-xs text-emerald-400 font-semibold mt-1.5 block';
  }
  updateCartUI();
  showToast(`Promo code "${code}" applied successfully!`, 'success');
}

function applyQuickCoupon(code) {
  if (elements.couponInput) {
    elements.couponInput.value = code;
  }
  applyCouponCode();
}

// Order Generation Helpers
function generateOrderId() {
  return 'DF-' + Math.floor(1000 + Math.random() * 9000);
}

function collectCustomerDetails() {
  const isDineIn = State.orderType === 'dine-in';
  
  if (elements.customerNameInput) State.customerName = elements.customerNameInput.value.trim();
  if (elements.customerPhoneInput) State.customerPhone = elements.customerPhoneInput.value.trim();
  if (elements.customerAddressInput) State.deliveryAddress = elements.customerAddressInput.value.trim();
  if (elements.orderNotesInput) State.specialNotes = elements.orderNotesInput.value.trim();

  if (!State.customerName) {
    State.customerName = isDineIn ? `Guest at Table ${State.tableNumber}` : 'Guest Customer';
  }
  if (!State.customerPhone) {
    State.customerPhone = '+91 Guest';
  }
  if (!isDineIn && !State.deliveryAddress) {
    State.deliveryAddress = 'Dine-In / Counter Pickup';
  }

  return {
    customerName: State.customerName,
    customerPhone: State.customerPhone,
    deliveryAddress: State.deliveryAddress,
    specialNotes: State.specialNotes
  };
}

// 1-Click WhatsApp Direct Food Order Formatter
function buildWhatsAppOrderMessage(order) {
  const isDineIn = order.orderType === 'dine-in';
  const timestampStr = new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let text = `🍽️ *NEW ORDER - ${RESTAURANT_CONFIG.name.toUpperCase()}*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📌 *Order ID:* #${order.orderId}\n`;
  text += `📍 *Type:* ${isDineIn ? `Dine-In (*Table #${order.tableNumber}*)` : `🛵 Takeaway / Delivery`}\n`;
  text += `👤 *Customer:* ${order.customerName} (${order.customerPhone})\n`;
  if (!isDineIn && order.deliveryAddress) {
    text += `🏠 *Address:* ${order.deliveryAddress}\n`;
  }
  text += `⏰ *Placed at:* ${timestampStr}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📋 *ORDER ITEMS:*\n`;

  order.items.forEach((item, index) => {
    const symbol = item.veg ? '🟢 [VEG]' : '🔴 [NON-VEG]';
    text += `\n*${index + 1}. ${item.name}* (x${item.qty}) - ₹${(item.price * item.qty).toFixed(2)}\n`;
    text += `   ${symbol}\n`;
    if (item.customizations && item.customizations.length > 0) {
      const customStr = item.customizations.join(', ');
      text += `   └ Choice: _${customStr}_\n`;
    }
    if (item.note) {
      text += `   └ Note: "${item.note}"\n`;
    }
  });

  if (order.notes) {
    text += `\n📝 *Kitchen Note:* "${order.notes}"\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💵 *BILL BREAKDOWN:*\n`;
  text += `• Subtotal: ₹${order.subtotal.toFixed(2)}\n`;
  if (order.discount > 0) {
    text += `• Discount: -₹${order.discount.toFixed(2)}\n`;
  }
  if (order.packingFee > 0) {
    text += `• Packaging: ₹${order.packingFee.toFixed(2)}\n`;
  }
  if (order.deliveryFee > 0) {
    text += `• Delivery Fee: ₹${order.deliveryFee.toFixed(2)}\n`;
  }
  text += `• GST (5%): ₹${order.gst.toFixed(2)}\n`;
  text += `\n*💰 GRAND TOTAL: ₹${order.total.toFixed(2)}*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💳 *Payment Mode:* ${order.paymentStatus === 'paid_upi' ? '✅ Paid via UPI (' + order.upiRef + ')' : '⏳ UPI / Cash upon Table Settlement'}\n\n`;
  text += `_⚡ Sent instantly via diner-flow Contactless QR Engine (Zero 30% Swiggy/Zomato commission!)_`;

  return text;
}

// Send Order directly via WhatsApp
function placeOrderViaWhatsApp() {
  if (State.cart.length === 0) {
    showToast('Your cart is empty! Please add dishes first.', 'warning');
    return;
  }

  const details = collectCustomerDetails();
  const totals = calculateCartTotals();
  const orderId = generateOrderId();

  const formattedItems = State.cart.map(entry => ({
    id: entry.item.id,
    name: entry.item.name,
    qty: entry.qty,
    price: entry.unitPrice,
    veg: entry.item.veg,
    customizations: entry.customizations.map(c => c.label),
    note: entry.note
  }));

  const newOrder = {
    orderId: orderId,
    orderType: State.orderType,
    tableNumber: State.orderType === 'dine-in' ? State.tableNumber : null,
    customerName: details.customerName,
    customerPhone: details.customerPhone,
    deliveryAddress: details.deliveryAddress,
    timestamp: new Date().toISOString(),
    status: 'received',
    prepTargetMinutes: 15,
    items: formattedItems,
    notes: details.specialNotes,
    subtotal: totals.subtotal,
    discount: totals.discount,
    gst: totals.gst,
    packingFee: totals.packingFee,
    deliveryFee: totals.deliveryFee,
    total: totals.grandTotal,
    paymentStatus: 'pending',
    upiRef: null
  };

  // Save to storage & trigger KOT HUD
  saveOrderToStorage(newOrder);
  State.activeOrder = newOrder;
  sessionStorage.setItem('diner_active_order', JSON.stringify(newOrder));

  // Build WhatsApp URL
  const waMessage = buildWhatsAppOrderMessage(newOrder);
  const waUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  // Clear cart and show order confirmation
  State.cart = [];
  State.appliedCoupon = null;
  updateCartUI();
  closeCartDrawer();

  // Trigger celebration confetti
  triggerConfetti();

  // Open WhatsApp in new tab
  window.open(waUrl, '_blank');

  // Show Order Tracker modal
  showOrderSuccessModal(newOrder);
}

// UPI QR Code Payment Modal
function openUpiPaymentModal() {
  if (State.cart.length === 0) {
    showToast('Your cart is empty! Please add dishes first.', 'warning');
    return;
  }

  const details = collectCustomerDetails();
  const totals = calculateCartTotals();
  const orderId = generateOrderId();

  const formattedItems = State.cart.map(entry => ({
    id: entry.item.id,
    name: entry.item.name,
    qty: entry.qty,
    price: entry.unitPrice,
    veg: entry.item.veg,
    customizations: entry.customizations.map(c => c.label),
    note: entry.note
  }));

  const pendingOrder = {
    orderId: orderId,
    orderType: State.orderType,
    tableNumber: State.orderType === 'dine-in' ? State.tableNumber : null,
    customerName: details.customerName,
    customerPhone: details.customerPhone,
    deliveryAddress: details.deliveryAddress,
    timestamp: new Date().toISOString(),
    status: 'received',
    prepTargetMinutes: 15,
    items: formattedItems,
    notes: details.specialNotes,
    subtotal: totals.subtotal,
    discount: totals.discount,
    gst: totals.gst,
    packingFee: totals.packingFee,
    deliveryFee: totals.deliveryFee,
    total: totals.grandTotal,
    paymentStatus: 'pending_upi',
    upiRef: null
  };

  State.activeOrder = pendingOrder;

  // Build UPI URI: upi://pay?pa=amberroast@okhdfcbank&pn=The+Amber+Roast+Kitchen&am=892.50&tn=Order_DF8392&cu=INR
  const upiPayee = encodeURIComponent(RESTAURANT_CONFIG.upiPayeeName);
  const upiId = RESTAURANT_CONFIG.upiId;
  const upiAmount = totals.grandTotal.toFixed(2);
  const upiNote = encodeURIComponent(`Order_${orderId}`);
  const upiUri = `upi://pay?pa=${upiId}&pn=${upiPayee}&am=${upiAmount}&tn=${upiNote}&cu=INR`;

  const modal = elements.upiModal;
  const upiContent = document.getElementById('upiModalContent');
  if (!modal || !upiContent) return;

  upiContent.innerHTML = `
    <div class="p-5 text-center">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-3 border border-emerald-500/30">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>

      <h3 class="text-xl font-bold text-white mb-1">Instant Zero-Contact UPI Payment</h3>
      <p class="text-xs text-slate-400 mb-4">Scan with GPay, PhonePe, Paytm, BHIM, or any UPI App</p>

      <!-- Amount Banner -->
      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
        <div class="text-left">
          <span class="text-[11px] text-slate-400 block">Total Amount to Pay</span>
          <span class="text-xs font-semibold text-slate-300">Order #${orderId}</span>
        </div>
        <div class="text-2xl font-extrabold text-amber-400">
          ${RESTAURANT_CONFIG.currency}${upiAmount}
        </div>
      </div>

      <!-- QR Container -->
      <div class="relative mx-auto w-56 h-56 bg-white p-3 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-amber-500/30 mb-4">
        <div id="upiQrCodeTarget" class="w-full h-full flex items-center justify-center"></div>
      </div>

      <!-- UPI ID Copy Bar -->
      <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between mb-4">
        <div class="text-left truncate pr-2">
          <span class="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">UPI ID / VPA</span>
          <span class="text-xs font-mono font-bold text-amber-400 truncate">${upiId}</span>
        </div>
        <button 
          onclick="copyUpiId('${upiId}')"
          class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1">
          <span>📋</span> Copy
        </button>
      </div>

      <!-- Supported Apps Badge Row -->
      <div class="flex items-center justify-center gap-2 mb-5 opacity-80 text-[11px] text-slate-400">
        <span class="px-2 py-0.5 rounded bg-slate-800/80">Google Pay</span>
        <span class="px-2 py-0.5 rounded bg-slate-800/80">PhonePe</span>
        <span class="px-2 py-0.5 rounded bg-slate-800/80">Paytm</span>
        <span class="px-2 py-0.5 rounded bg-slate-800/80">Cred UPI</span>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2">
        <button 
          onclick="confirmUpiPaymentAndPlaceOrder()"
          class="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all">
          <span>✓ I Have Completed Payment</span>
        </button>
        <button 
          onclick="closeUpiModal()"
          class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors">
          Cancel / Pay Later
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // Render QR Code inside target
  setTimeout(() => {
    const target = document.getElementById('upiQrCodeTarget');
    if (target && typeof QRCode !== 'undefined') {
      target.innerHTML = '';
      new QRCode(target, {
        text: upiUri,
        width: 190,
        height: 190,
        colorDark: '#0b0f19',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    } else if (target) {
      // Fallback if QRCode CDN has not loaded yet
      target.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=${encodeURIComponent(upiUri)}" alt="UPI QR" class="w-full h-full object-contain" />`;
    }
  }, 50);
}

function closeUpiModal() {
  const modal = elements.upiModal;
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function copyUpiId(upiId) {
  navigator.clipboard.writeText(upiId).then(() => {
    showToast('UPI ID copied to clipboard!', 'success');
  }).catch(() => {
    showToast(`UPI ID: ${upiId}`, 'info');
  });
}

function confirmUpiPaymentAndPlaceOrder() {
  if (!State.activeOrder) return;
  
  const order = State.activeOrder;
  order.paymentStatus = 'paid_upi';
  order.upiRef = 'UPI-TXN-' + Math.floor(100000 + Math.random() * 900000);
  order.status = 'received';

  // Save to storage & notify kitchen KOT
  saveOrderToStorage(order);
  sessionStorage.setItem('diner_active_order', JSON.stringify(order));

  // Reset cart
  State.cart = [];
  State.appliedCoupon = null;
  updateCartUI();
  closeUpiModal();
  closeCartDrawer();

  // Trigger celebration confetti
  triggerConfetti();

  // Show Order Tracker modal
  showOrderSuccessModal(order);
}

// Order Tracker Modal & Status Update
function showOrderSuccessModal(order) {
  const modal = elements.orderSuccessModal;
  const content = document.getElementById('orderSuccessModalContent');
  if (!modal || !content) return;

  const isDineIn = order.orderType === 'dine-in';

  content.innerHTML = `
    <div class="p-6 text-center">
      <!-- Animated Status Icon -->
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mb-4 border border-amber-500/30 animate-soft-pulse">
        <span class="text-3xl">👨‍🍳</span>
      </div>

      <span class="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-block mb-2">
        Order Ticket Generated #${order.orderId}
      </span>

      <h3 class="text-2xl font-extrabold text-white mb-1">
        ${isDineIn ? `Table ${order.tableNumber} Order Received!` : 'Takeaway Order Received!'}
      </h3>
      <p class="text-xs sm:text-sm text-slate-400 mb-6">
        The kitchen has received your ticket. Watch live preparation status below.
      </p>

      <!-- Live Pipeline Tracker -->
      <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6">
        <div class="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs font-semibold mb-3">
          <div class="text-amber-400">1. Received</div>
          <div class="${order.status === 'preparing' || order.status === 'ready' || order.status === 'completed' ? 'text-blue-400' : 'text-slate-600'}">2. Preparing</div>
          <div class="${order.status === 'ready' || order.status === 'completed' ? 'text-emerald-400' : 'text-slate-600'}">3. Ready</div>
          <div class="${order.status === 'completed' ? 'text-slate-300' : 'text-slate-600'}">4. Served</div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500 h-full rounded-full transition-all duration-700" style="width: ${getProgressWidth(order.status)}%"></div>
        </div>
      </div>

      <!-- Order Items Summary List -->
      <div class="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 mb-6 text-left max-h-40 overflow-y-auto">
        <span class="text-[11px] text-slate-400 uppercase tracking-wider font-bold block mb-2">Items Ordered:</span>
        <div class="space-y-1.5 text-xs">
          ${order.items.map(i => `
            <div class="flex justify-between text-slate-300">
              <span>${i.qty}x ${i.name}</span>
              <span class="font-semibold">${RESTAURANT_CONFIG.currency}${(i.price * i.qty).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        <div class="pt-2 mt-2 border-t border-slate-800 flex justify-between font-bold text-white text-xs sm:text-sm">
          <span>Grand Total</span>
          <span class="text-amber-400">${RESTAURANT_CONFIG.currency}${order.total.toFixed(2)}</span>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a 
          href="kitchen.html" 
          target="_blank"
          class="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-slate-700">
          <span>📺</span> Open Kitchen KOT HUD
        </a>
        <button 
          onclick="closeOrderSuccessModal()"
          class="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-colors">
          Back to Menu
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  renderActiveOrderBanner();
}

function getProgressWidth(status) {
  switch (status) {
    case 'received': return 25;
    case 'preparing': return 55;
    case 'ready': return 85;
    case 'completed': return 100;
    default: return 20;
  }
}

function closeOrderSuccessModal() {
  const modal = elements.orderSuccessModal;
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function renderActiveOrderBanner() {
  if (!elements.activeOrderBanner || !State.activeOrder) return;
  const o = State.activeOrder;
  
  elements.activeOrderBanner.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span class="font-bold text-white">Active Order #${o.orderId}:</span>
        <span class="text-amber-400 uppercase font-semibold">${o.status}</span>
        <span class="text-slate-400 hidden sm:inline">(${o.orderType === 'dine-in' ? `Table ${o.tableNumber}` : 'Takeaway'})</span>
      </div>
      <button 
        onclick="showOrderSuccessModal(State.activeOrder)"
        class="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors">
        Track Live Status
      </button>
    </div>
  `;
  elements.activeOrderBanner.classList.remove('hidden');
}

function handleOrderStatusUpdateFromKitchen(updatedOrder) {
  if (State.activeOrder && State.activeOrder.orderId === updatedOrder.orderId) {
    State.activeOrder = updatedOrder;
    sessionStorage.setItem('diner_active_order', JSON.stringify(updatedOrder));
    renderActiveOrderBanner();
    showToast(`Order #${updatedOrder.orderId} status updated: ${updatedOrder.status.toUpperCase()}`, 'info');
  }
}

// Confetti Celebration
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = elements.toastContainer || document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const typeStyles = {
    info: 'bg-slate-900 border-slate-700 text-slate-200',
    success: 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200',
    warning: 'bg-amber-950/95 border-amber-500/50 text-amber-200',
    error: 'bg-red-950/95 border-red-500/50 text-red-200'
  };

  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  toast.className = `p-3.5 rounded-xl border shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium backdrop-blur-md transform transition-all duration-300 translate-y-4 opacity-0 ${typeStyles[type] || typeStyles.info}`;
  toast.innerHTML = `<span>${icons[type] || '🔔'}</span><span class="flex-1">${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Setup Event Listeners
function setupEventListeners() {
  // Search
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      State.searchQuery = e.target.value;
      if (elements.clearSearchBtn) {
        elements.clearSearchBtn.style.display = State.searchQuery ? 'block' : 'none';
      }
      renderMenuItems();
    });
  }

  if (elements.clearSearchBtn) {
    elements.clearSearchBtn.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      State.searchQuery = '';
      elements.clearSearchBtn.style.display = 'none';
      renderMenuItems();
    });
  }

  // Veg filter
  if (elements.filterVeg) {
    elements.filterVeg.addEventListener('change', (e) => {
      State.filterVegOnly = e.target.checked;
      renderMenuItems();
    });
  }

  // Spicy filter
  if (elements.filterSpicy) {
    elements.filterSpicy.addEventListener('change', (e) => {
      State.filterSpicyOnly = e.target.checked;
      renderMenuItems();
    });
  }

  // Table Select
  if (elements.tableSelect) {
    elements.tableSelect.addEventListener('change', (e) => {
      setTableNumber(e.target.value);
    });
  }

  // Cart Floating Bar View Click
  if (elements.viewCartBtn) {
    elements.viewCartBtn.addEventListener('click', openCartDrawer);
  }

  // Close Cart Drawer
  if (elements.closeCartDrawerBtn) {
    elements.closeCartDrawerBtn.addEventListener('click', closeCartDrawer);
  }

  // Backdrop close
  if (elements.cartDrawerBackdrop) {
    elements.cartDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === elements.cartDrawerBackdrop) {
        closeCartDrawer();
      }
    });
  }

  // Coupon Apply button
  if (elements.applyCouponBtn) {
    elements.applyCouponBtn.addEventListener('click', applyCouponCode);
  }

  // WhatsApp Button
  if (elements.whatsappOrderBtn) {
    elements.whatsappOrderBtn.addEventListener('click', placeOrderViaWhatsApp);
  }

  // UPI Pay Button
  if (elements.payUpiBtn) {
    elements.payUpiBtn.addEventListener('click', openUpiPaymentModal);
  }
}
