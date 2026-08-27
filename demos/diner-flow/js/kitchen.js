/**
 * diner-flow - Live Kitchen Order Ticket (KOT) Display & HUD Engine
 */

const KitchenState = {
  orders: [],
  activeFilter: 'active', // 'active' | 'all' | 'received' | 'preparing' | 'ready' | 'completed' | 'dine-in' | 'takeaway'
  searchQuery: '',
  audioMuted: false,
  broadcastChannel: null,
  audioContext: null
};

// Initialize Web Audio API for Chime Sound
function initAudio() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      KitchenState.audioContext = new AudioCtx();
    }
  } catch (e) {
    console.warn('Audio Context initialization error', e);
  }
}

// Synthesize pleasant restaurant order bell chime
function playKitchenOrderChime() {
  if (KitchenState.audioMuted) return;
  try {
    if (!KitchenState.audioContext) initAudio();
    if (!KitchenState.audioContext) return;

    if (KitchenState.audioContext.state === 'suspended') {
      KitchenState.audioContext.resume();
    }

    const ctx = KitchenState.audioContext;
    const now = ctx.currentTime;

    // Oscillator 1 (High tone)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.15); // E6
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Oscillator 2 (Harmonic bell chime)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1760, now + 0.1); // A6
    gain2.gain.setValueAtTime(0.2, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.8);
    osc2.start(now + 0.1);
    osc2.stop(now + 1.2);
  } catch (e) {
    console.log('Audio playback prevented or unsupported:', e);
  }
}

// Load Orders from LocalStorage
function loadOrders() {
  const data = localStorage.getItem('diner_flow_orders');
  if (data) {
    try {
      KitchenState.orders = JSON.parse(data);
    } catch (e) {
      KitchenState.orders = INITIAL_KOT_ORDERS;
    }
  } else {
    KitchenState.orders = INITIAL_KOT_ORDERS;
    localStorage.setItem('diner_flow_orders', JSON.stringify(KitchenState.orders));
  }
}

function saveOrders() {
  localStorage.setItem('diner_flow_orders', JSON.stringify(KitchenState.orders));
}

// Cross-tab synchronization
function setupBroadcastChannel() {
  try {
    KitchenState.broadcastChannel = new BroadcastChannel('diner_flow_channel');
    KitchenState.broadcastChannel.onmessage = (event) => {
      if (event.data && event.data.type === 'NEW_ORDER_PLACED') {
        handleIncomingNewOrder(event.data.order);
      }
    };
  } catch (e) {
    console.warn('BroadcastChannel error', e);
  }

  // Storage event fallback for older tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'diner_flow_orders') {
      loadOrders();
      renderKitchenHUD();
    }
  });
}

function handleIncomingNewOrder(newOrder) {
  loadOrders();
  playKitchenOrderChime();
  renderKitchenHUD();
  showKitchenToast(`⚡ New Order #${newOrder.orderId} received from ${newOrder.orderType === 'dine-in' ? `Table ${newOrder.tableNumber}` : 'Takeaway'}!`);
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  loadOrders();
  setupBroadcastChannel();
  renderKitchenHUD();
  setupKitchenEventListeners();

  // Run live countdown clock ticker every 10 seconds
  setInterval(() => {
    renderKitchenHUD();
  }, 10000);

  // Audio trigger unlock on first user click
  document.body.addEventListener('click', () => {
    if (!KitchenState.audioContext) initAudio();
  }, { once: true });
});

// Render Metrics & Order Cards
function renderKitchenHUD() {
  renderMetrics();
  renderOrderTickets();
}

function renderMetrics() {
  const activeOrders = KitchenState.orders.filter(o => o.status !== 'completed');
  const receivedOrders = KitchenState.orders.filter(o => o.status === 'received');
  const preparingOrders = KitchenState.orders.filter(o => o.status === 'preparing');
  const readyOrders = KitchenState.orders.filter(o => o.status === 'ready');
  const totalRevenue = KitchenState.orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const elActive = document.getElementById('metricActiveCount');
  const elReceived = document.getElementById('metricReceivedCount');
  const elPreparing = document.getElementById('metricPreparingCount');
  const elReady = document.getElementById('metricReadyCount');
  const elRevenue = document.getElementById('metricTotalRevenue');

  if (elActive) elActive.textContent = activeOrders.length;
  if (elReceived) elReceived.textContent = receivedOrders.length;
  if (elPreparing) elPreparing.textContent = preparingOrders.length;
  if (elReady) elReady.textContent = readyOrders.length;
  if (elRevenue) elRevenue.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
}

