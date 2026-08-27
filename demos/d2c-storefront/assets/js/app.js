/**
 * D2C Headless Storefront Pro - Core Application Engine
 * Vanilla JS SPA Engine - Zero Build Step Required
 */

// Global State
const STATE = {
  products: [...PRODUCTS_DATA],
  filteredProducts: [...PRODUCTS_DATA],
  cart: JSON.parse(localStorage.getItem('nv_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('nv_wishlist') || '[]'),
  appliedPromo: JSON.parse(localStorage.getItem('nv_promo') || 'null'),
  selectedCategory: 'all',
  sortBy: 'featured',
  searchQuery: '',
  activeProductModal: null,
  selectedVariant: {
    size: null,
    color: null,
    quantity: 1,
    imageIndex: 0
  },
  pincodeData: null,
  brandWhatsApp: "919876543210", // Default D2C Merchant WhatsApp
  brandName: "NEO//VAULT",
  freeShippingThreshold: 1999,
  shippingFlatRate: 149
};

// --- Web Audio SFX Engine (Zero external dependencies) ---
const SFX = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch(e) {}
  },
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (i * 0.07));
        gain.gain.setValueAtTime(0.15, now + (i * 0.07));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.07) + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + (i * 0.07));
        osc.stop(now + (i * 0.07) + 0.25);
      });
    } catch(e) {}
  }
};

// --- Toast System ---
function showToast(message, type = 'info', icon = 'bell') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const typeStyles = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200 glow-emerald',
    error: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
    info: 'bg-zinc-900/90 border-purple-500/40 text-zinc-100 glow-purple',
    warning: 'bg-amber-950/90 border-amber-500/50 text-amber-200'
  }[type] || 'bg-zinc-900 border-zinc-700 text-white';

  toast.className = `toast flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl text-sm font-medium ${typeStyles}`;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// --- Formatters ---
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// --- Wishlist Management ---
function toggleWishlist(productId) {
  SFX.playPop();
  const index = STATE.wishlist.indexOf(productId);
  const product = STATE.products.find(p => p.id === productId);
  if (index > -1) {
    STATE.wishlist.splice(index, 1);
    showToast(`Removed ${product ? product.name.slice(0, 20) + '...' : 'item'} from wishlist`, 'info', 'heart-off');
  } else {
    STATE.wishlist.push(productId);
    showToast(`Added to wishlist! ❤️`, 'success', 'heart');
  }
  localStorage.setItem('nv_wishlist', JSON.stringify(STATE.wishlist));
  updateWishlistUI();
  renderProducts();
  if (STATE.activeProductModal) {
    updateModalWishlistBtn();
  }
}

