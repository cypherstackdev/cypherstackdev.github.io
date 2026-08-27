// MedicareSync - Main Application Controller
window.App = {
  activeSpecialty: 'all',
  searchQuery: '',
  filterMode: 'all', // 'all' | 'in-clinic' | 'video'
  sortBy: 'rating',  // 'rating' | 'experience' | 'fee-asc' | 'fee-desc'

  init() {
    this.renderSpecialties();
    this.renderDoctors();
    this.renderTestimonials();
    this.renderFAQs();
    this.setupEventListeners();
    this.initTheme();

    if (window.VaultEngine) window.VaultEngine.init();
    if (window.BookingEngine) window.BookingEngine.init();
  },

  /**
   * Theme Switcher (Dark / Light)
   */
  initTheme() {
    const isDark = localStorage.getItem('medicare_theme') === 'dark' || 
                   (!('medicare_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('medicare_theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('medicare_theme', 'dark');
    }
  },

  /**
   * Render Specialty Filter Pills & Badges
   */
  renderSpecialties() {
    const container = document.getElementById('specialtyFilterContainer');
    const heroGrid = document.getElementById('heroSpecialtyGrid');
    const specialties = window.MedicareData.specialties;

    if (container) {
      container.innerHTML = specialties.map(s => `
        <button onclick="App.filterBySpecialty('${s.id}')" class="specialty-btn px-4 py-2 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 whitespace-nowrap border ${this.activeSpecialty === s.id ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-400/30' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500'}">
          <i data-lucide="${s.icon || 'stethoscope'}" class="w-3.5 h-3.5"></i>
          <span>${s.name}</span>
        </button>
      `).join('');
    }

    if (heroGrid) {
      heroGrid.innerHTML = specialties.filter(s => s.id !== 'all').slice(0, 6).map(s => `
        <div onclick="App.filterBySpecialty('${s.id}'); App.scrollToSection('doctorsSection')" class="group cursor-pointer bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl hover:border-teal-500 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center flex flex-col items-center justify-center">
          <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <i data-lucide="${s.icon || 'stethoscope'}" class="w-6 h-6"></i>
          </div>
          <h4 class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">${s.name}</h4>
          <p class="text-[10px] text-slate-500 mt-0.5">${s.symptoms.slice(0, 2).join(', ')}</p>
        </div>
      `).join('');
    }

    if (window.lucide) lucide.createIcons();
  },

  filterBySpecialty(specialtyId) {
    this.activeSpecialty = specialtyId;
    this.renderSpecialties();
    this.renderDoctors();
  },

  /**
   * Filter and Sort Doctors list
   */
  getFilteredDoctors() {
    let list = [...window.MedicareData.doctors];

    // Filter by Specialty
    if (this.activeSpecialty !== 'all') {
      list = list.filter(d => d.specialtyId === this.activeSpecialty);
    }

    // Filter by Search (Name, Specialty, Bio, Symptoms)
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(d => {
        const matchName = d.name.toLowerCase().includes(q);
        const matchSpec = d.specialtyName.toLowerCase().includes(q);
        const matchBio = d.bio.toLowerCase().includes(q);
        const specialtyObj = window.MedicareData.specialties.find(s => s.id === d.specialtyId);
        const matchSymptom = specialtyObj && specialtyObj.symptoms.some(sym => sym.toLowerCase().includes(q));
        return matchName || matchSpec || matchBio || matchSymptom;
      });
    }

    // Filter by Mode
    if (this.filterMode !== 'all') {
      list = list.filter(d => d.modes.includes(this.filterMode));
    }

    // Sort
    if (this.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'experience') {
      list.sort((a, b) => b.experience - a.experience);
    } else if (this.sortBy === 'fee-asc') {
      list.sort((a, b) => a.fee - b.fee);
    } else if (this.sortBy === 'fee-desc') {
      list.sort((a, b) => b.fee - a.fee);
    }

    return list;
  },

  /**
   * Render Doctor Directory Cards
   */
  renderDoctors() {
    const container = document.getElementById('doctorDirectoryGrid');
    const countBadge = document.getElementById('doctorResultsCount');
    if (!container) return;

    const doctors = this.getFilteredDoctors();

    if (countBadge) {
      countBadge.textContent = `${doctors.length} Specialist${doctors.length === 1 ? '' : 's'} Available`;
    }

    if (doctors.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div class="w-16 h-16 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <i data-lucide="search-x" class="w-8 h-8"></i>
          </div>
          <h4 class="text-lg font-bold text-slate-800 dark:text-white">No Matching Doctors Found</h4>
          <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Try clearing search filters or selecting 'All Specialties'.</p>
          <button onclick="App.resetFilters()" class="mt-4 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-all">
            Reset All Filters
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = doctors.map(doctor => `
      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Doctor Card Top Banner & Image -->
          <div class="p-6 pb-4">
            <div class="flex items-start gap-4">
              <div class="relative flex-shrink-0">
                <img src="${doctor.image}" alt="${doctor.name}" class="w-20 h-20 rounded-2xl object-cover ring-2 ring-teal-500/20 group-hover:scale-105 transition-transform duration-300">
                <span class="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-white" title="Verified Specialist">
                  <i data-lucide="check" class="w-3 h-3 stroke-[3]"></i>
                </span>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    <i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i> ${doctor.rating} (${doctor.reviewCount}+)
                  </span>
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    ${doctor.experience}+ Yrs Exp
                  </span>
                </div>

                <h3 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1 truncate group-hover:text-teal-600 transition-colors">
                  ${doctor.name}
                </h3>
                <p class="text-xs font-medium text-teal-700 dark:text-teal-400 truncate">
                  ${doctor.specialtyName}
                </p>
                <p class="text-[11px] text-slate-400 truncate mt-0.5">
                  ${doctor.qualifications}
                </p>
              </div>
            </div>

            <!-- Hospital Affiliation & Languages -->
            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
              <div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
                <i data-lucide="building" class="w-3.5 h-3.5 text-teal-600 flex-shrink-0"></i>
                <span class="truncate">${doctor.hospitalAffiliation}</span>
              </div>
              <div class="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <i data-lucide="languages" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
                <span>Speaks: ${doctor.languages.join(', ')}</span>
              </div>
            </div>

            <!-- Next Available Slot Pill -->
            <div class="mt-3.5 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span class="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300">Next Slot: <strong>${doctor.nextSlot}</strong></span>
              </div>
              <div class="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                ${doctor.modes.includes('in-clinic') ? '<span title="In-Clinic Visit">🏥 Clinic</span>' : ''}
                ${doctor.modes.includes('video') ? '<span title="Video Teleconsultation">📹 Video</span>' : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Card Footer: Fee & Action Buttons -->
        <div class="p-4 sm:p-6 pt-3 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
          <div class="flex items-center justify-between mb-3.5">
            <div>
              <span class="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Consultation Fee</span>
              <span class="text-lg font-black text-slate-900 dark:text-white">₹${doctor.fee}</span>
            </div>
            <button onclick="App.openDoctorBioModal('${doctor.id}')" class="text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 hover:underline">
              View Profile &amp; Bio &rarr;
            </button>
          </div>

          <button onclick="BookingEngine.openBookingModal('${doctor.id}')" class="w-full py-3 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2">
            <i data-lucide="calendar-plus" class="w-4 h-4"></i> Book Appointment
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  resetFilters() {
    this.activeSpecialty = 'all';
    this.searchQuery = '';
    this.filterMode = 'all';
    this.sortBy = 'rating';
    const searchInput = document.getElementById('doctorSearchInput');
    if (searchInput) searchInput.value = '';
    this.renderSpecialties();
    this.renderDoctors();
  },

  /**
   * Modal: Full Doctor Profile & Biography
   */
  openDoctorBioModal(doctorId) {
    const doctor = window.MedicareData.doctors.find(d => d.id === doctorId);
    if (!doctor) return;

    const modal = document.getElementById('globalModal');
    const modalContent = document.getElementById('globalModalContent');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        <div class="p-6 bg-gradient-to-br from-teal-800 to-slate-900 text-white relative">
          <button onclick="VaultEngine.closeModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
          <div class="flex items-center gap-4">
            <img src="${doctor.image}" alt="${doctor.name}" class="w-20 h-20 rounded-2xl object-cover ring-2 ring-white/30 shadow-lg">
            <div>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">Verified Specialist</span>
              <h3 class="text-xl font-black mt-1">${doctor.name}</h3>
              <p class="text-teal-200 text-xs">${doctor.specialtyName}</p>
              <p class="text-slate-300 text-[11px] mt-0.5">${doctor.qualifications}</p>
            </div>
          </div>
        </div>

        <div class="p-6 space-y-4 text-xs">
          <!-- Overview Strip -->
          <div class="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <div>
              <span class="text-slate-400 block">Experience</span>
              <strong class="text-sm font-bold text-slate-800 dark:text-slate-200">${doctor.experience}+ Years</strong>
            </div>
            <div>
              <span class="text-slate-400 block">Patient Rating</span>
              <strong class="text-sm font-bold text-amber-500">★ ${doctor.rating} (${doctor.reviewCount})</strong>
            </div>
            <div>
              <span class="text-slate-400 block">Fee</span>
              <strong class="text-sm font-bold text-teal-600">₹${doctor.fee}</strong>
            </div>
          </div>

          <!-- Bio -->
          <div>
            <h4 class="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-1.5">About Doctor</h4>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">${doctor.bio}</p>
          </div>

          <!-- Hospital & Languages -->
          <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <i data-lucide="building" class="w-4 h-4 text-teal-600"></i>
              <span><strong>Affiliation:</strong> ${doctor.hospitalAffiliation}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <i data-lucide="languages" class="w-4 h-4 text-teal-600"></i>
              <span><strong>Languages Spoken:</strong> ${doctor.languages.join(', ')}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <i data-lucide="calendar" class="w-4 h-4 text-teal-600"></i>
              <span><strong>Available Days:</strong> ${doctor.availableDays.join(', ')}</span>
            </div>
          </div>

          <div class="pt-3">
            <button onclick="VaultEngine.closeModal(); BookingEngine.openBookingModal('${doctor.id}')" class="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
              <i data-lucide="calendar-plus" class="w-4 h-4"></i> Book Consultation with ${doctor.name.split(' ')[1]}
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  },

  /**
   * Testimonials Renderer
   */
  renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;

    container.innerHTML = window.MedicareData.testimonials.map(t => `
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-1 text-amber-400 mb-3">
            ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join('')}
          </div>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
            "${t.review}"
          </p>
        </div>

        <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h5 class="font-bold text-xs text-slate-900 dark:text-white">${t.name}</h5>
            <span class="text-[10px] text-slate-400">${t.city}</span>
          </div>
          <span class="text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-full">
            ${t.doctor}
          </span>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  /**
   * FAQs Renderer
   */
  renderFAQs() {
    const container = document.getElementById('faqContainer');
    if (!container) return;

    container.innerHTML = window.MedicareData.faqs.map((faq, idx) => `
      <div class="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
        <button onclick="App.toggleFAQ(${idx})" class="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 dark:text-white hover:text-teal-600 transition-colors">
          <span>${faq.q}</span>
          <i data-lucide="chevron-down" id="faq-icon-${idx}" class="w-4 h-4 text-slate-400 transition-transform duration-200"></i>
        </button>
        <div id="faq-body-${idx}" class="hidden px-4 sm:px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
          ${faq.a}
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  toggleFAQ(idx) {
    const body = document.getElementById(`faq-body-${idx}`);
    const icon = document.getElementById(`faq-icon-${idx}`);
    if (!body || !icon) return;

    if (body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      icon.classList.add('rotate-180');
    } else {
      body.classList.add('hidden');
      icon.classList.remove('rotate-180');
    }
  },

  /**
   * Emergency Modal & Triage Info
   */
  openEmergencyModal() {
    const modal = document.getElementById('globalModal');
    const modalContent = document.getElementById('globalModalContent');
    if (!modal || !modalContent) return;

    const clinic = window.MedicareData.clinicInfo;

    modalContent.innerHTML = `
      <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-rose-500">
        <div class="p-6 bg-gradient-to-r from-rose-600 to-red-700 text-white text-center">
          <div class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2.5 animate-pulse">
            <i data-lucide="ambulance" class="w-7 h-7"></i>
          </div>
          <h3 class="text-xl font-black">24/7 EMERGENCY HELPLINE</h3>
          <p class="text-xs text-rose-100 mt-0.5">Immediate Trauma, Cardiac & Ambulance Dispatch</p>
        </div>

        <div class="p-6 space-y-4 text-xs text-left">
          <div class="space-y-2.5">
            <a href="tel:108" class="w-full py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all">
              <i data-lucide="phone-call" class="w-5 h-5"></i> DIAL 108 (National Ambulance Hotline)
            </a>

            <a href="tel:+919988776655" class="w-full py-3 px-4 rounded-2xl border-2 border-rose-600 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-xs flex items-center justify-center gap-2 transition-all">
              <i data-lucide="phone" class="w-4 h-4"></i> Call Medicare Emergency ER Desk (+91 99887 76655)
            </a>
          </div>

          <!-- Emergency ER Address -->
          <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span class="font-bold text-slate-800 dark:text-slate-200 block text-xs">Nearest Trauma Center:</span>
            <p class="text-slate-600 dark:text-slate-400 text-xs">${clinic.address}</p>
            <a href="${clinic.googleMapsUrl}" target="_blank" class="inline-flex items-center gap-1 text-rose-600 font-bold hover:underline mt-2">
              <i data-lucide="navigation" class="w-3.5 h-3.5"></i> Launch Live ER GPS Route
            </a>
          </div>

          <div class="text-[11px] text-slate-500 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50">
            ⚠️ <strong>Triage Note:</strong> For chest pain radiating to left arm, severe breathing difficulty, sudden facial drooping or loss of speech, call 108 immediately.
          </div>

          <button onclick="VaultEngine.closeModal()" class="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Dismiss
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  },

  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  },

  setupEventListeners() {
    const searchInput = document.getElementById('doctorSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderDoctors();
      });
    }

    const sortSelect = document.getElementById('doctorSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderDoctors();
      });
    }

    const modeSelect = document.getElementById('doctorModeFilter');
    if (modeSelect) {
      modeSelect.addEventListener('change', (e) => {
        this.filterMode = e.target.value;
        this.renderDoctors();
      });
    }
  }
};

/**
 * Toast Notification Utility
 */
window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-600 text-white' : 
                  type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white';

  toast.className = `${bgClass} px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold transform transition-all duration-300 translate-y-2 opacity-0 max-w-md`;
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle-2' : type === 'error' ? 'alert-triangle' : 'info'}" class="w-4 h-4 flex-shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Global Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