function getFilteredOrders() {
  return KitchenState.orders.filter(order => {
    // Status / Type Tab Filter
    if (KitchenState.activeFilter === 'active') {
      if (order.status === 'completed') return false;
    } else if (KitchenState.activeFilter === 'dine-in') {
      if (order.orderType !== 'dine-in' || order.status === 'completed') return false;
    } else if (KitchenState.activeFilter === 'takeaway') {
      if (order.orderType !== 'takeaway' || order.status === 'completed') return false;
    } else if (KitchenState.activeFilter !== 'all') {
      if (order.status !== KitchenState.activeFilter) return false;
    }

    // Search Query
    if (KitchenState.searchQuery.trim() !== '') {
      const q = KitchenState.searchQuery.toLowerCase();
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchCust = (order.customerName || '').toLowerCase().includes(q);
      const matchTable = (order.tableNumber || '').includes(q);
      const matchItem = order.items.some(i => i.name.toLowerCase().includes(q));
      if (!matchId && !matchCust && !matchTable && !matchItem) return false;
    }

    return true;
  });
}

function renderOrderTickets() {
  const container = document.getElementById('kotGridContainer');
  const emptyState = document.getElementById('kotEmptyState');
  if (!container) return;

  const orders = getFilteredOrders();

  if (orders.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = orders.map(order => {
    const elapsedMinutes = Math.floor((Date.now() - new Date(order.timestamp).getTime()) / 60000);
    const targetMinutes = order.prepTargetMinutes || 15;
    const isOverdue = elapsedMinutes > targetMinutes && order.status !== 'completed' && order.status !== 'ready';
    const isDineIn = order.orderType === 'dine-in';

    const statusBadgeColors = {
      received: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      preparing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      ready: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      completed: 'bg-slate-700/40 text-slate-400 border-slate-700'
    };

    return `
      <div class="kot-card status-${order.status} bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between transition-all duration-300 ${isOverdue ? 'ring-2 ring-red-500/80' : ''}">
        
        <!-- Top Row: Order ID, Table / Takeaway Pill, Time -->
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-extrabold text-amber-400">#${order.orderId}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${statusBadgeColors[order.status] || 'bg-slate-800 text-slate-300'}">
                  ${order.status}
                </span>
                ${isOverdue ? `
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-red-500 text-white animate-urgent-pulse">
                    ⚠️ OVERDUE (${elapsedMinutes}m)
                  </span>
                ` : ''}
              </div>
              <div class="text-base sm:text-lg font-black text-white mt-1 flex items-center gap-1.5">
                ${isDineIn ? `
                  <span class="text-amber-400">🍽️ TABLE ${order.tableNumber}</span>
                ` : `
                  <span class="text-emerald-400">🛵 TAKEAWAY / DELIVERY</span>
                `}
              </div>
            </div>

            <!-- Prep Timer Clock -->
            <div class="text-right">
              <div class="text-xs font-mono font-bold ${isOverdue ? 'text-red-400' : 'text-slate-400'}">
                ⏱️ ${elapsedMinutes}m ago
              </div>
              <span class="text-[11px] text-slate-500">Target: ${targetMinutes}m</span>
            </div>
          </div>

          <!-- Customer Info -->
          <div class="bg-slate-950/70 px-3 py-2 rounded-xl border border-slate-800/80 mb-3 flex items-center justify-between text-xs">
            <span class="text-slate-300 font-medium truncate">👤 ${order.customerName || 'Guest'}</span>
            <span class="text-slate-400 font-mono text-[11px]">${order.customerPhone || ''}</span>
          </div>

          ${order.deliveryAddress ? `
            <div class="text-[11px] text-slate-400 bg-slate-950/50 p-2 rounded-lg border border-slate-800/60 mb-3">
              🏠 <span class="text-slate-300 font-medium">Deliver to:</span> ${order.deliveryAddress}
            </div>
          ` : ''}

          <!-- Items Ordered List -->
          <div class="space-y-2 mb-4 border-t border-b border-slate-800/80 py-3">
            ${order.items.map(item => {
              const customStr = (item.customizations || []).join(', ');
              return `
                <div class="text-xs">
                  <div class="flex items-start justify-between font-bold text-white">
                    <span class="flex items-center gap-1.5">
                      <span class="${item.veg ? 'veg-symbol' : 'non-veg-symbol'} flex-shrink-0"></span>
                      <span>${item.qty}x ${item.name}</span>
                    </span>
                    <span class="text-amber-400/90 font-mono">₹${(item.price * item.qty).toFixed(0)}</span>
                  </div>
                  ${customStr ? `
                    <div class="text-[11px] text-amber-300/80 pl-5 leading-tight mt-0.5">
                      └ ${customStr}
                    </div>
                  ` : ''}
                  ${item.note ? `
                    <div class="text-[11px] text-rose-300 italic pl-5 leading-tight mt-0.5">
                      ⚡ Note: "${item.note}"
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Kitchen Notes if any -->
          ${order.notes ? `
            <div class="bg-amber-950/30 border border-amber-500/30 p-2.5 rounded-xl mb-4 text-xs text-amber-200">
              <span class="font-bold uppercase text-[10px] tracking-wider block text-amber-400">Special Instructions:</span>
              "${order.notes}"
            </div>
          ` : ''}
        </div>

        <!-- Bottom Action Bar & Status Transitions -->
        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          
          <!-- Print Slip Button -->
          <button 
            onclick="printThermalKOTSlip('${order.orderId}')"
            class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Print Thermal KOT Ticket">
            🖨️
          </button>

          <!-- Advance Status Button -->
          <div class="flex-1 flex items-center gap-2">
            ${order.status === 'received' ? `
              <button 
                onclick="advanceOrderStatus('${order.orderId}', 'preparing')"
                class="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1">
                <span>🔥 Start Cooking</span>
              </button>
            ` : ''}

            ${order.status === 'preparing' ? `
              <button 
                onclick="advanceOrderStatus('${order.orderId}', 'ready')"
                class="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1">
                <span>🔔 Mark as Ready</span>
              </button>
            ` : ''}

            ${order.status === 'ready' ? `
              <button 
                onclick="advanceOrderStatus('${order.orderId}', 'completed')"
                class="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-extrabold text-xs border border-amber-500/40 transition-all flex items-center justify-center gap-1">
                <span>✓ Settle & Complete</span>
              </button>
            ` : ''}

            ${order.status === 'completed' ? `
              <span class="text-xs text-slate-500 font-semibold py-2 px-3 text-center flex-1">
                Order Completed
              </span>
            ` : ''}
          </div>

        </div>

      </div>
    `;
  }).join('');
}

// Status Advance Logic
function advanceOrderStatus(orderId, newStatus) {
  const order = KitchenState.orders.find(o => o.orderId === orderId);
  if (!order) return;

  order.status = newStatus;
  saveOrders();
  renderKitchenHUD();

  // Notify other tabs (Customer screen)
  if (KitchenState.broadcastChannel) {
    KitchenState.broadcastChannel.postMessage({
      type: 'ORDER_STATUS_UPDATE',
      order: order
    });
  }

  showKitchenToast(`Order #${orderId} moved to ${newStatus.toUpperCase()}`);
}

// Filter Selection
function setKitchenFilter(filterName) {
  KitchenState.activeFilter = filterName;

  const tabButtons = document.querySelectorAll('.kot-filter-btn');
  tabButtons.forEach(btn => {
    if (btn.dataset.filter === filterName) {
      btn.className = 'kot-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20';
    } else {
      btn.className = 'kot-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800';
    }
  });

  renderOrderTickets();
}

// Inject Mock Order for Testing
function injectMockOrder() {
  const tableNum = String(Math.floor(1 + Math.random() * 20)).padStart(2, '0');
  const orderId = 'DF-' + Math.floor(1000 + Math.random() * 9000);
  const sampleItems = [
    {
      id: "piz-1",
      name: "Smoked Truffle & Wild Mushroom Pizza (11\")",
      qty: 1,
      price: 520,
      veg: true,
      customizations: ["Garlic Butter Herb Crust"]
    },
    {
      id: "brg-2",
      name: "Crispy Nashville Hot Fried Chicken Burger",
      qty: 1,
      price: 420,
      veg: false,
      customizations: ["Nashville Extreme Fire 🔥🔥", "Upgrade to Truffle Fries"]
    },
    {
      id: "bev-3",
      name: "Taiwanese Brown Sugar Boba Milk Tea",
      qty: 2,
      price: 280,
      veg: true,
      customizations: ["Standard 100% Sweet", "Cheese Foam Cap Layer"]
    }
  ];

  const subtotal = 1500;
  const gst = 75;
  const total = 1575;

  const mockOrder = {
    orderId: orderId,
    orderType: Math.random() > 0.3 ? 'dine-in' : 'takeaway',
    tableNumber: tableNum,
    customerName: ['Kabir Mehta', 'Pooja Hegde', 'Arjun Rao', 'Sneha Kapoor'][Math.floor(Math.random() * 4)],
    customerPhone: '+91 98' + Math.floor(10000000 + Math.random() * 90000000),
    deliveryAddress: 'Block C, Silicon Residency, Bengaluru',
    timestamp: new Date().toISOString(),
    status: 'received',
    prepTargetMinutes: 16,
    items: sampleItems.slice(0, 2),
    notes: 'Please serve beverages first!',
    subtotal: 940,
    discount: 0,
    gst: 47,
    packingFee: 0,
    deliveryFee: 0,
    total: 987,
    paymentStatus: 'paid_upi',
    upiRef: 'UPI-MOCK-' + Math.floor(100000 + Math.random() * 900000)
  };

  KitchenState.orders.unshift(mockOrder);
  saveOrders();
  playKitchenOrderChime();
  renderKitchenHUD();

  if (KitchenState.broadcastChannel) {
    KitchenState.broadcastChannel.postMessage({
      type: 'NEW_ORDER_PLACED',
      order: mockOrder
    });
  }

  showKitchenToast(`⚡ Mock Order #${orderId} injected into KOT pipeline!`);
}

// Print Thermal KOT Slip
function printThermalKOTSlip(orderId) {
  const order = KitchenState.orders.find(o => o.orderId === orderId);
  if (!order) return;

  const isDineIn = order.orderType === 'dine-in';
  const timeStr = new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const printWindow = window.open('', '_blank', 'width=350,height=600');
  if (!printWindow) {
    alert('Please allow popups to print KOT slip');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>KOT #${order.orderId}</title>
      <style>
        body {
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
          line-height: 1.25;
          margin: 0;
          padding: 8px;
          color: #000;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 6px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        .big-header { font-size: 18px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; }
        td { vertical-align: top; padding: 2px 0; }
      </style>
    </head>
    <body>
      <div class="text-center">
        <div class="big-header">*** KITCHEN ORDER TICKET ***</div>
        <div class="font-bold">${RESTAURANT_CONFIG.name}</div>
        <div>Time: ${timeStr} | Date: ${new Date().toLocaleDateString()}</div>
      </div>
      <div class="double-divider"></div>
      
      <div style="font-size: 16px; font-weight: bold;">
        ${isDineIn ? `TABLE #${order.tableNumber}` : 'TAKEAWAY / DELIVERY'}
      </div>
      <div>KOT Order ID: #${order.orderId}</div>
      <div>Guest: ${order.customerName} (${order.customerPhone})</div>
      
      <div class="divider"></div>
      <table>
        <thead>
          <tr class="font-bold">
            <td style="width: 25px;">QTY</td>
            <td>ITEM DESCRIPTION</td>
            <td class="text-right" style="width: 50px;">PRICE</td>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td class="font-bold">${item.qty}x</td>
              <td>
                <span class="font-bold">${item.name}</span>
                ${item.customizations ? `<div style="font-size: 11px;">└ ${item.customizations.join(', ')}</div>` : ''}
                ${item.note ? `<div style="font-size: 11px; font-style: italic;">* NOTE: ${item.note}</div>` : ''}
              </td>
              <td class="text-right">₹${(item.price * item.qty).toFixed(0)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      ${order.notes ? `
        <div class="divider"></div>
        <div class="font-bold">CHEF NOTES:</div>
        <div>${order.notes}</div>
      ` : ''}

      <div class="divider"></div>
      <div class="text-right font-bold">Total Amount: ₹${order.total.toFixed(2)}</div>
      <div class="text-right" style="font-size: 11px;">Payment: ${order.paymentStatus.toUpperCase()}</div>
      
      <div class="double-divider"></div>
      <div class="text-center" style="font-size: 11px;">--- END OF TICKET ---</div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// Toast in Kitchen
function showKitchenToast(msg) {
  const container = document.getElementById('kitchenToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-slate-900 border border-amber-500/60 text-amber-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold backdrop-blur-md transform transition-all duration-300 translate-y-3 opacity-0';
  toast.innerHTML = `<span>🔔</span> <span>${msg}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-3');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Kitchen Event Listeners
function setupKitchenEventListeners() {
  const searchInput = document.getElementById('kitchenSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      KitchenState.searchQuery = e.target.value;
      renderOrderTickets();
    });
  }

  const muteBtn = document.getElementById('toggleAudioBtn');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      KitchenState.audioMuted = !KitchenState.audioMuted;
      muteBtn.textContent = KitchenState.audioMuted ? '🔇 Audio Muted' : '🔊 Chime Active';
      muteBtn.className = KitchenState.audioMuted 
        ? 'px-3 py-1.5 rounded-xl bg-red-950 border border-red-500/40 text-red-300 text-xs font-bold'
        : 'px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold';
    });
  }
}