function updateWishlistUI() {
  const countEls = document.querySelectorAll('.wishlist-count-badge');
  countEls.forEach(el => {
    el.textContent = STATE.wishlist.length;
    el.classList.toggle('hidden', STATE.wishlist.length === 0);
  });
  renderWishlistDrawer();
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishlist-items-container');
  const emptyState = document.getElementById('wishlist-empty-state');
  if (!container || !emptyState) return;

  const wishlistProducts = STATE.products.filter(p => STATE.wishlist.includes(p.id));
  
  if (wishlistProducts.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  container.innerHTML = wishlistProducts.map(p => `
    <div class="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-purple-500/30 transition-all">
      <img src="${p.images[0]}" alt="${p.name}" class="w-16 h-16 object-cover rounded-lg bg-zinc-800 border border-white/10 shrink-0">
      <div class="flex-1 min-w-0">
        <h4 class="font-heading text-sm font-semibold text-white truncate">${p.name}</h4>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-purple-400 font-bold font-mono text-sm">${formatINR(p.price)}</span>
          <span class="text-zinc-500 line-through text-xs">${formatINR(p.originalPrice)}</span>
        </div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button onclick="quickAddToCart('${p.id}')" class="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors" title="Add to Cart">
          <i data-lucide="shopping-bag" class="w-4 h-4"></i>
        </button>
        <button onclick="toggleWishlist('${p.id}')" class="p-2 rounded-lg bg-zinc-800 hover:bg-rose-900/40 text-zinc-400 hover:text-rose-400 transition-colors" title="Remove">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// --- Cart Management ---
function addToCart(productId, size, color, quantity = 1) {
  SFX.playPop();
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  const chosenSize = size || product.sizes[0] || "Standard";
  const chosenColor = color || product.colors[0]?.name || "Default";
  const cartItemId = `${productId}_${chosenSize}_${chosenColor}`;

  const existingItem = STATE.cart.find(item => item.cartItemId === cartItemId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    STATE.cart.push({
      cartItemId,
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: chosenSize,
      color: chosenColor,
      quantity: quantity
    });
  }

  localStorage.setItem('nv_cart', JSON.stringify(STATE.cart));
  updateCartUI();
  showToast(`Added "${product.name.slice(0, 18)}..." to cart! 🛍️`, 'success', 'shopping-bag');
  openCartDrawer();
}

function quickAddToCart(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;
  addToCart(productId, product.sizes[0], product.colors[0]?.name, 1);
}

function updateCartQuantity(cartItemId, delta) {
  SFX.playPop();
  const item = STATE.cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    STATE.cart = STATE.cart.filter(i => i.cartItemId !== cartItemId);
    showToast('Item removed from cart', 'info', 'trash-2');
  }
  localStorage.setItem('nv_cart', JSON.stringify(STATE.cart));
  updateCartUI();
}

function removeCartItem(cartItemId) {
  SFX.playPop();
  STATE.cart = STATE.cart.filter(i => i.cartItemId !== cartItemId);
  localStorage.setItem('nv_cart', JSON.stringify(STATE.cart));
  updateCartUI();
  showToast('Item removed from cart', 'info', 'trash-2');
}

function clearCart() {
  STATE.cart = [];
  STATE.appliedPromo = null;
  localStorage.removeItem('nv_cart');
  localStorage.removeItem('nv_promo');
  updateCartUI();
}

function calculateCartTotals() {
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalSubtotal = STATE.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const totalSavings = (originalSubtotal - subtotal);
  
  let discount = 0;
  let freeShippingFromPromo = false;

  if (STATE.appliedPromo) {
    const promo = PROMO_CODES[STATE.appliedPromo];
    if (promo) {
      if (promo.type === 'percent') {
        discount = Math.round((subtotal * promo.value) / 100);
      } else if (promo.type === 'flat') {
        if (!promo.minOrder || subtotal >= promo.minOrder) {
          discount = promo.value;
        }
      } else if (promo.type === 'shipping') {
        freeShippingFromPromo = true;
      }
    }
  }

  const qualifiesFreeShipping = (subtotal >= STATE.freeShippingThreshold) || freeShippingFromPromo || (subtotal === 0);
  const shipping = (subtotal === 0 || qualifiesFreeShipping) ? 0 : STATE.shippingFlatRate;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return {
    subtotal,
    originalSubtotal,
    totalSavings,
    discount,
    shipping,
    grandTotal,
    qualifiesFreeShipping,
    freeShippingThreshold: STATE.freeShippingThreshold,
    amountNeededForFreeShipping: Math.max(0, STATE.freeShippingThreshold - subtotal)
  };
}

function updateCartUI() {
  const totals = calculateCartTotals();
  const totalItemsCount = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update badges
  document.querySelectorAll('.cart-count-badge').forEach(el => {
    el.textContent = totalItemsCount;
    el.classList.toggle('hidden', totalItemsCount === 0);
  });

  document.querySelectorAll('.cart-total-badge').forEach(el => {
    el.textContent = formatINR(totals.grandTotal);
  });

  // Free shipping progress bar
  const progressBar = document.getElementById('free-shipping-progress');
  const progressText = document.getElementById('free-shipping-text');
  if (progressBar && progressText) {
    const percent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
    progressBar.style.width = `${percent}%`;
    if (totals.subtotal === 0) {
      progressText.innerHTML = `Add items to unlock <span class="text-purple-400 font-bold">FREE Express Delivery</span> over ₹1,999`;
    } else if (totals.qualifiesFreeShipping) {
      progressText.innerHTML = `🎉 <span class="text-emerald-400 font-bold">You unlocked FREE Express Delivery!</span>`;
      progressBar.classList.remove('bg-purple-600');
      progressBar.classList.add('bg-emerald-500');
    } else {
      progressText.innerHTML = `Add <span class="text-purple-400 font-bold">${formatINR(totals.amountNeededForFreeShipping)}</span> more for <span class="text-emerald-400 font-bold">FREE Shipping</span>`;
      progressBar.classList.add('bg-purple-600');
      progressBar.classList.remove('bg-emerald-500');
    }
  }

  // Render items in cart drawer
  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const footer = document.getElementById('cart-drawer-footer');

  if (container && emptyState && footer) {
    if (STATE.cart.length === 0) {
      container.innerHTML = '';
      emptyState.classList.remove('hidden');
      footer.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      footer.classList.remove('hidden');

      container.innerHTML = STATE.cart.map(item => `
        <div class="flex items-start gap-3.5 p-3 rounded-xl bg-zinc-900/70 border border-white/5 hover:border-purple-500/20 transition-all">
          <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg bg-zinc-800 border border-white/10 shrink-0">
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-1">
              <h4 class="font-heading text-xs font-semibold text-white truncate max-w-[160px]">${item.name}</h4>
              <button onclick="removeCartItem('${item.cartItemId}')" class="text-zinc-500 hover:text-rose-400 transition-colors p-1" title="Remove">
                <i data-lucide="x" class="w-3.5 h-3.5"></i>
              </button>
            </div>
            <div class="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
              <span class="bg-zinc-800 px-2 py-0.5 rounded border border-white/5">${item.size}</span>
              <span class="bg-zinc-800 px-2 py-0.5 rounded border border-white/5">${item.color}</span>
            </div>
            <div class="flex items-center justify-between mt-2.5">
              <span class="font-mono font-bold text-sm text-purple-400">${formatINR(item.price * item.quantity)}</span>
              <div class="flex items-center gap-2 bg-zinc-800/90 rounded-lg p-0.5 border border-white/10">
                <button onclick="updateCartQuantity('${item.cartItemId}', -1)" class="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700 text-zinc-300 transition-colors">
                  <i data-lucide="minus" class="w-3 h-3"></i>
                </button>
                <span class="font-mono text-xs font-bold w-4 text-center text-white">${item.quantity}</span>
                <button onclick="updateCartQuantity('${item.cartItemId}', 1)" class="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700 text-zinc-300 transition-colors">
                  <i data-lucide="plus" class="w-3 h-3"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Update summary numbers in drawer
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const discountRow = document.getElementById('cart-discount-row');
  const discountEl = document.getElementById('cart-discount-val');
  const promoTagEl = document.getElementById('cart-applied-promo-tag');
  const shippingEl = document.getElementById('cart-shipping-val');
  const grandTotalEl = document.getElementById('cart-grandtotal-val');

  if (subtotalEl) subtotalEl.textContent = formatINR(totals.subtotal);
  if (shippingEl) {
    shippingEl.innerHTML = totals.shipping === 0 
      ? `<span class="text-emerald-400 font-bold uppercase tracking-wider text-xs">FREE</span>` 
      : formatINR(totals.shipping);
  }
  if (grandTotalEl) grandTotalEl.textContent = formatINR(totals.grandTotal);

  if (discountRow && discountEl && promoTagEl) {
    if (totals.discount > 0 || STATE.appliedPromo) {
      discountRow.classList.remove('hidden');
      discountEl.textContent = `-${formatINR(totals.discount)}`;
      promoTagEl.textContent = `(${STATE.appliedPromo})`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  lucide.createIcons();
}

// --- Promo Code Application ---
function applyPromoCode(code) {
  const cleanCode = (code || document.getElementById('promo-input')?.value || '').trim().toUpperCase();
  if (!cleanCode) {
    showToast('Please enter a valid coupon code', 'warning', 'alert-circle');
    return;
  }

  const promo = PROMO_CODES[cleanCode];
  if (!promo) {
    showToast(`Invalid coupon "${cleanCode}". Try "CYBER20" or "NEODROP500"`, 'error', 'x-circle');
    return;
  }

  const totals = calculateCartTotals();
  if (promo.minOrder && totals.subtotal < promo.minOrder) {
    showToast(`Code "${cleanCode}" requires a min. order of ${formatINR(promo.minOrder)}`, 'warning', 'alert-circle');
    return;
  }

  STATE.appliedPromo = cleanCode;
  localStorage.setItem('nv_promo', JSON.stringify(cleanCode));
  SFX.playSuccess();
  showToast(`🎉 Coupon "${cleanCode}" applied! ${promo.desc}`, 'success', 'sparkles');
  updateCartUI();

  const input = document.getElementById('promo-input');
  if (input) input.value = '';
}

function removePromoCode() {
  STATE.appliedPromo = null;
  localStorage.removeItem('nv_promo');
  showToast('Coupon removed', 'info', 'tag');
  updateCartUI();
}

// --- Pincode SLA Checker ---
function checkPincode(pincode) {
  const pin = (pincode || '').toString().trim();
  const resultEl = document.getElementById('pincode-result');
  if (!pin || pin.length !== 6 || isNaN(pin)) {
    if (resultEl) {
      resultEl.innerHTML = `<span class="text-rose-400 flex items-center gap-1.5"><i data-lucide="alert-circle" class="w-4 h-4"></i> Enter a valid 6-digit Indian PIN code</span>`;
      resultEl.classList.remove('hidden');
      lucide.createIcons();
    }
    return;
  }

  SFX.playPop();
  const known = PINCODE_DATABASE[pin];
  let info = known;

  if (!info) {
    // Algorithmic estimation for valid 6-digit pin
    const firstDigit = pin[0];
    const regionNames = {
      '1': 'Delhi/NCR, Haryana, Punjab',
      '2': 'UP & Uttarakhand',
      '3': 'Rajasthan & Gujarat',
      '4': 'Maharashtra & Goa',
      '5': 'Karnataka & Andhra/Telangana',
      '6': 'Tamil Nadu & Kerala',
      '7': 'West Bengal & East India',
      '8': 'Bihar & Jharkhand',
      '9': 'Army Postal / Remote Area'
    };
    info = {
      city: `${regionNames[firstDigit] || 'Pan India'} (${pin})`,
      sla: "📦 2-4 Business Days Express Delivery",
      cod: true,
      fast: false
    };
  }

  STATE.pincodeData = { pincode: pin, ...info };
  if (resultEl) {
    resultEl.innerHTML = `
      <div class="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
        <div class="font-bold flex items-center gap-1.5 text-white">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>Delivering to ${info.city}</span>
        </div>
        <div class="mt-1 flex items-center justify-between">
          <span>${info.sla}</span>
          <span class="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">COD Available</span>
        </div>
      </div>
    `;
    resultEl.classList.remove('hidden');
    lucide.createIcons();
  }
}

// --- WhatsApp 1-Click Checkout Generator ---
function generateWhatsAppOrderMessage(customerDetails = {}) {
  const totals = calculateCartTotals();
  if (STATE.cart.length === 0) {
    showToast('Your cart is empty!', 'warning', 'shopping-bag');
    return null;
  }

  const orderId = `NV-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  let msg = `🛍️ *NEW DIRECT ORDER - ${STATE.brandName}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🆔 *Order Reference:* #${orderId}\n`;
  msg += `📅 *Date:* ${dateStr}\n\n`;
  
  msg += `📦 *ITEMS ORDERED:*\n`;
  STATE.cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}*\n`;
    msg += `   ▪ Variant: Size *${item.size}* | Color: *${item.color}*\n`;
    msg += `   ▪ Qty: *${item.quantity}* × ${formatINR(item.price)} = *${formatINR(item.price * item.quantity)}*\n\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *PAYMENT SUMMARY:*\n`;
  msg += `• Subtotal: ${formatINR(totals.subtotal)}\n`;
  if (totals.discount > 0) {
    msg += `• Coupon (${STATE.appliedPromo}): -${formatINR(totals.discount)}\n`;
  }
  msg += `• Express Delivery: ${totals.shipping === 0 ? 'FREE' : formatINR(totals.shipping)}\n`;
  msg += `• *TOTAL PAYABLE: ${formatINR(totals.grandTotal)}*\n\n`;

  if (customerDetails.name) {
    msg += `📍 *DELIVERY ADDRESS:*\n`;
    msg += `• Name: *${customerDetails.name}*\n`;
    msg += `• Phone: *${customerDetails.phone || 'Provided via WhatsApp'}*\n`;
    msg += `• Address: ${customerDetails.address || ''}, ${customerDetails.city || ''} - *${customerDetails.pincode || ''}*\n\n`;
  } else {
    msg += `📍 *DELIVERY DETAILS:*\n(Please confirm your shipping address below)\n\n`;
  }

  msg += `⚡ _Ready to complete order! Please confirm bank account/UPI ID or dispatch confirmation._`;

  return {
    orderId,
    encodedText: encodeURIComponent(msg),
    rawText: msg
  };
}

function triggerWhatsAppCheckout() {
  const order = generateWhatsAppOrderMessage();
  if (!order) return;

  SFX.playSuccess();
  const waUrl = `https://wa.me/${STATE.brandWhatsApp}?text=${order.encodedText}`;
  
  // Copy text to clipboard as backup
  navigator.clipboard?.writeText(order.rawText).catch(() => {});

  showToast('Opening WhatsApp with your formatted order summary! 📱', 'success', 'send');
  window.open(waUrl, '_blank');
}

// --- Payment Simulator & Modal ---
function openCheckoutModal() {
  if (STATE.cart.length === 0) {
    showToast('Your cart is empty!', 'warning', 'shopping-cart');
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  const totals = calculateCartTotals();
  const summaryEl = document.getElementById('checkout-summary-total');
  if (summaryEl) summaryEl.textContent = formatINR(totals.grandTotal);

  modal.classList.add('active');
  lucide.createIcons();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('active');
}

function simulatePaymentSubmission(event) {
  event.preventDefault();
  const form = document.getElementById('checkout-form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const customer = {
    name: formData.get('fullName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    address: formData.get('address'),
    city: formData.get('city'),
    pincode: formData.get('pincode'),
    paymentMethod: formData.get('paymentMethod') || 'upi'
  };

  const btn = document.getElementById('pay-submit-btn');
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> <span>Securing Transaction...</span>`;
  lucide.createIcons();

  setTimeout(() => {
    btn.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5"></i> <span>Verified! Generating Receipt...</span>`;
    lucide.createIcons();

    setTimeout(() => {
      closeCheckoutModal();
      openSuccessModal(customer);
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }, 900);
  }, 1600);
}

function openSuccessModal(customer) {
  SFX.playSuccess();
  const modal = document.getElementById('order-success-modal');
  if (!modal) return;

  const totals = calculateCartTotals();
  const orderId = `NV-${Math.floor(100000 + Math.random() * 900000)}`;

  document.getElementById('success-order-id').textContent = `#${orderId}`;
  document.getElementById('success-customer-name').textContent = customer.name;
  document.getElementById('success-customer-phone').textContent = customer.phone;
  document.getElementById('success-customer-address').textContent = `${customer.address}, ${customer.city} - ${customer.pincode}`;
  document.getElementById('success-order-total').textContent = formatINR(totals.grandTotal);
  document.getElementById('success-payment-mode').textContent = (customer.paymentMethod || 'UPI').toUpperCase();

  // Trigger Confetti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981', '#ffffff']
    });
  }

  modal.classList.add('active');
  clearCart();
}

