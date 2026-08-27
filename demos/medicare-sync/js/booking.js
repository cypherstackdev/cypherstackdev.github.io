// MedicareSync - Interactive Slot Booking Engine
window.BookingEngine = {
  selectedDoctor: null,
  selectedMode: 'in-clinic', // 'in-clinic' | 'video'
  selectedBranch: 'Koramangala Main Center',
  selectedDate: null,
  selectedShift: 'evening', // 'morning' | 'afternoon' | 'evening'
  selectedTime: null,
  isFollowUp: false,

  init() {
    this.setDefaultDate();
  },

  setDefaultDate() {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
  },

  /**
   * Opens the booking modal for a specific doctor
   * @param {string} doctorId 
   */
  openBookingModal(doctorId) {
    const doctor = window.MedicareData.doctors.find(d => d.id === doctorId);
    if (!doctor) return;

    this.selectedDoctor = doctor;
    this.selectedMode = doctor.modes.includes('in-clinic') ? 'in-clinic' : 'video';
    this.setDefaultDate();
    this.selectedShift = 'evening';
    this.selectedTime = (doctor.slots.evening && doctor.slots.evening[0]) || (doctor.slots.morning && doctor.slots.morning[0]) || '05:30 PM';

    this.renderBookingModal();
  },

  renderBookingModal() {
    const modal = document.getElementById('bookingModal');
    const container = document.getElementById('bookingModalContent');
    if (!modal || !container || !this.selectedDoctor) return;

    const doctor = this.selectedDoctor;
    const next7Days = this.generateNextDays(7);

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
        <!-- Modal Top Header with Doctor Quick Card -->
        <div class="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3.5">
            <img src="${doctor.image}" alt="${doctor.name}" class="w-12 h-12 rounded-2xl object-cover ring-2 ring-teal-500/30">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">${doctor.name}</h3>
                <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                  ★ ${doctor.rating}
                </span>
              </div>
              <p class="text-xs text-teal-700 dark:text-teal-400 font-medium">${doctor.specialtyName}</p>
            </div>
          </div>
          <button onclick="BookingEngine.closeBookingModal()" class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-all">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="bookingForm" onsubmit="BookingEngine.handleBookingSubmit(event)" class="p-6 space-y-6 text-xs">
          
          <!-- 1. Consultation Mode Selector -->
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
              1. Choose Consultation Mode
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button type="button" onclick="BookingEngine.setMode('in-clinic')" class="p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${this.selectedMode === 'in-clinic' ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 shadow-sm' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}">
                <div class="w-9 h-9 rounded-xl ${this.selectedMode === 'in-clinic' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'} flex items-center justify-center flex-shrink-0">
                  <i data-lucide="building" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="font-bold text-sm text-slate-900 dark:text-white">In-Clinic Visit</div>
                  <p class="text-[11px] text-slate-500 mt-0.5">Physical checkup at clinic center</p>
                </div>
              </button>

              <button type="button" onclick="BookingEngine.setMode('video')" class="p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${this.selectedMode === 'video' ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 shadow-sm' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}">
                <div class="w-9 h-9 rounded-xl ${this.selectedMode === 'video' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'} flex items-center justify-center flex-shrink-0">
                  <i data-lucide="video" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="font-bold text-sm text-slate-900 dark:text-white">HD Video Call</div>
                  <p class="text-[11px] text-slate-500 mt-0.5">100% online teleconsultation</p>
                </div>
              </button>
            </div>

            <!-- Clinic Branch Selection if In-Clinic -->
            ${this.selectedMode === 'in-clinic' ? `
              <div class="mt-3">
                <label class="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Clinic Branch Location:</label>
                <select id="bookingBranchSelect" onchange="BookingEngine.selectedBranch = this.value" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-teal-500 outline-none">
                  ${window.MedicareData.clinicInfo.branches.map(b => `
                    <option value="${b.name}" ${this.selectedBranch === b.name ? 'selected' : ''}>${b.name} (${b.address})</option>
                  `).join('')}
                </select>
              </div>
            ` : ''}
          </div>

          <!-- 2. Interactive Date Picker (Horizontal Calendar) -->
          <div>
            <div class="flex items-center justify-between mb-2.5">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                2. Select Date
              </label>
              <span class="text-xs text-teal-600 dark:text-teal-400 font-semibold font-mono">
                ${this.formatDateHeader(this.selectedDate)}
              </span>
            </div>
            
            <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
              ${next7Days.map(day => `
                <button type="button" onclick="BookingEngine.setDate('${day.dateStr}')" class="p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${this.selectedDate === day.dateStr ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-300/40' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-teal-400 text-slate-700 dark:text-slate-300'}">
                  <span class="text-[10px] uppercase font-bold tracking-wider ${this.selectedDate === day.dateStr ? 'text-teal-100' : 'text-slate-400'}">${day.dayShort}</span>
                  <span class="text-base font-extrabold my-0.5">${day.dayNum}</span>
                  <span class="text-[9px] font-medium ${this.selectedDate === day.dateStr ? 'text-teal-100' : 'text-teal-600 dark:text-teal-400'}">${day.monthShort}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 3. Time Shift & Slot Selection -->
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
              3. Available Time Slots
            </label>

            <!-- Shift Filter Tabs -->
            <div class="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3">
              <button type="button" onclick="BookingEngine.setShift('morning')" class="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${this.selectedShift === 'morning' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
                <i data-lucide="sun" class="w-3.5 h-3.5"></i> Morning
              </button>
              <button type="button" onclick="BookingEngine.setShift('afternoon')" class="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${this.selectedShift === 'afternoon' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
                <i data-lucide="cloud-sun" class="w-3.5 h-3.5"></i> Afternoon
              </button>
              <button type="button" onclick="BookingEngine.setShift('evening')" class="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${this.selectedShift === 'evening' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
                <i data-lucide="moon" class="w-3.5 h-3.5"></i> Evening
              </button>
            </div>

            <!-- Slots Grid -->
            <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
              ${(doctor.slots[this.selectedShift] || []).map(slot => `
                <button type="button" onclick="BookingEngine.setTime('${slot}')" class="py-2.5 px-3 rounded-xl border text-center font-mono text-xs font-semibold transition-all ${this.selectedTime === slot ? 'bg-teal-700 text-white border-teal-700 shadow ring-2 ring-teal-400/40' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-800 dark:text-slate-200'}">
                  ${slot}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 4. Patient Information -->
          <div class="border-t border-slate-200 dark:border-slate-800 pt-5">
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              4. Patient Information
            </label>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 dark:text-slate-400 font-medium mb-1">Full Patient Name *</label>
                <input type="text" id="patientName" required value="Rajesh Kumar" placeholder="e.g. Rajesh Kumar" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none">
              </div>

              <div>
                <label class="block text-slate-600 dark:text-slate-400 font-medium mb-1">Phone / WhatsApp Number *</label>
                <input type="tel" id="patientPhone" required value="+91 98450 12345" placeholder="+91 98450 12345" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none">
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-slate-600 dark:text-slate-400 font-medium mb-1">Age (Yrs)</label>
                  <input type="number" id="patientAge" value="38" min="1" max="110" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none">
                </div>
                <div>
                  <label class="block text-slate-600 dark:text-slate-400 font-medium mb-1">Gender</label>
                  <select id="patientGender" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none">
                    <option value="Male" selected>Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-slate-600 dark:text-slate-400 font-medium mb-1">Email Address</label>
                <input type="email" id="patientEmail" value="rajesh.kumar@example.com" placeholder="name@email.com" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none">
              </div>
            </div>

            <div class="mt-3">
              <label class="block text-slate-600 dark:text-slate-400 font-medium mb-1">Symptoms or Reason for Consultation</label>
              <textarea id="patientSymptoms" rows="2" placeholder="Describe symptoms, duration, or specific concerns..." class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 outline-none">Chest tightness after mild workout & BP checkup</textarea>
            </div>

            <!-- Follow-up checkbox -->
            <div class="flex items-center gap-2 mt-3">
              <input type="checkbox" id="patientFollowUp" class="rounded text-teal-600 focus:ring-teal-500 w-4 h-4">
              <label for="patientFollowUp" class="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                This is a follow-up consultation within 14 days of previous visit
              </label>
            </div>
          </div>

          <!-- Fee Summary Card -->
          <div class="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/30 border border-teal-200 dark:border-teal-900/60 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span class="text-xs text-slate-500 dark:text-slate-400 block font-medium">Consultation Fee</span>
              <div class="text-xl font-black text-teal-900 dark:text-teal-200">₹${doctor.fee} <span class="text-xs font-normal text-slate-500">(No convenience charge)</span></div>
            </div>
            <div class="text-right text-[11px] text-slate-500">
              <span class="inline-flex items-center gap-1 text-emerald-600 font-bold"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Instant Confirmation</span>
              <p>Free cancellation up to 2 hrs</p>
            </div>
          </div>

          <!-- Submit Action -->
          <div class="pt-2">
            <button type="submit" class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2">
              <i data-lucide="check-circle" class="w-4 h-4"></i> Confirm & Generate WhatsApp Booking
            </button>
          </div>
        </form>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  },

  setMode(mode) {
    this.selectedMode = mode;
    this.renderBookingModal();
  },

  setDate(dateStr) {
    this.selectedDate = dateStr;
    this.renderBookingModal();
  },

  setShift(shift) {
    this.selectedShift = shift;
    const doctor = this.selectedDoctor;
    if (doctor && doctor.slots[shift] && doctor.slots[shift].length > 0) {
      this.selectedTime = doctor.slots[shift][0];
    }
    this.renderBookingModal();
  },

  setTime(slot) {
    this.selectedTime = slot;
    this.renderBookingModal();
  },

  formatDateHeader(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  },

  generateNextDays(count = 7) {
    const days = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        dateStr,
        dayShort: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthShort: d.toLocaleDateString('en-IN', { month: 'short' })
      });
    }
    return days;
  },

  closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  handleBookingSubmit(e) {
    e.preventDefault();
    if (!this.selectedDoctor || !this.selectedDate || !this.selectedTime) {
      window.showToast("Please select date and time slot.", "error");
      return;
    }

    const patientName = document.getElementById('patientName').value.trim();
    const patientPhone = document.getElementById('patientPhone').value.trim();
    const patientAge = document.getElementById('patientAge').value.trim();
    const patientGender = document.getElementById('patientGender').value;
    const patientEmail = document.getElementById('patientEmail').value.trim();
    const patientSymptoms = document.getElementById('patientSymptoms').value.trim();
    const isFollowUp = document.getElementById('patientFollowUp').checked;

    if (!patientName || !patientPhone) {
      window.showToast("Please fill in required patient details.", "error");
      return;
    }

    const bookingId = `MED-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const tokenNumber = `TK-${String(Math.floor(1 + Math.random() * 25)).padStart(2, '0')}`;

    const newAppointment = {
      id: bookingId,
      doctor: {
        id: this.selectedDoctor.id,
        name: this.selectedDoctor.name,
        specialtyName: this.selectedDoctor.specialtyName,
        qualifications: this.selectedDoctor.qualifications
      },
      patient: {
        name: patientName,
        phone: patientPhone,
        age: patientAge ? parseInt(patientAge, 10) : 38,
        gender: patientGender,
        email: patientEmail,
        symptoms: patientSymptoms || "General Consultation",
        isFollowUp
      },
      date: this.selectedDate,
      time: this.selectedTime,
      slotShift: this.selectedShift.charAt(0).toUpperCase() + this.selectedShift.slice(1),
      mode: this.selectedMode,
      clinicBranch: this.selectedMode === 'in-clinic' ? this.selectedBranch : null,
      videoMeetingUrl: this.selectedMode === 'video' ? `https://telehealth.medicaresync.health/room/${bookingId}` : null,
      fee: this.selectedDoctor.fee,
      tokenNumber,
      status: "Confirmed",
      bookedAt: new Date().toISOString()
    };

    // Save to Vault/LocalStorage
    window.VaultEngine.saveAppointment(newAppointment);

    // Close booking modal
    this.closeBookingModal();

    // Show Confirmation Modal
    this.showConfirmationSuccessModal(newAppointment);

    // Update Vault if visible
    if (window.VaultEngine.activeTab === 'appointments') {
      window.VaultEngine.renderActiveTabContent();
    }
    window.VaultEngine.renderTabs();
  },

  /**
   * Success Modal with WhatsApp Action & Direction Link
   */
  showConfirmationSuccessModal(appointment) {
    const modal = document.getElementById('globalModal');
    const modalContent = document.getElementById('globalModalContent');
    if (!modal || !modalContent) return;

    const isVideo = appointment.mode === 'video';
    const clinic = window.MedicareData.clinicInfo;
    const branch = clinic.branches.find(b => b.name === appointment.clinicBranch) || clinic.branches[0];

    modalContent.innerHTML = `
      <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-in fade-in zoom-in-95 duration-200">
        <div class="p-8 bg-gradient-to-b from-teal-50 to-white dark:from-teal-950/40 dark:to-slate-900">
          <div class="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 mb-4 animate-bounce">
            <i data-lucide="check" class="w-8 h-8 stroke-[3]"></i>
          </div>

          <span class="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs rounded-full mb-2">
            TOKEN: ${appointment.tokenNumber} &bull; ID: ${appointment.id}
          </span>
          <h3 class="text-2xl font-black text-slate-900 dark:text-white">Appointment Confirmed!</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Your booking with <strong>${appointment.doctor.name}</strong> is locked for <strong>${window.WhatsAppEngine.formatReadableDate(appointment.date)} at ${appointment.time}</strong>.
          </p>
        </div>

        <div class="px-6 pb-6 space-y-4 text-left text-xs">
          <!-- WhatsApp Quick Action Box -->
          <div class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2.5 text-emerald-900 dark:text-emerald-300 font-bold">
              <i data-lucide="message-circle" class="w-5 h-5 text-emerald-600"></i>
              <span>Automated WhatsApp Slip Generated</span>
            </div>
            <p class="text-[11px] text-emerald-800/80 dark:text-emerald-400">
              Send instant appointment summary, address, and Google Maps direction link to WhatsApp.
            </p>
            <div class="flex gap-2">
              <button onclick="window.WhatsAppEngine.sendWhatsApp(BookingEngine.lastConfirmedAppt)" class="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all">
                <i data-lucide="send" class="w-3.5 h-3.5"></i> Open in WhatsApp
              </button>
              <button onclick="window.WhatsAppEngine.copyToClipboard(BookingEngine.lastConfirmedAppt)" class="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 font-semibold hover:bg-emerald-50 transition-all">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Text
              </button>
            </div>
          </div>

          <!-- Location or Video Link Box -->
          ${!isVideo ? `
            <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <i data-lucide="map-pin" class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"></i>
              <div class="flex-1">
                <h5 class="font-bold text-slate-800 dark:text-slate-200">${appointment.clinicBranch || branch.name}</h5>
                <p class="text-[11px] text-slate-500">${branch.address}</p>
                <a href="${branch.mapsUrl}" target="_blank" class="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold mt-1.5 hover:underline">
                  <i data-lucide="navigation" class="w-3 h-3"></i> Get Driving Directions
                </a>
              </div>
            </div>
          ` : `
            <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <i data-lucide="video" class="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5"></i>
              <div class="flex-1">
                <h5 class="font-bold text-slate-800 dark:text-slate-200">Encrypted Telehealth Room</h5>
                <p class="text-[11px] text-slate-500">Access link will be active 10 mins before your consultation.</p>
                <span class="inline-block font-mono text-sky-600 font-semibold mt-1 truncate max-w-[240px]">${appointment.videoMeetingUrl}</span>
              </div>
            </div>
          `}

          <div class="pt-2 flex items-center justify-end gap-3">
            <button onclick="VaultEngine.closeModal()" class="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs transition-all">
              Done & View in Vault
            </button>
          </div>
        </div>
      </div>
    `;

    this.lastConfirmedAppt = appointment;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  }
};
