// Estate Matrix - Core Application Engine

// Global App State
const AppState = {
  selectedLocation: "all",
  selectedType: "all",
  maxPrice: 450000000, // ₹45 Cr max
  searchQuery: "",
  currentCurrency: "INR",
  shortlist: JSON.parse(localStorage.getItem("estate_matrix_shortlist") || "[]"),
  activeProperty: null,
  activeHotspot: null,
  activeFloorPlanTab: "floorplan"
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initLucideIcons();
  initApp();
  renderPropertyGrid();
  renderMarketInsights();
  initMortgageCalculator();
  setupEventListeners();
  updateShortlistBadge();
});

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Initialize App
function initApp() {
  const currencySelector = document.getElementById("currencySelector");
  if (currencySelector) {
    currencySelector.value = AppState.currentCurrency;
  }
  
  // Set default min date for VIP scheduler to tomorrow
  const dateInput = document.getElementById("vipDateInput");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split("T")[0];
    dateInput.value = tomorrow.toISOString().split("T")[0];
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Location Filter Tabs
  document.querySelectorAll(".location-filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".location-filter-btn").forEach(b => {
        b.classList.remove("active", "border-gold-primary", "text-amber-400", "bg-amber-950/40");
        b.classList.add("text-slate-400", "border-slate-800");
      });
      btn.classList.add("active", "border-gold-primary", "text-amber-400", "bg-amber-950/40");
      btn.classList.remove("text-slate-400", "border-slate-800");
      
      AppState.selectedLocation = btn.dataset.location;
      renderPropertyGrid();
      renderMarketInsights();
    });
  });

  // Property Type Filter
  const typeFilter = document.getElementById("propertyTypeFilter");
  if (typeFilter) {
    typeFilter.addEventListener("change", (e) => {
      AppState.selectedType = e.target.value;
      renderPropertyGrid();
    });
  }

  // Search Input
  const searchInput = document.getElementById("propertySearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value.toLowerCase().trim();
      renderPropertyGrid();
    });
  }

  // Price Range Slider
  const priceSlider = document.getElementById("priceRangeSlider");
  const priceDisplay = document.getElementById("priceRangeDisplay");
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      AppState.maxPrice = Number(e.target.value);
      priceDisplay.textContent = formatMoney(AppState.maxPrice);
      renderPropertyGrid();
    });
  }

  // Currency Selector
  const currencySelector = document.getElementById("currencySelector");
  if (currencySelector) {
    currencySelector.addEventListener("change", (e) => {
      AppState.currentCurrency = e.target.value;
      renderPropertyGrid();
      updateMortgageCurrency();
      updateShortlistDrawer();
      if (AppState.activeProperty) {
        updateModalCurrency();
      }
    });
  }

  // Hero Quick Search Form
  const heroSearchBtn = document.getElementById("heroSearchBtn");
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener("click", () => {
      const heroLoc = document.getElementById("heroLocationSelect").value;
      const heroType = document.getElementById("heroTypeSelect").value;
      
      AppState.selectedLocation = heroLoc;
      AppState.selectedType = heroType;
      
      // Sync UI filters
      document.querySelectorAll(".location-filter-btn").forEach(b => {
        if (b.dataset.location === heroLoc) {
          b.click();
        }
      });
      if (typeFilter) typeFilter.value = heroType;
      
      // Scroll smoothly to properties
      document.getElementById("properties-showcase").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Floating WhatsApp Drawer Toggle
  const waToggleBtn = document.getElementById("waFloatingToggle");
  const waChatBox = document.getElementById("waChatBox");
  const waCloseBtn = document.getElementById("waCloseBox");
  if (waToggleBtn && waChatBox) {
    waToggleBtn.addEventListener("click", () => {
      waChatBox.classList.toggle("hidden");
    });
    if (waCloseBtn) {
      waCloseBtn.addEventListener("click", () => {
        waChatBox.classList.add("hidden");
      });
    }
  }

  // Shortlist Drawer Toggle
  const shortlistBtn = document.getElementById("shortlistNavBtn");
  const shortlistDrawer = document.getElementById("shortlistDrawer");
  const closeShortlist = document.getElementById("closeShortlistBtn");
  if (shortlistBtn && shortlistDrawer) {
    shortlistBtn.addEventListener("click", () => {
      openShortlistDrawer();
    });
    if (closeShortlist) {
      closeShortlist.addEventListener("click", () => {
        closeShortlistDrawer();
      });
    }
  }

  // VIP Viewing Form Submit
  const vipForm = document.getElementById("vipViewingForm");
  if (vipForm) {
    vipForm.addEventListener("submit", handleVipBookingSubmit);
  }

  // Brochure Download Form Submit
  const brochureForm = document.getElementById("brochureLeadForm");
  if (brochureForm) {
    brochureForm.addEventListener("submit", handleBrochureSubmit);
  }
}

// Format Money Utility
function formatMoney(amountINR) {
  const config = CURRENCY_CONFIG[AppState.currentCurrency] || CURRENCY_CONFIG.INR;
  return config.format(amountINR);
}

// Render Property Grid
function renderPropertyGrid() {
  const gridContainer = document.getElementById("propertyGridContainer");
  const resultsCount = document.getElementById("propertyResultsCount");
  if (!gridContainer) return;

  const filtered = LUXURY_PROPERTIES.filter(prop => {
    // Location Filter
    if (AppState.selectedLocation !== "all" && prop.locationKey !== AppState.selectedLocation) {
      return false;
    }
    // Type Filter
    if (AppState.selectedType !== "all" && prop.propertyType !== AppState.selectedType) {
      return false;
    }
    // Price Filter
    if (prop.priceINR > AppState.maxPrice) {
      return false;
    }
    // Search Query
    if (AppState.searchQuery) {
      const matchText = `${prop.title} ${prop.microLocation} ${prop.propertyTypeLabel} ${prop.tags.join(" ")}`.toLowerCase();
      if (!matchText.includes(AppState.searchQuery)) {
        return false;
      }
    }
    return true;
  });

  if (resultsCount) {
    resultsCount.textContent = `Displaying ${filtered.length} curated estate${filtered.length === 1 ? "" : "s"}`;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-2xl p-8 border border-amber-500/20">
        <i data-lucide="compass" class="w-12 h-12 mx-auto text-amber-400 mb-4 opacity-70"></i>
        <h3 class="text-2xl font-serif-luxury text-white mb-2">No Properties Match Your Refined Criteria</h3>
        <p class="text-slate-400 max-w-md mx-auto mb-6 text-sm">Adjust your price parameters, location, or property style to explore available ultra-luxury residences.</p>
        <button onclick="resetFilters()" class="btn-gold px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider">
          Reset Filter Parameters
        </button>
      </div>
    `;
    initLucideIcons();
    return;
  }

  gridContainer.innerHTML = filtered.map(prop => {
    const isSaved = AppState.shortlist.includes(prop.id);
    const displayPrice = formatMoney(prop.priceINR);
    
    return `
      <div class="property-card glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col group" data-property-id="${prop.id}">
        <!-- Image Container -->
        <div class="relative h-72 w-full overflow-hidden bg-slate-950">
          <img 
            src="${prop.heroImage}" 
            alt="${prop.title}" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>
          
          <!-- Top Badges -->
          <div class="absolute top-4 left-4 flex flex-wrap gap-2">
            ${prop.isFeatured ? `
              <span class="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-amber-500/90 text-slate-950 rounded-full flex items-center gap-1 shadow-lg">
                <i data-lucide="crown" class="w-3 h-3"></i> Featured Listing
              </span>
            ` : ""}
            ${prop.goldenVisaEligible ? `
              <span class="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1 backdrop-blur-md">
                <i data-lucide="award" class="w-3 h-3"></i> Golden Visa
              </span>
            ` : ""}
            <span class="px-3 py-1 text-[11px] font-medium tracking-wide bg-slate-900/80 text-slate-300 border border-slate-700/60 rounded-full backdrop-blur-md">
              ${prop.status}
            </span>
          </div>

          <!-- Favorite & Share Buttons -->
          <div class="absolute top-4 right-4 flex gap-2">
            <button 
              onclick="toggleShortlist('${prop.id}')" 
              class="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center transition-colors ${isSaved ? 'text-rose-500 border-rose-500/50 bg-rose-950/40' : 'text-slate-300 hover:text-rose-400'}"
              title="${isSaved ? 'Remove from Shortlist' : 'Add to Shortlist'}"
            >
              <i data-lucide="heart" class="w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}"></i>
            </button>
          </div>

          <!-- Bottom Micro-Location Tag -->
          <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
            <span class="flex items-center gap-1.5 font-medium bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400"></i> ${prop.microLocation}
            </span>
            <span class="bg-amber-950/70 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-semibold">
              ${prop.rentalYield}
            </span>
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-semibold uppercase tracking-widest text-amber-400">${prop.propertyTypeLabel}</span>
              <span class="text-xs text-slate-400">${prop.reraNumber.split(" ")[0]}</span>
            </div>

            <h3 class="text-xl font-serif-luxury font-bold text-white group-hover:text-amber-300 transition-colors mb-2 line-clamp-1">
              ${prop.title}
            </h3>

            <p class="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
              ${prop.description}
            </p>

            <!-- Specification Badges -->
            <div class="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 mb-5 text-center">
              <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
                <span class="block text-[11px] text-slate-400 uppercase tracking-wider">Carpet Area</span>
                <span class="text-sm font-semibold text-slate-200 flex items-center justify-center gap-1">
                  <i data-lucide="maximize" class="w-3 h-3 text-amber-400"></i> ${prop.carpetAreaSqFt.toLocaleString()} sq.ft
                </span>
              </div>
              <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
                <span class="block text-[11px] text-slate-400 uppercase tracking-wider">Bedrooms</span>
                <span class="text-sm font-semibold text-slate-200 flex items-center justify-center gap-1">
                  <i data-lucide="bed" class="w-3.5 h-3.5 text-amber-400"></i> ${prop.bedrooms} Bed Suites
                </span>
              </div>
              <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
                <span class="block text-[11px] text-slate-400 uppercase tracking-wider">Facing</span>
                <span class="text-xs font-semibold text-slate-200 truncate flex items-center justify-center gap-1">
                  <i data-lucide="compass" class="w-3 h-3 text-amber-400"></i> ${prop.facing.split("(")[0]}
                </span>
              </div>
            </div>
          </div>

          <!-- Pricing & Action Buttons -->
          <div>
            <div class="flex items-baseline justify-between mb-4">
              <div>
                <span class="text-[11px] text-slate-400 uppercase tracking-wider block">Investment Value</span>
                <span class="text-2xl font-serif-luxury font-bold text-amber-300">${displayPrice}</span>
              </div>
              <div class="text-right">
                <span class="text-[11px] text-slate-400 block">Capital Gain</span>
                <span class="text-xs font-semibold text-emerald-400">${prop.appreciationRate}</span>
              </div>
            </div>

            <!-- Primary CTAs -->
            <div class="grid grid-cols-2 gap-2 mb-2">
              <button 
                onclick="openFloorPlanModal('${prop.id}')" 
                class="btn-outline-gold px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <i data-lucide="layers" class="w-3.5 h-3.5"></i> Floor Plan & 3D
              </button>
              <button 
                onclick="openVipBookingModal('${prop.id}')" 
                class="btn-gold px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i> VIP Viewing
              </button>
            </div>

            <!-- Secondary Quick Actions (EMI & WhatsApp) -->
            <div class="flex items-center justify-between pt-2 border-t border-slate-800/50 text-[11px]">
              <button 
                onclick="selectPropertyForMortgage('${prop.id}')" 
                class="text-amber-400/80 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <i data-lucide="calculator" class="w-3 h-3"></i> Calculate EMI
              </button>
              <button 
                onclick="openBrochureModal('${prop.id}')" 
                class="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <i data-lucide="file-down" class="w-3 h-3"></i> Brochure PDF
              </button>
              <a 
                href="${getWhatsAppPropertyLink(prop)}" 
                target="_blank" 
                class="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors font-medium"
              >
                <i data-lucide="message-circle" class="w-3 h-3"></i> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  initLucideIcons();
}

function resetFilters() {
  AppState.selectedLocation = "all";
  AppState.selectedType = "all";
  AppState.maxPrice = 450000000;
  AppState.searchQuery = "";

  document.querySelectorAll(".location-filter-btn").forEach(b => {
    if (b.dataset.location === "all") {
      b.click();
    }
  });

  const typeFilter = document.getElementById("propertyTypeFilter");
  if (typeFilter) typeFilter.value = "all";

  const searchInput = document.getElementById("propertySearchInput");
  if (searchInput) searchInput.value = "";

  const priceSlider = document.getElementById("priceRangeSlider");
  const priceDisplay = document.getElementById("priceRangeDisplay");
  if (priceSlider) priceSlider.value = 450000000;
  if (priceDisplay) priceDisplay.textContent = formatMoney(450000000);

  renderPropertyGrid();
}

// Render Market Insights
function renderMarketInsights() {
  const container = document.getElementById("marketInsightsContainer");
  if (!container) return;

  const key = AppState.selectedLocation === "all" ? "mumbai" : AppState.selectedLocation;
  const data = MARKET_INSIGHTS[key] || MARKET_INSIGHTS.mumbai;

  container.innerHTML = `
    <div class="glass-panel-gold rounded-2xl p-8 border border-amber-500/30 relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
        <i data-lucide="trending-up" class="w-72 h-72 text-amber-300"></i>
      </div>

      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
            <i data-lucide="bar-chart-3" class="w-4 h-4"></i> Luxury Market Intelligence 2025–2026
          </div>
          <h3 class="text-3xl font-serif-luxury font-bold text-white">
            ${data.city} Prime Real Estate Index
          </h3>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="trending-up" class="w-4 h-4"></i> ${data.capitalAppreciation}
          </span>
          <span class="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="pie-chart" class="w-4 h-4"></i> ${data.rentalYield}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
          <span class="text-xs text-slate-400 uppercase tracking-wider block mb-1">Prime Capital Rates</span>
          <span class="text-xl font-bold text-slate-100">${data.avgPriceSqFt}</span>
          <span class="text-[11px] text-slate-500 block mt-1">Super-luxury benchmark rates</span>
        </div>
        <div class="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
          <span class="text-xs text-slate-400 uppercase tracking-wider block mb-1">Key High-Yield Micro-Markets</span>
          <span class="text-sm font-semibold text-amber-300">${data.hotspots.join(" • ")}</span>
          <span class="text-[11px] text-slate-500 block mt-1">Top liquidity & ultra-HNI demand enclaves</span>
        </div>
        <div class="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
          <span class="text-xs text-slate-400 uppercase tracking-wider block mb-1">Statutory Taxes & Transfer Duties</span>
          <span class="text-sm font-semibold text-slate-200">${data.taxRate}</span>
          <span class="text-[11px] text-slate-500 block mt-1">Transparent statutory acquisition schedule</span>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <i data-lucide="shield-check" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5"></i>
        <p class="leading-relaxed"><strong class="text-amber-300 font-semibold">Private Advisory Note:</strong> ${data.highlights}</p>
      </div>
    </div>
  `;

  initLucideIcons();
}

// ----------------------------------------------------
// Floor Plan & 3D Virtual Tour Modal
// ----------------------------------------------------
function openFloorPlanModal(propId) {
  const prop = LUXURY_PROPERTIES.find(p => p.id === propId);
  if (!prop) return;
  AppState.activeProperty = prop;
  AppState.activeFloorPlanTab = "floorplan";
  AppState.activeHotspot = prop.floorPlan.hotspots[0] || null;

  renderFloorPlanModalContent();

  const modal = document.getElementById("floorPlanModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeFloorPlanModal() {
  const modal = document.getElementById("floorPlanModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function setFloorPlanTab(tabName) {
  AppState.activeFloorPlanTab = tabName;
  renderFloorPlanModalContent();
}

function renderFloorPlanModalContent() {
  const prop = AppState.activeProperty;
  if (!prop) return;

  const titleEl = document.getElementById("fpModalTitle");
  const locEl = document.getElementById("fpModalLocation");
  const priceEl = document.getElementById("fpModalPrice");
  const tabsContainer = document.getElementById("fpTabsNav");
  const bodyContainer = document.getElementById("fpModalBody");

  if (titleEl) titleEl.textContent = prop.title;
  if (locEl) locEl.textContent = prop.microLocation;
  if (priceEl) priceEl.textContent = formatMoney(prop.priceINR);

  // Tabs Navigation
  if (tabsContainer) {
    const tabs = [
      { id: "floorplan", label: "Interactive Floor Plan", icon: "layers" },
      { id: "specs", label: "Architectural Specs", icon: "list-checks" },
      { id: "amenities", label: "Private Amenities", icon: "gem" },
      { id: "tour", label: "360° Virtual Walkthrough", icon: "view" }
    ];

    tabsContainer.innerHTML = tabs.map(t => `
      <button 
        onclick="setFloorPlanTab('${t.id}')" 
        class="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${AppState.activeFloorPlanTab === t.id ? 'btn-gold text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'}"
      >
        <i data-lucide="${t.icon}" class="w-3.5 h-3.5"></i> ${t.label}
      </button>
    `).join("");
  }

  // Tab Body Content
  if (!bodyContainer) return;

  if (AppState.activeFloorPlanTab === "floorplan") {
    const activeHs = AppState.activeHotspot || prop.floorPlan.hotspots[0];

    bodyContainer.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Interactive Layout Area with Hotspots -->
        <div class="lg:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 relative">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <i data-lucide="compass" class="w-4 h-4"></i> ${prop.floorPlan.levels}
            </span>
            <span class="text-xs text-slate-400">Click any pulsing marker to inspect chamber</span>
          </div>

          <!-- Floor Plan Graphic Box -->
          <div class="relative w-full h-[400px] md:h-[480px] bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            <!-- Architectural Floor Plan SVG Illustration -->
            <svg class="w-full h-full text-amber-500/20 max-w-full max-h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Outer Perimeter Walls -->
              <rect x="50" y="50" width="700" height="500" rx="12" stroke="#D4AF37" stroke-width="4" stroke-opacity="0.6" fill="#0C101A"/>
              <!-- Interior Partitions -->
              <path d="M50 250 H 500 V 550" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4 4" stroke-opacity="0.4"/>
              <path d="M500 50 V 380 H 750" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4 4" stroke-opacity="0.4"/>
              <path d="M250 50 V 250" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.3"/>
              <circle cx="650" cy="180" r="70" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.5" fill="#0369A1" fill-opacity="0.1"/>
              
              <!-- Room Labels in Plan -->
              <text x="120" y="150" fill="#CBD5E1" font-size="14" font-family="Plus Jakarta Sans" font-weight="600">GRAND SALON & LIVING</text>
              <text x="120" y="170" fill="#94A3B8" font-size="11">34' x 22' • Double Height</text>

              <text x="310" y="150" fill="#CBD5E1" font-size="14" font-family="Plus Jakarta Sans" font-weight="600">MASTER ROYAL SUITE</text>
              <text x="310" y="170" fill="#94A3B8" font-size="11">28' x 20' • Ensuite & Jacuzzi</text>

              <text x="590" y="180" fill="#38BDF8" font-size="13" font-family="Plus Jakarta Sans" font-weight="700" text-anchor="middle">INFINITY POOL / TERRACE</text>

              <text x="150" y="420" fill="#CBD5E1" font-size="14" font-family="Plus Jakarta Sans" font-weight="600">GOURMET CHEF KITCHEN</text>
              <text x="150" y="440" fill="#94A3B8" font-size="11">Custom Boffi / Gaggenau</text>

              <text x="550" y="470" fill="#CBD5E1" font-size="14" font-family="Plus Jakarta Sans" font-weight="600">WINE CELLAR & CIGAR LOUNGE</text>
            </svg>

            <!-- Interactive Hotspot Markers -->
            ${prop.floorPlan.hotspots.map((hs, idx) => `
              <div 
                class="hotspot-pin" 
                style="left: ${hs.x}%; top: ${hs.y}%;"
                onclick="selectHotspot('${hs.id}')"
                title="${hs.title}"
              >
                <div class="hotspot-ping"></div>
                ${idx + 1}
              </div>
            `).join("")}
          </div>

          <!-- Room Dimension Badges -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            ${prop.floorPlan.rooms.map(r => `
              <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                <i data-lucide="${r.icon}" class="w-4 h-4 text-amber-400 shrink-0"></i>
                <div class="overflow-hidden">
                  <span class="text-xs font-semibold text-slate-200 block truncate">${r.name}</span>
                  <span class="text-[10px] text-slate-400">${r.dim}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Hotspot Detail Inspector Card -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex-1 flex flex-col justify-between">
            <div>
              <span class="text-[11px] font-semibold text-amber-400 uppercase tracking-widest block mb-1">
                Chamber Inspector
              </span>
              <h4 class="text-lg font-serif-luxury font-bold text-white mb-2">
                ${activeHs ? activeHs.title : "Select a Room Marker"}
              </h4>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                ${activeHs ? activeHs.description : "Click on any numbered hotspot on the architectural layout to inspect HD photography, finishes, and dimensional highlights."}
              </p>

              ${activeHs && activeHs.image ? `
                <div class="rounded-xl overflow-hidden border border-slate-700/80 mb-4 h-48 bg-slate-950">
                  <img src="${activeHs.image}" alt="${activeHs.title}" class="w-full h-full object-cover"/>
                </div>
              ` : ""}
            </div>

            <div class="pt-4 border-t border-slate-800/80 space-y-2">
              <button 
                onclick="openVipBookingModal('${prop.id}')" 
                class="w-full btn-gold py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <i data-lucide="calendar" class="w-4 h-4"></i> Book VIP Site Inspection
              </button>
              <button 
                onclick="openBrochureModal('${prop.id}')" 
                class="w-full btn-outline-gold py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <i data-lucide="download" class="w-4 h-4"></i> Download Full Blueprint PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (AppState.activeFloorPlanTab === "specs") {
    bodyContainer.innerHTML = `
      <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <h4 class="text-lg font-serif-luxury font-bold text-white mb-4 flex items-center gap-2">
          <i data-lucide="shield-check" class="w-5 h-5 text-amber-400"></i> Structural & Engineering Specifications
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${Object.entries(prop.specifications).map(([key, val]) => `
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span class="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                ${key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span class="text-sm font-medium text-slate-200">${val}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  } else if (AppState.activeFloorPlanTab === "amenities") {
    bodyContainer.innerHTML = `
      <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <h4 class="text-lg font-serif-luxury font-bold text-white mb-6 flex items-center gap-2">
          <i data-lucide="gem" class="w-5 h-5 text-amber-400"></i> Curated Private Amenities & Club Privileges
        </h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${prop.amenities.map(a => `
            <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center group hover:border-amber-500/40 transition-colors">
              <div class="w-12 h-12 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform">
                <i data-lucide="${a.icon}" class="w-6 h-6"></i>
              </div>
              <span class="text-xs font-semibold text-slate-200">${a.name}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  } else if (AppState.activeFloorPlanTab === "tour") {
    bodyContainer.innerHTML = `
      <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
        <div class="relative h-[420px] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 group">
          <img src="${prop.gallery[1] || prop.heroImage}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"/>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div class="relative z-10 max-w-md mx-auto">
            <div class="w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-2xl cursor-pointer hover:scale-110 transition-transform" onclick="alert('Launching Ultra-HD 360 Interactive Matterport Stream...')">
              <i data-lucide="play" class="w-8 h-8 ml-1 fill-slate-950"></i>
            </div>
            <h4 class="text-2xl font-serif-luxury font-bold text-white mb-2">Immersive 4K Spatial Tour</h4>
            <p class="text-xs text-slate-300 leading-relaxed mb-6">
              Experience the dual-height architecture, natural light exposure at various hours of the day, and sea views in realistic 3D photogrammetry.
            </p>
            <button onclick="openVipBookingModal('${prop.id}')" class="btn-gold px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Request Private Guided Walkthrough
            </button>
          </div>
        </div>
      </div>
    `;
  }

  initLucideIcons();
}

function selectHotspot(hsId) {
  const prop = AppState.activeProperty;
  if (!prop) return;
  const found = prop.floorPlan.hotspots.find(h => h.id === hsId);
  if (found) {
    AppState.activeHotspot = found;
    renderFloorPlanModalContent();
  }
}

// ----------------------------------------------------
// Mortgage & Financial Calculator Engine
// ----------------------------------------------------
function initMortgageCalculator() {
  const propSelect = document.getElementById("calcPropertySelect");
  if (propSelect) {
    propSelect.innerHTML = LUXURY_PROPERTIES.map(p => `
      <option value="${p.id}" ${p.id === "prop-mum-01" ? "selected" : ""}>
        ${p.title} (${p.locationName}) - ${formatMoney(p.priceINR)}
      </option>
    `).join("");

    propSelect.addEventListener("change", (e) => {
      selectPropertyForMortgage(e.target.value);
    });
  }

  // Bind slider controls
  const dpSlider = document.getElementById("calcDpSlider");
  const tenureSlider = document.getElementById("calcTenureSlider");
  const rateSlider = document.getElementById("calcRateSlider");

  if (dpSlider) {
    dpSlider.addEventListener("input", (e) => {
      document.getElementById("calcDpValue").textContent = `${e.target.value}%`;
      updateMortgageCalculations();
    });
  }

  if (tenureSlider) {
    tenureSlider.addEventListener("input", (e) => {
      document.getElementById("calcTenureValue").textContent = `${e.target.value} Years`;
      updateMortgageCalculations();
    });
  }

  if (rateSlider) {
    rateSlider.addEventListener("input", (e) => {
      document.getElementById("calcRateValue").textContent = `${Number(e.target.value).toFixed(1)}%`;
      updateMortgageCalculations();
    });
  }

  updateMortgageCalculations();
}

function selectPropertyForMortgage(propId) {
  const prop = LUXURY_PROPERTIES.find(p => p.id === propId);
  if (!prop) return;

  const propSelect = document.getElementById("calcPropertySelect");
  if (propSelect) propSelect.value = propId;

  // Adapt interest rates based on geography
  const rateSlider = document.getElementById("calcRateSlider");
  if (rateSlider) {
    if (prop.locationKey === "dubai") {
      rateSlider.value = 4.8;
      document.getElementById("calcRateValue").textContent = "4.8%";
    } else {
      rateSlider.value = 8.5;
      document.getElementById("calcRateValue").textContent = "8.5%";
    }
  }

  window.mortgageCalculator.setValues({
    price: prop.priceINR,
    locationKey: prop.locationKey,
    currency: AppState.currentCurrency
  });

  updateMortgageCalculations();

  // Scroll to calculator
  const calcSection = document.getElementById("mortgage-calculator");
  if (calcSection) {
    calcSection.scrollIntoView({ behavior: "smooth" });
  }
}

function updateMortgageCalculations() {
  const propSelect = document.getElementById("calcPropertySelect");
  const propId = propSelect ? propSelect.value : "prop-mum-01";
  const prop = LUXURY_PROPERTIES.find(p => p.id === propId) || LUXURY_PROPERTIES[0];

  const dp = Number(document.getElementById("calcDpSlider")?.value || 20);
  const tenure = Number(document.getElementById("calcTenureSlider")?.value || 20);
  const rate = Number(document.getElementById("calcRateSlider")?.value || 8.5);

  window.mortgageCalculator.setValues({
    price: prop.priceINR,
    downPaymentPercent: dp,
    tenureYears: tenure,
    interestRate: rate,
    currency: AppState.currentCurrency,
    locationKey: prop.locationKey
  });

  const res = window.mortgageCalculator.calculate();

  // Update Result Elements
  const emiEl = document.getElementById("resMonthlyEmi");
  const principalEl = document.getElementById("resPrincipal");
  const interestEl = document.getElementById("resTotalInterest");
  const totalRepayEl = document.getElementById("resTotalRepay");
  const dpAmountEl = document.getElementById("resDpAmount");
  const stampEl = document.getElementById("resStampDuty");
  const stampPercentEl = document.getElementById("resStampPercent");

  if (emiEl) emiEl.textContent = formatMoney(res.monthlyEMI);
  if (principalEl) principalEl.textContent = formatMoney(res.principal);
  if (interestEl) interestEl.textContent = formatMoney(res.totalInterest);
  if (totalRepayEl) totalRepayEl.textContent = formatMoney(res.totalRepayment);
  if (dpAmountEl) dpAmountEl.textContent = formatMoney(res.downPaymentAmount);
  if (stampEl) stampEl.textContent = formatMoney(res.stampDutyEstimate);
  if (stampPercentEl) stampPercentEl.textContent = `(${res.stampRatePercent}% Statutory)`;

  // Update Visual Donut / Progress Bars
  const pBar = document.getElementById("barPrincipal");
  const iBar = document.getElementById("barInterest");
  if (pBar) pBar.style.width = `${res.principalPercent}%`;
  if (iBar) iBar.style.width = `${res.interestPercent}%`;

  const pPctText = document.getElementById("pctPrincipal");
  const iPctText = document.getElementById("pctInterest");
  if (pPctText) pPctText.textContent = `${res.principalPercent}% Principal`;
  if (iPctText) iPctText.textContent = `${res.interestPercent}% Interest`;

  // WhatsApp Banker Link
  const waBtn = document.getElementById("calcWaBankerBtn");
  if (waBtn) {
    const text = encodeURIComponent(
      `Hello Estate Matrix Private Banking Desk,\n\nI am analyzing financing for "${prop.title}" (${formatMoney(prop.priceINR)}).\n\nCalculated Parameters:\n• Down Payment: ${dp}% (${formatMoney(res.downPaymentAmount)})\n• Loan Amount: ${formatMoney(res.principal)}\n• Tenure: ${tenure} Years\n• Expected Rate: ${rate}%\n• Estimated Monthly EMI: ${formatMoney(res.monthlyEMI)} / mo\n\nPlease connect me with an Ultra-HNI Private Banker for bespoke pre-approval terms.`
    );
    waBtn.href = `https://wa.me/919820012345?text=${text}`;
  }
}

function updateMortgageCurrency() {
  const propSelect = document.getElementById("calcPropertySelect");
  if (propSelect) {
    const currentVal = propSelect.value;
    propSelect.innerHTML = LUXURY_PROPERTIES.map(p => `
      <option value="${p.id}" ${p.id === currentVal ? "selected" : ""}>
        ${p.title} (${p.locationName}) - ${formatMoney(p.priceINR)}
      </option>
    `).join("");
  }
  updateMortgageCalculations();
}

// ----------------------------------------------------
// VIP Viewing Scheduler & Calendar Integration
// ----------------------------------------------------
function openVipBookingModal(propId) {
  const prop = LUXURY_PROPERTIES.find(p => p.id === propId) || LUXURY_PROPERTIES[0];
  AppState.activeProperty = prop;

  const titleEl = document.getElementById("vipModalPropTitle");
  const locEl = document.getElementById("vipModalPropLoc");
  const priceEl = document.getElementById("vipModalPropPrice");
  const selectEl = document.getElementById("vipPropertySelect");

  if (titleEl) titleEl.textContent = prop.title;
  if (locEl) locEl.textContent = prop.microLocation;
  if (priceEl) priceEl.textContent = formatMoney(prop.priceINR);

  if (selectEl) {
    selectEl.innerHTML = LUXURY_PROPERTIES.map(p => `
      <option value="${p.id}" ${p.id === prop.id ? "selected" : ""}>
        ${p.title} (${p.microLocation})
      </option>
    `).join("");
  }

  const modal = document.getElementById("vipViewingModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeVipBookingModal() {
  const modal = document.getElementById("vipViewingModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function handleVipBookingSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("vipGuestName")?.value || "Distinguished Guest";
  const phone = document.getElementById("vipGuestPhone")?.value || "";
  const email = document.getElementById("vipGuestEmail")?.value || "";
  const propId = document.getElementById("vipPropertySelect")?.value;
  const prop = LUXURY_PROPERTIES.find(p => p.id === propId) || AppState.activeProperty;
  const date = document.getElementById("vipDateInput")?.value;
  const slot = document.getElementById("vipSlotSelect")?.value;
  const tourType = document.getElementById("vipTourTypeSelect")?.value;

  // Build WhatsApp Confirmation Message
  const waMsg = encodeURIComponent(
    `*VIP SITE VISIT CONFIRMATION REQUEST*\n\n` +
    `*Client Name:* ${name}\n` +
    `*Contact Phone:* ${phone}\n` +
    `*Email:* ${email}\n` +
    `*Selected Estate:* ${prop.title} (${prop.microLocation})\n` +
    `*Valuation:* ${formatMoney(prop.priceINR)}\n` +
    `*Requested Date:* ${date}\n` +
    `*Preferred Time Slot:* ${slot}\n` +
    `*Tour Format:* ${tourType}\n\n` +
    `Please confirm chauffeur dispatch and private access security clearance.`
  );

  // Trigger ICS Calendar File generation & download
  generateIcsFile({
    title: `VIP Site Inspection: ${prop.title}`,
    description: `Private Viewing of ${prop.title} with Estate Matrix Senior Wealth Advisor. Tour Format: ${tourType}.`,
    location: prop.microLocation,
    startDate: date
  });

  // Show Success Alert / Confetti
  triggerConfetti();

  closeVipBookingModal();

  // Open WhatsApp Link in New Tab
  window.open(`https://wa.me/919820012345?text=${waMsg}`, "_blank");
}

function generateIcsFile({ title, description, location, startDate }) {
  const formattedDate = startDate.replace(/-/g, "");
  const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Estate Matrix Luxury Real Estate//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@estatematrix.luxury
DTSTAMP:${formattedDate}T090000Z
DTSTART:${formattedDate}T100000Z
DTEND:${formattedDate}T120000Z
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `VIP-Viewing-${title.replace(/[^a-zA-Z0-9]/g, "-")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ----------------------------------------------------
// Brochure Lead Capture Modal
// ----------------------------------------------------
function openBrochureModal(propId) {
  const prop = LUXURY_PROPERTIES.find(p => p.id === propId) || LUXURY_PROPERTIES[0];
  AppState.activeProperty = prop;

  const titleEl = document.getElementById("brochureModalTitle");
  if (titleEl) titleEl.textContent = `Architectural Dossier: ${prop.title}`;

  const modal = document.getElementById("brochureModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeBrochureModal() {
  const modal = document.getElementById("brochureModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function handleBrochureSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("brochureLeadName")?.value || "Client";
  const prop = AppState.activeProperty;

  alert(`Thank you, ${name}. The complete Confidential Dossier & Floor Plans for "${prop.title}" are downloading now.`);
  
  closeBrochureModal();

  // Create simulated PDF download
  const blob = new Blob([
    `ESTATE MATRIX LUXURY DOSSIER\n\nProperty: ${prop.title}\nLocation: ${prop.microLocation}\nValuation: ${formatMoney(prop.priceINR)}\nCarpet Area: ${prop.specifications.carpetArea}\nBedrooms: ${prop.bedrooms}\nRERA/DLD: ${prop.reraNumber}\n\nKey Highlights:\n${prop.description}\n\nAmenities:\n${prop.amenities.map(a => `- ${a.name}`).join("\n")}`
  ], { type: "text/plain;charset=utf-8" });
  
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${prop.title.replace(/[^a-zA-Z0-9]/g, "_")}_Dossier.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ----------------------------------------------------
// Shortlist / Favorites Drawer
// ----------------------------------------------------
function toggleShortlist(propId) {
  const index = AppState.shortlist.indexOf(propId);
  if (index > -1) {
    AppState.shortlist.splice(index, 1);
  } else {
    AppState.shortlist.push(propId);
  }
  localStorage.setItem("estate_matrix_shortlist", JSON.stringify(AppState.shortlist));
  updateShortlistBadge();
  renderPropertyGrid();
  updateShortlistDrawer();
}

function updateShortlistBadge() {
  const badge = document.getElementById("shortlistCountBadge");
  if (badge) {
    badge.textContent = AppState.shortlist.length;
    if (AppState.shortlist.length > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}

function openShortlistDrawer() {
  updateShortlistDrawer();
  const drawer = document.getElementById("shortlistDrawer");
  if (drawer) {
    drawer.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  }
}

function closeShortlistDrawer() {
  const drawer = document.getElementById("shortlistDrawer");
  if (drawer) {
    drawer.classList.add("translate-x-full");
    document.body.style.overflow = "auto";
  }
}

function updateShortlistDrawer() {
  const container = document.getElementById("shortlistItemsContainer");
  const countEl = document.getElementById("shortlistDrawerCount");
  if (!container) return;

  const savedProps = LUXURY_PROPERTIES.filter(p => AppState.shortlist.includes(p.id));
  if (countEl) countEl.textContent = `${savedProps.length} Estates`;

  if (savedProps.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-slate-400">
        <i data-lucide="heart" class="w-12 h-12 mx-auto text-slate-600 mb-3"></i>
        <p class="text-sm font-medium">Your private shortlist is currently empty.</p>
        <p class="text-xs text-slate-500 mt-1">Tap the heart icon on any estate to compare and curate your portfolio.</p>
      </div>
    `;
    initLucideIcons();
    return;
  }

  container.innerHTML = savedProps.map(prop => `
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex gap-4 items-center group">
      <img src="${prop.heroImage}" alt="${prop.title}" class="w-20 h-20 rounded-lg object-cover shrink-0"/>
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">${prop.title}</h4>
        <span class="text-xs text-slate-400 block truncate mb-1">${prop.microLocation}</span>
        <span class="text-xs font-serif-luxury font-bold text-amber-400 block">${formatMoney(prop.priceINR)}</span>
      </div>
      <div class="flex flex-col gap-1.5 shrink-0">
        <button onclick="openVipBookingModal('${prop.id}')" class="p-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors" title="Book Viewing">
          <i data-lucide="calendar" class="w-4 h-4"></i>
        </button>
        <button onclick="toggleShortlist('${prop.id}')" class="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors" title="Remove">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join("");

  initLucideIcons();
}

function shareShortlistOnWhatsApp() {
  const savedProps = LUXURY_PROPERTIES.filter(p => AppState.shortlist.includes(p.id));
  if (savedProps.length === 0) {
    alert("Please add properties to your shortlist first.");
    return;
  }

  const listText = savedProps.map((p, i) => `${i + 1}. *${p.title}* (${p.microLocation}) - ${formatMoney(p.priceINR)}`).join("\n");
  const msg = encodeURIComponent(
    `*ESTATE MATRIX - CURATED PROPERTY SHORTLIST*\n\nHello Private Advisory Desk,\n\nHere is my shortlisted selection of ultra-luxury residences:\n\n${listText}\n\nPlease share comprehensive private dossiers, off-market availability, and schedule site inspections.`
  );

  window.open(`https://wa.me/919820012345?text=${msg}`, "_blank");
}

// ----------------------------------------------------
// WhatsApp Direct Links Helper
// ----------------------------------------------------
function getWhatsAppPropertyLink(prop) {
  const text = encodeURIComponent(
    `Hello Estate Matrix,\n\nI am interested in acquiring *"${prop.title}"* located in *${prop.microLocation}* (Valuation: ${formatMoney(prop.priceINR)}).\n\nPlease send me the verified title deed, floor plans, and VIP site visit options.`
  );
  return `https://wa.me/919820012345?text=${text}`;
}

function sendDirectWhatsAppInquiry(topic) {
  const text = encodeURIComponent(
    `Hello Estate Matrix Senior Real Estate Advisory,\n\nI would like to inquire about: *${topic}*.\n\nPlease connect me with an executive partner.`
  );
  window.open(`https://wa.me/919820012345?text=${text}`, "_blank");
}

// Simple Confetti Celebration
function triggerConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#10B981']
    });
  }
}