function closeSuccessModal() {
  const modal = document.getElementById('order-success-modal');
  if (modal) modal.classList.remove('active');
}

// --- Product Modal (Detail & Quick View) ---
function openProductModal(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  STATE.activeProductModal = product;
  STATE.selectedVariant = {
    size: product.sizes[0] || 'Standard',
    color: product.colors[0]?.name || 'Default',
    quantity: 1,
    imageIndex: 0
  };

  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  // Title, category, ratings
  document.getElementById('modal-product-title').textContent = product.name;
  document.getElementById('modal-product-subtitle').textContent = product.subtitle;
  document.getElementById('modal-product-category').textContent = product.category.toUpperCase();
  document.getElementById('modal-product-price').textContent = formatINR(product.price);
  document.getElementById('modal-product-mrp').textContent = formatINR(product.originalPrice);
  
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  document.getElementById('modal-product-discount').textContent = `SAVE ${discountPercent}%`;

  document.getElementById('modal-product-stock').textContent = `⚡ Only ${product.stock} items left in stock`;
  document.getElementById('modal-product-desc').textContent = product.description;
  document.getElementById('modal-product-rating').textContent = `${product.rating} ★ (${product.reviewsCount} verified reviews)`;

  // Render Thumbnails & Main Image
  renderModalGallery();

  // Render Sizes
  const sizesContainer = document.getElementById('modal-sizes-container');
  if (sizesContainer) {
    sizesContainer.innerHTML = product.sizes.map((size, idx) => `
      <button onclick="selectModalSize('${size}')" class="size-pill px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-white/10 hover:border-purple-500 transition-all ${idx === 0 ? 'active' : 'bg-zinc-900/80 text-zinc-300'}">
        ${size}
      </button>
    `).join('');
  }

  // Render Colors
  const colorsContainer = document.getElementById('modal-colors-container');
  if (colorsContainer) {
    colorsContainer.innerHTML = product.colors.map((c, idx) => `
      <button onclick="selectModalColor('${c.name}')" class="color-swatch flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-purple-500 text-xs text-zinc-300 transition-all ${idx === 0 ? 'active border-purple-500 bg-purple-900/20' : 'bg-zinc-900'}">
        <span class="w-3.5 h-3.5 rounded-full border border-white/20" style="background-color: ${c.hex};"></span>
        <span>${c.name}</span>
      </button>
    `).join('');
  }

  // Render Specs
  const specsContainer = document.getElementById('modal-specs-container');
  if (specsContainer && product.specs) {
    specsContainer.innerHTML = Object.entries(product.specs).map(([k, v]) => `
      <div class="flex items-center justify-between py-1.5 border-b border-white/5 text-xs">
        <span class="text-zinc-400">${k}</span>
        <span class="font-medium text-zinc-200 font-mono text-right">${v}</span>
      </div>
    `).join('');
  }

  // Render Reviews
  const reviewsContainer = document.getElementById('modal-reviews-container');
  if (reviewsContainer && product.reviews) {
    reviewsContainer.innerHTML = product.reviews.map(r => `
      <div class="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-white flex items-center gap-1">
            ${r.user} 
            ${r.verified ? '<i data-lucide="check-check" class="w-3 h-3 text-emerald-400"></i>' : ''}
          </span>
          <span class="text-amber-400 font-mono">★★★★★</span>
        </div>
        <p class="text-zinc-300 mt-1 italic">"${r.comment}"</p>
      </div>
    `).join('');
  }

  updateModalWishlistBtn();
  modal.classList.add('active');
  lucide.createIcons();
}

