/**
 * diner-flow - Table QR Studio & Tent Card Generator
 */

const QRStudioState = {
  cafeName: RESTAURANT_CONFIG.name,
  tagline: "Scan to View Digital Menu & Order Directly",
  tableCount: 12,
  wifiName: "AmberRoast_Guest",
  wifiPass: "coffeepizza",
  baseUrl: window.location.href.replace('qr-generator.html', '').replace('index.html', '').replace(/\/$/, '')
};

document.addEventListener('DOMContentLoaded', () => {
  initQRStudioForm();
  renderQRCards();
});

function initQRStudioForm() {
  const cafeInput = document.getElementById('qrStudioCafeName');
  const taglineInput = document.getElementById('qrStudioTagline');
  const tablesInput = document.getElementById('qrStudioTableCount');
  const wifiInput = document.getElementById('qrStudioWifiName');
  const passInput = document.getElementById('qrStudioWifiPass');

  if (cafeInput) cafeInput.value = QRStudioState.cafeName;
  if (taglineInput) taglineInput.value = QRStudioState.tagline;
  if (tablesInput) tablesInput.value = QRStudioState.tableCount;
  if (wifiInput) wifiInput.value = QRStudioState.wifiName;
  if (passInput) passInput.value = QRStudioState.wifiPass;

  [cafeInput, taglineInput, tablesInput, wifiInput, passInput].forEach(el => {
    if (el) {
      el.addEventListener('input', updateQRStudioStateFromForm);
    }
  });
}

function updateQRStudioStateFromForm() {
  const cafeInput = document.getElementById('qrStudioCafeName');
  const taglineInput = document.getElementById('qrStudioTagline');
  const tablesInput = document.getElementById('qrStudioTableCount');
  const wifiInput = document.getElementById('qrStudioWifiName');
  const passInput = document.getElementById('qrStudioWifiPass');

  if (cafeInput) QRStudioState.cafeName = cafeInput.value;
  if (taglineInput) QRStudioState.tagline = taglineInput.value;
  if (tablesInput) QRStudioState.tableCount = parseInt(tablesInput.value) || 12;
  if (wifiInput) QRStudioState.wifiName = wifiInput.value;
  if (passInput) QRStudioState.wifiPass = passInput.value;

  renderQRCards();
}

function renderQRCards() {
  const container = document.getElementById('qrCardsGrid');
  if (!container) return;

  let html = '';
  for (let i = 1; i <= QRStudioState.tableCount; i++) {
    const tableNum = String(i).padStart(2, '0');
    const targetUrl = `${QRStudioState.baseUrl}/index.html?table=${tableNum}`;
    const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(targetUrl)}`;

    html += `
      <div class="qr-tent-card bg-slate-900/95 border-2 border-amber-500/40 rounded-3xl p-6 flex flex-col items-center justify-between text-center shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all duration-300">
        
        <!-- Top Glow & Corner Accent -->
        <div class="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

        <!-- Header -->
        <div class="mb-4">
          <span class="text-[10px] uppercase tracking-widest font-extrabold text-amber-400/90 block mb-1">
            CONTACTLESS QR DINING
          </span>
          <h3 class="font-serif font-bold text-xl text-white tracking-wide">
            ${QRStudioState.cafeName}
          </h3>
          <p class="text-xs text-slate-400 mt-0.5">
            ${QRStudioState.tagline}
          </p>
        </div>

        <!-- Table Badge -->
        <div class="my-2 py-1.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-lg tracking-wider shadow-lg shadow-amber-500/20">
          TABLE ${tableNum}
        </div>

        <!-- QR Code Frame -->
        <div class="my-4 p-3.5 bg-white rounded-2xl shadow-xl border-4 border-amber-500/20 w-48 h-48 flex items-center justify-center">
          <img 
            src="${qrImageSrc}" 
            alt="Table ${tableNum} QR Code" 
            class="w-full h-full object-contain"
          />
        </div>

        <!-- Instructions -->
        <div class="text-xs text-slate-300 mb-4 space-y-1">
          <div class="font-bold flex items-center justify-center gap-1 text-amber-400">
            <span>📱 Point Camera ➔ Order ➔ Settle UPI</span>
          </div>
          ${QRStudioState.wifiName ? `
            <div class="text-[11px] text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/80 mt-2">
              📶 <span class="text-slate-300 font-semibold">Free Guest Wi-Fi:</span> ${QRStudioState.wifiName} • Pass: <span class="font-mono text-amber-400">${QRStudioState.wifiPass}</span>
            </div>
          ` : ''}
        </div>

        <!-- Bottom Action / URL Pill -->
        <div class="w-full pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 no-print">
          <span class="truncate max-w-[160px]">${targetUrl}</span>
          <a 
            href="${targetUrl}" 
            target="_blank"
            class="text-amber-400 hover:text-amber-300 font-semibold underline">
            Test Link ➔
          </a>
        </div>

      </div>
    `;
  }

  container.innerHTML = html;
}

function printAllQRCards() {
  window.print();
}