function renderModalGallery() {
  const product = STATE.activeProductModal;
  if (!product) return;

  const mainImg = document.getElementById('modal-main-image');
  const thumbsContainer = document.getElementById('modal-thumbnails-container');

  if (mainImg) {
    mainImg.src = product.images[STATE.selectedVariant.imageIndex] || product.images[0];
  }

  if (thumbsContainer) {
    thumbsContainer.innerHTML = product.images.map((img, idx) => `
      <button onclick="selectModalImage(${idx})" class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${idx === STATE.selectedVariant.imageIndex ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-white/10 opacity-60 hover:opacity-100'}">
        <img src="${img}" alt="Preview ${idx}" class="w-full h-full object-cover">
      </button>
    `).join('');
  }
}

function selectModalImage(idx) {
  STATE.selectedVariant.imageIndex = idx;
  renderModalGallery();
}

function selectModalSize(size) {
  STATE.selectedVariant.size = size;
  document.querySelectorAll('#modal-sizes-container .size-pill').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === size);
  });
}

function selectModalColor(colorName) {
  STATE.selectedVariant.color = colorName;
  document.querySelectorAll('#modal-colors-container .color-swatch').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(colorName));
  });
}

function updateModalWishlistBtn() {
  const btn = document.getElementById('modal-wishlist-btn');
  if (!btn || !STATE.activeProductModal) return;
  const inWishlist = STATE.wishlist.includes(STATE.activeProductModal.id);
  btn.innerHTML = `
    <i data-lucide="heart" class="w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-zinc-300'}"></i>
  `;
  lucide.createIcons();
}

function addModalProductToCart() {
  if (!STATE.activeProductModal) return;
  addToCart(
    STATE.activeProductModal.id,
    STATE.selectedVariant.size,
    STATE.selectedVariant.color,
    1
  );
  closeProductModal();
}

function buyModalProductNow() {
  if (!STATE.activeProductModal) return;
  addToCart(
    STATE.activeProductModal.id,
    STATE.selectedVariant.size,
    STATE.selectedVariant.color,
    1
  );
  closeProductModal();
  openCheckoutModal();
}

function inquireProductOnWhatsApp() {
  if (!STATE.activeProductModal) return;
  const p = STATE.activeProductModal;
  const text = `Hey ${STATE.brandName}! I'm looking at *${p.name}* (${formatINR(p.price)}). Can you share stock availability for size *${STATE.selectedVariant.size}*?`;
  window.open(`https://wa.me/${STATE.brandWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
}

function closeProductModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) modal.classList.remove('active');
  STATE.activeProductModal = null;
}

// --- Product Catalog Rendering & Filtering ---
function filterCategory(category) {
  STATE.selectedCategory = category;
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  applyFiltersAndSort();
}

function handleSearch(query) {
  STATE.searchQuery = query.toLowerCase().trim();
  applyFiltersAndSort();
}

function handleSort(sortValue) {
  STATE.sortBy = sortValue;
  applyFiltersAndSort();
}

function applyFiltersAndSort() {
  let result = [...STATE.products];

  // Category filter
  if (STATE.selectedCategory !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === STATE.selectedCategory.toLowerCase());
  }

  // Keyword Search
  if (STATE.searchQuery) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(STATE.searchQuery) ||
      p.subtitle.toLowerCase().includes(STATE.searchQuery) ||
      p.category.toLowerCase().includes(STATE.searchQuery) ||
      p.description.toLowerCase().includes(STATE.searchQuery)
    );
  }

  // Sorting
  switch (STATE.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'bestseller':
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0));
      break;
    default:
      // Featured
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  STATE.filteredProducts = result;
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById('products-grid');
  const countEl = document.getElementById('catalog-products-count');
  if (!container) return;

  if (countEl) {
    countEl.textContent = `Showing ${STATE.filteredProducts.length} items`;
  }

  if (STATE.filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h3 class="font-heading text-lg font-bold text-white">No drops found</h3>
        <p class="text-sm text-zinc-400 mt-1">Try resetting your filter or search query.</p>
        <button onclick="filterCategory('all')" class="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold">
          Reset All Filters
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = STATE.filteredProducts.map(p => {
    const isWishlisted = STATE.wishlist.includes(p.id);
    const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

    return `
      <div class="product-card glass-card rounded-2xl overflow-hidden flex flex-col group relative">
        <!-- Badge -->
        <div class="absolute top-3 left-3 z-10">
          <span class="badge-pulse inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase bg-black/70 backdrop-blur-md border border-purple-500/40 text-purple-300">
            ${p.badge}
          </span>
        </div>

        <!-- Wishlist Button -->
        <button onclick="toggleWishlist('${p.id}')" class="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-rose-500/50 text-white transition-all" title="Save to Wishlist">
          <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-zinc-300 hover:text-rose-400'}"></i>
        </button>

        <!-- Product Image & Quick View Trigger -->
        <div onclick="openProductModal('${p.id}')" class="product-image-container aspect-square w-full bg-zinc-900 cursor-pointer relative overflow-hidden">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <span class="cyber-glow-btn px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i> Quick View
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-1.5">
              <span class="uppercase tracking-wider text-purple-400">${p.category}</span>
              <span class="flex items-center gap-1 text-amber-400">
                ★ ${p.rating} <span class="text-zinc-500">(${p.reviewsCount})</span>
              </span>
            </div>

            <h3 onclick="openProductModal('${p.id}')" class="font-heading text-sm font-bold text-white hover:text-purple-400 cursor-pointer transition-colors line-clamp-2 leading-snug">
              ${p.name}
            </h3>

            <p class="text-xs text-zinc-400 mt-1 line-clamp-1">${p.subtitle}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-white/5">
            <div class="flex items-baseline justify-between mb-3">
              <div class="flex items-baseline gap-2">
                <span class="font-mono font-extrabold text-lg text-white">${formatINR(p.price)}</span>
                <span class="font-mono text-xs text-zinc-500 line-through">${formatINR(p.originalPrice)}</span>
              </div>
              <span class="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                -${discountPercent}%
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button onclick="quickAddToCart('${p.id}')" class="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 hover:border-purple-500/40 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all">
                <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> Add
              </button>
              <button onclick="openProductModal('${p.id}')" class="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all glow-purple">
                <span>Buy Now</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// --- Drawers Control ---
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer-backdrop');
  if (drawer) drawer.classList.add('active');
  const content = document.getElementById('cart-drawer-content');
  if (content) content.classList.add('active');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer-backdrop');
  if (drawer) drawer.classList.remove('active');
  const content = document.getElementById('cart-drawer-content');
  if (content) content.classList.remove('active');
}

function openWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer-backdrop');
  if (drawer) drawer.classList.add('active');
  const content = document.getElementById('wishlist-drawer-content');
  if (content) content.classList.add('active');
  renderWishlistDrawer();
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer-backdrop');
  if (drawer) drawer.classList.remove('active');
  const content = document.getElementById('wishlist-drawer-content');
  if (content) content.classList.remove('active');
}

// --- FAQ Accordion ---
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  const isOpen = !answer.classList.contains('hidden');

  document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.faq-icon').forEach(el => el.style.transform = 'rotate(0deg)');

  if (!isOpen) {
    answer.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

// --- Initialization & Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  lucide.createIcons();

  // Search input debouncer
  const searchInput = document.getElementById('main-search-input');
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => handleSearch(e.target.value), 200);
    });
  }

  // Keyboard shortcut (Escape to close modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCartDrawer();
      closeWishlistDrawer();
      closeCheckoutModal();
      closeSuccessModal();
    }
  });
});
