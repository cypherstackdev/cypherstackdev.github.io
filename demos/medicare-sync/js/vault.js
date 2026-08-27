// MedicareSync - Digital Prescription & Diagnostic Report Vault Engine
window.VaultEngine = {
  activeTab: 'prescriptions', // 'prescriptions' | 'lab-reports' | 'appointments'

  init() {
    this.renderPatientProfile();
    this.renderTabs();
    this.renderActiveTabContent();
  },

  /**
   * Render patient banner in Vault
   */
  renderPatientProfile() {
    const profile = window.MedicareData.patientProfile;
    const container = document.getElementById('vaultPatientProfile');
    if (!container) return;

    container.innerHTML = `
      <div class="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-teal-700/30">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-teal-500/20 border-2 border-teal-400/40 flex items-center justify-center text-2xl font-bold text-teal-300 shadow-inner">
              ${profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="text-2xl font-bold tracking-tight text-white">${profile.name}</h3>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> ABHA Verified
                </span>
              </div>
              <p class="text-teal-200/80 text-sm mt-0.5 font-mono">ID: ${profile.id} &bull; ABHA: ${profile.abhaId}</p>
            </div>
          </div>

          <!-- Key Biometrics Badges -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
              <span class="text-xs text-slate-400 block font-medium">Age / Gender</span>
              <span class="text-sm font-semibold text-white">${profile.age} Y / ${profile.gender}</span>
            </div>
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
              <span class="text-xs text-slate-400 block font-medium">Blood Group</span>
              <span class="text-sm font-bold text-rose-400">${profile.bloodGroup}</span>
            </div>
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
              <span class="text-xs text-slate-400 block font-medium">Phone</span>
              <span class="text-sm font-semibold text-white">${profile.phone}</span>
            </div>
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
              <span class="text-xs text-slate-400 block font-medium">Known Allergies</span>
              <span class="text-xs font-semibold text-amber-300 truncate block" title="${profile.knownAllergies}">${profile.knownAllergies}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  /**
   * Render Vault Tab Switcher
   */
  renderTabs() {
    const tabsContainer = document.getElementById('vaultTabsHeader');
    if (!tabsContainer) return;

    const appointmentsCount = this.getAppointments().length;
    const prescriptionsCount = window.MedicareData.prescriptions.length;
    const labReportsCount = window.MedicareData.labReports.length;

    tabsContainer.innerHTML = `
      <div class="flex border-b border-slate-200 dark:border-slate-800 space-x-1 sm:space-x-8 overflow-x-auto pb-px">
        <button onclick="VaultEngine.switchTab('prescriptions')" class="vault-tab-btn flex items-center gap-2 pb-4 px-2 sm:px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${this.activeTab === 'prescriptions' ? 'border-teal-600 text-teal-700 dark:text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}">
          <i data-lucide="file-text" class="w-4 h-4"></i>
          <span>Digital Prescriptions</span>
          <span class="px-2 py-0.5 text-xs rounded-full ${this.activeTab === 'prescriptions' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}">${prescriptionsCount}</span>
        </button>

        <button onclick="VaultEngine.switchTab('lab-reports')" class="vault-tab-btn flex items-center gap-2 pb-4 px-2 sm:px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${this.activeTab === 'lab-reports' ? 'border-teal-600 text-teal-700 dark:text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}">
          <i data-lucide="activity" class="w-4 h-4"></i>
          <span>Lab & Diagnostic Reports</span>
          <span class="px-2 py-0.5 text-xs rounded-full ${this.activeTab === 'lab-reports' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}">${labReportsCount}</span>
        </button>

        <button onclick="VaultEngine.switchTab('appointments')" class="vault-tab-btn flex items-center gap-2 pb-4 px-2 sm:px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${this.activeTab === 'appointments' ? 'border-teal-600 text-teal-700 dark:text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}">
          <i data-lucide="calendar-check" class="w-4 h-4"></i>
          <span>My Appointments</span>
          <span class="px-2 py-0.5 text-xs rounded-full ${this.activeTab === 'appointments' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}">${appointmentsCount}</span>
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  switchTab(tabName) {
    this.activeTab = tabName;
    this.renderTabs();
    this.renderActiveTabContent();
  },

  renderActiveTabContent() {
    const container = document.getElementById('vaultTabContent');
    if (!container) return;

    if (this.activeTab === 'prescriptions') {
      this.renderPrescriptions(container);
    } else if (this.activeTab === 'lab-reports') {
      this.renderLabReports(container);
    } else if (this.activeTab === 'appointments') {
      this.renderAppointments(container);
    }

    if (window.lucide) lucide.createIcons();
  },

  /**
   * Prescriptions List
   */
  renderPrescriptions(container) {
    const rxList = window.MedicareData.prescriptions;
    if (!rxList || rxList.length === 0) {
      container.innerHTML = `<div class="text-center py-12 text-slate-400">No prescriptions found.</div>`;
      return;
    }

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        ${rxList.map(rx => `
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
                    <i data-lucide="receipt" class="w-3.5 h-3.5"></i> ${rx.id}
                  </span>
                  <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-2">${rx.diagnosis}</h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <i data-lucide="user-round" class="w-3.5 h-3.5 text-teal-600"></i> ${rx.doctorName} &bull; <span class="text-slate-400">${rx.specialty}</span>
                  </p>
                </div>
                <span class="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full whitespace-nowrap">
                  ${window.WhatsAppEngine.formatReadableDate(rx.date)}
                </span>
              </div>

              <!-- Vitals Summary Strip -->
              <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
                <div><span class="text-slate-400 block">BP:</span> <span class="font-semibold text-slate-700 dark:text-slate-200">${rx.vitals.bp || 'N/A'}</span></div>
                <div><span class="text-slate-400 block">Pulse:</span> <span class="font-semibold text-slate-700 dark:text-slate-200">${rx.vitals.pulse || 'N/A'}</span></div>
                <div><span class="text-slate-400 block">Weight:</span> <span class="font-semibold text-slate-700 dark:text-slate-200">${rx.vitals.weight || 'N/A'}</span></div>
                <div><span class="text-slate-400 block">Medicines:</span> <span class="font-bold text-teal-600">${rx.medicines.length} prescribed</span></div>
              </div>

              <!-- Preview of Medicines -->
              <div class="space-y-1.5 mb-4">
                ${rx.medicines.map(m => `
                  <div class="text-xs flex items-center justify-between py-1 border-b border-dashed border-slate-100 dark:border-slate-800">
                    <span class="font-semibold text-slate-800 dark:text-slate-200">${m.name}</span>
                    <span class="text-teal-600 dark:text-teal-400 font-mono">${m.frequency}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onclick="VaultEngine.viewPrescriptionModal('${rx.id}')" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i> View Rx Slip
              </button>
              <button onclick="VaultEngine.downloadRxPDF('${rx.id}')" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all">
                <i data-lucide="download" class="w-3.5 h-3.5"></i> Download
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /**
   * Lab Reports List
   */
  renderLabReports(container) {
    const labReports = window.MedicareData.labReports;
    if (!labReports || labReports.length === 0) {
      container.innerHTML = `<div class="text-center py-12 text-slate-400">No lab reports found.</div>`;
      return;
    }

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        ${labReports.map(report => `
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800">
                    <i data-lucide="test-tube-2" class="w-3.5 h-3.5"></i> ${report.category} &bull; ${report.id}
                  </span>
                  <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-2">${report.testName}</h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <i data-lucide="building" class="w-3.5 h-3.5 text-slate-400"></i> ${report.labName}
                  </p>
                </div>
                <span class="text-xs font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                  <i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-600"></i> ${report.status}
                </span>
              </div>

              <!-- Quick Highlights -->
              <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 mb-4 text-xs space-y-2">
                <div class="flex items-center justify-between text-slate-500">
                  <span>Referred by: <strong class="text-slate-700 dark:text-slate-300">${report.doctorReferred}</strong></span>
                  <span>Date: <strong class="text-slate-700 dark:text-slate-300">${window.WhatsAppEngine.formatReadableDate(report.date)}</strong></span>
                </div>
                <div class="pt-2 border-t border-slate-200/60 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  <span class="font-semibold text-slate-700 dark:text-slate-300">Summary:</span> ${report.summary}
                </div>
              </div>

              <!-- Mini table preview -->
              <div class="space-y-1.5 mb-4">
                ${report.results.slice(0, 3).map(r => `
                  <div class="text-xs flex items-center justify-between py-1 border-b border-dashed border-slate-100 dark:border-slate-800">
                    <span class="text-slate-700 dark:text-slate-300">${r.parameter}</span>
                    <div class="flex items-center gap-2">
                      <span class="font-bold ${r.flag === 'High' ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}">${r.value}</span>
                      <span class="px-1.5 py-0.5 text-[10px] rounded font-semibold ${r.flag === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}">${r.flag}</span>
                    </div>
                  </div>
                `).join('')}
                ${report.results.length > 3 ? `<div class="text-[11px] text-teal-600 dark:text-teal-400 font-medium text-center pt-1">+${report.results.length - 3} more parameters</div>` : ''}
              </div>
            </div>

            <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onclick="VaultEngine.viewLabReportModal('${report.id}')" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all">
                <i data-lucide="file-check" class="w-3.5 h-3.5"></i> Full Diagnostic Report
              </button>
              <button onclick="VaultEngine.downloadLabPDF('${report.id}')" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all">
                <i data-lucide="download" class="w-3.5 h-3.5"></i> PDF
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /**
   * My Appointments Tab
   */
  getAppointments() {
    let stored = [];
    try {
      const json = localStorage.getItem('medicare_appointments');
      if (json) stored = JSON.parse(json);
    } catch (e) {
      console.error(e);
    }
    // Combine mock base appointments and user booked appointments (unique by id)
    const base = window.MedicareData.sampleAppointments || [];
    const all = [...stored, ...base];
    const unique = [];
    const seen = new Set();
    for (const a of all) {
      if (!seen.has(a.id)) {
        seen.add(a.id);
        unique.push(a);
      }
    }
    return unique;
  },

  saveAppointment(appt) {
    const list = this.getAppointments();
    list.unshift(appt);
    try {
      localStorage.setItem('medicare_appointments', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  cancelAppointment(apptId) {
    const list = this.getAppointments();
    const target = list.find(a => a.id === apptId);
    if (target) {
      target.status = "Cancelled";
      try {
        localStorage.setItem('medicare_appointments', JSON.stringify(list));
      } catch (e) {
        console.error(e);
      }
      window.showToast("Appointment successfully cancelled.", "info");
      this.renderActiveTabContent();
      this.renderTabs();
    }
  },

  renderAppointments(container) {
    const appointments = this.getAppointments();
    if (!appointments || appointments.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 mt-6">
          <div class="w-16 h-16 bg-teal-50 dark:bg-teal-950/50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i data-lucide="calendar" class="w-8 h-8"></i>
          </div>
          <h4 class="text-lg font-bold text-slate-800 dark:text-white">No Appointments Scheduled Yet</h4>
          <p class="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Browse our specialist doctors and book an in-clinic or video consultation in under a minute.</p>
          <a href="#doctorsSection" class="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-all">
            Book First Consultation
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="space-y-4 mt-6">
        ${appointments.map(appt => {
          const isVideo = appt.mode === 'video';
          const isConfirmed = appt.status === 'Confirmed';
          const isCompleted = appt.status === 'Completed';
          const isCancelled = appt.status === 'Cancelled';

          return `
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow transition-all">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <!-- Left: Doctor & Appointment Details -->
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl flex-shrink-0 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800 flex items-center justify-center">
                    <i data-lucide="${isVideo ? 'video' : 'stethoscope'}" class="w-6 h-6"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-2.5 flex-wrap">
                      <h4 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">${appt.doctor.name}</h4>
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isConfirmed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800' :
                        isCompleted ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800' :
                        'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300'
                      }">
                        <span class="w-1.5 h-1.5 rounded-full ${isConfirmed ? 'bg-emerald-500 animate-pulse' : isCompleted ? 'bg-blue-500' : 'bg-rose-500'}"></span>
                        ${appt.status}
                      </span>
                      <span class="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                        ${appt.id}
                      </span>
                    </div>

                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      ${appt.doctor.specialtyName} &bull; ${isVideo ? '📹 HD Video Telehealth' : `📍 ${appt.clinicBranch || 'Koramangala Center'}`}
                    </p>

                    <!-- Meta details badge row -->
                    <div class="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-3 flex-wrap">
                      <span class="flex items-center gap-1 font-medium">
                        <i data-lucide="calendar" class="w-3.5 h-3.5 text-teal-600"></i> ${window.WhatsAppEngine.formatReadableDate(appt.date)}
                      </span>
                      <span class="flex items-center gap-1 font-medium">
                        <i data-lucide="clock" class="w-3.5 h-3.5 text-teal-600"></i> ${appt.time} (${appt.slotShift || 'Slot'})
                      </span>
                      <span class="flex items-center gap-1 font-medium">
                        <i data-lucide="ticket" class="w-3.5 h-3.5 text-teal-600"></i> Token: <strong>${appt.tokenNumber || 'TK-01'}</strong>
                      </span>
                      <span class="flex items-center gap-1 font-medium">
                        <i data-lucide="wallet" class="w-3.5 h-3.5 text-teal-600"></i> Fee: ₹${appt.fee}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Right: Action Buttons -->
                <div class="flex items-center gap-2 flex-wrap lg:flex-nowrap border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 dark:border-slate-800">
                  <button onclick="VaultEngine.openWhatsAppForAppt('${appt.id}')" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all">
                    <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> WhatsApp Slip
                  </button>

                  <button onclick="VaultEngine.viewReceiptModal('${appt.id}')" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all">
                    <i data-lucide="file-check" class="w-3.5 h-3.5"></i> Receipt
                  </button>

                  ${isConfirmed ? `
                    <button onclick="VaultEngine.cancelAppointment('${appt.id}')" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-400 text-xs font-semibold transition-all">
                      <i data-lucide="x" class="w-3.5 h-3.5"></i> Cancel
                    </button>
                  ` : ''}

                  ${isCompleted || isCancelled ? `
                    <button onclick="BookingEngine.openBookingModal('${appt.doctor.id}')" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold hover:bg-teal-100 transition-all">
                      <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> Re-book
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  openWhatsAppForAppt(apptId) {
    const appt = this.getAppointments().find(a => a.id === apptId);
    if (!appt) return;
    window.WhatsAppEngine.sendWhatsApp(appt);
  },

  /**
   * Modal: Full Prescription Slip
   */
  viewPrescriptionModal(rxId) {
    const rx = window.MedicareData.prescriptions.find(r => r.id === rxId);
    if (!rx) return;

    const modal = document.getElementById('globalModal');
    const modalContent = document.getElementById('globalModalContent');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 print:border-none print:shadow-none" id="prescriptionSlipToPrint">
        <!-- Clinic Official Header -->
        <div class="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
              +
            </div>
            <div>
              <h2 class="text-xl font-extrabold text-teal-900 dark:text-teal-300 tracking-tight">MEDICARE SYNC CLINIC</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">NABH Accredited Multi-Specialty & Digital Health Center</p>
              <p class="text-[11px] text-slate-400">42, 80 Feet Rd, Koramangala 4th Block, Bengaluru &bull; +91 80 4567 8900</p>
            </div>
          </div>

          <div class="text-right">
            <span class="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-mono font-bold text-xs rounded-lg">
              ${rx.id}
            </span>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Date: <strong>${window.WhatsAppEngine.formatReadableDate(rx.date)}</strong></p>
          </div>
        </div>

        <div class="p-6 sm:p-8 space-y-6">
          <!-- Doctor & Patient Banner -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-xs border border-slate-100 dark:border-slate-800">
            <div>
              <span class="text-slate-400 font-medium block">PRESCRIBING PHYSICIAN</span>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">${rx.doctorName}</h4>
              <p class="text-teal-600 dark:text-teal-400 font-semibold">${rx.specialty}</p>
              <p class="text-slate-500 text-[11px] mt-1">Reg No: KMC-78921-2010 &bull; Medicare Hospital Network</p>
            </div>
            <div>
              <span class="text-slate-400 font-medium block">PATIENT DETAILS</span>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">${window.MedicareData.patientProfile.name} (38Y / M)</h4>
              <p class="text-slate-500">ABHA: ${window.MedicareData.patientProfile.abhaId}</p>
              <p class="text-slate-500">Contact: ${window.MedicareData.patientProfile.phone}</p>
            </div>
          </div>

          <!-- Vitals Strip -->
          <div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Patient Vitals at Consultation</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 p-3 rounded-xl">
              <div><span class="text-slate-400 block">Blood Pressure:</span> <strong class="text-slate-800 dark:text-slate-200">${rx.vitals.bp}</strong></div>
              <div><span class="text-slate-400 block">Pulse Rate:</span> <strong class="text-slate-800 dark:text-slate-200">${rx.vitals.pulse}</strong></div>
              <div><span class="text-slate-400 block">BMI:</span> <strong class="text-slate-800 dark:text-slate-200">${rx.vitals.bmi || '24.2'}</strong></div>
              <div><span class="text-slate-400 block">Weight:</span> <strong class="text-slate-800 dark:text-slate-200">${rx.vitals.weight}</strong></div>
            </div>
          </div>

          <!-- Clinical Diagnosis -->
          <div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Clinical Diagnosis</span>
            <div class="text-sm font-bold text-teal-800 dark:text-teal-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border-l-4 border-teal-500">
              ${rx.diagnosis}
            </div>
          </div>

          <!-- Rx Medicines Table -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-2xl font-serif font-black text-teal-600">℞</span>
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Medication & Dosage Plan</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  <tr>
                    <th class="p-3">#</th>
                    <th class="p-3">Medicine & Strength</th>
                    <th class="p-3">Dosage</th>
                    <th class="p-3">Frequency & Timing</th>
                    <th class="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${rx.medicines.map((m, idx) => `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td class="p-3 font-mono text-slate-400">${idx + 1}</td>
                      <td class="p-3">
                        <div class="font-bold text-slate-900 dark:text-white">${m.name}</div>
                        <div class="text-[11px] text-slate-500 mt-0.5">${m.instructions}</div>
                      </td>
                      <td class="p-3 font-semibold text-slate-700 dark:text-slate-300">${m.dosage}</td>
                      <td class="p-3 font-mono font-semibold text-teal-700 dark:text-teal-400">${m.frequency}</td>
                      <td class="p-3 text-slate-600 dark:text-slate-300">${m.duration}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- General Advice & Followup -->
          <div class="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 p-4 rounded-xl text-xs space-y-2">
            <div>
              <span class="font-bold text-amber-900 dark:text-amber-300">Doctor's Lifestyle & Dietary Advice:</span>
              <p class="text-slate-700 dark:text-slate-300 mt-0.5">${rx.advice}</p>
            </div>
            <div class="pt-2 border-t border-amber-200/40 dark:border-amber-900/30 flex items-center justify-between">
              <span class="text-slate-600 dark:text-slate-400">Next Follow-up Review: <strong class="text-slate-900 dark:text-white">${rx.followUp}</strong></span>
              <span class="text-slate-500 font-mono text-[11px]">Emergency Hotline: 108</span>
            </div>
          </div>

          <!-- Footer Signature & QR -->
          <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <i data-lucide="qr-code" class="w-10 h-10 text-slate-700 dark:text-slate-300"></i>
              </div>
              <div class="text-[10px] text-slate-400">
                <span>Scan to verify digital prescription</span>
                <p class="font-mono text-teal-600">ID: ${rx.id}</p>
              </div>
            </div>

            <div class="text-right">
              <div class="font-serif italic text-teal-700 dark:text-teal-400 text-lg font-bold">~ Dr. Sharma</div>
              <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">${rx.signedBy}</div>
              <div class="text-[10px] text-slate-400">Digitally Signed & Timestamped</div>
            </div>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3 print:hidden">
          <button onclick="window.print()" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-semibold shadow transition-all">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print / Save as PDF
          </button>
          <button onclick="VaultEngine.closeModal()" class="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all">
            Close
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  },

  /**
   * Modal: Full Lab Diagnostic Report
   */
  viewLabReportModal(reportId) {
    const report = window.MedicareData.labReports.find(r => r.id === reportId);
    if (!report) return;

    const modal = document.getElementById('globalModal');
    const modalContent = document.getElementById('globalModalContent');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800" id="labReportToPrint">
        <!-- Lab Header -->
        <div class="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-sky-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-sky-600 text-white rounded-xl flex items-center justify-center shadow-md">
              <i data-lucide="microscope" class="w-6 h-6"></i>
            </div>
            <div>
              <h2 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">${report.labName}</h2>
              <p class="text-xs text-slate-500">ISO 15189 & NABL Accredited Reference Laboratory</p>
              <p class="text-[11px] text-slate-400">Specimen Source: Blood (Serum / Plasma) &bull; Barcode: 98124981</p>
            </div>
          </div>

          <div class="text-right">
            <span class="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 font-mono font-bold text-xs rounded-lg">
              ${report.id}
            </span>
            <p class="text-xs text-slate-500 mt-1">Sample Date: <strong>${window.WhatsAppEngine.formatReadableDate(report.date)}</strong></p>
          </div>
        </div>

        <div class="p-6 sm:p-8 space-y-6">
          <!-- Patient & Reference Meta -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-xs border border-slate-100 dark:border-slate-800">
            <div>
              <span class="text-slate-400 block">Patient Name:</span>
              <strong class="text-slate-900 dark:text-white">${window.MedicareData.patientProfile.name}</strong>
            </div>
            <div>
              <span class="text-slate-400 block">Age / Gender:</span>
              <strong class="text-slate-900 dark:text-white">38 Y / Male</strong>
            </div>
            <div>
              <span class="text-slate-400 block">Referred By:</span>
              <strong class="text-teal-600">${report.doctorReferred}</strong>
            </div>
            <div>
              <span class="text-slate-400 block">Report Status:</span>
              <strong class="text-emerald-600">${report.status}</strong>
            </div>
          </div>

          <!-- Test Title & Category -->
          <div>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">${report.testName}</h3>
              <span class="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">${report.category}</span>
            </div>
          </div>

          <!-- Results Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <tr>
                  <th class="p-3">Investigation / Parameter</th>
                  <th class="p-3">Result Value</th>
                  <th class="p-3">Reference Interval</th>
                  <th class="p-3 text-center">Status Flag</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                ${report.results.map(r => `
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td class="p-3 font-medium text-slate-900 dark:text-white">${r.parameter}</td>
                    <td class="p-3 font-mono font-bold ${r.flag === 'High' ? 'text-rose-600 text-sm' : 'text-slate-800 dark:text-slate-200'}">${r.value}</td>
                    <td class="p-3 text-slate-500 font-mono">${r.normalRange}</td>
                    <td class="p-3 text-center">
                      <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        r.flag === 'High' ? 'bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300' :
                        r.flag === 'Borderline' ? 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300' :
                        'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }">
                        ${r.flag}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Clinical Remarks -->
          <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-800">
            <span class="font-bold text-slate-700 dark:text-slate-300">Pathologist's Clinical Interpretation:</span>
            <p class="text-slate-600 dark:text-slate-400">${report.summary}</p>
          </div>

          <!-- Sign-off & Verification -->
          <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div class="text-xs text-slate-400">
              <span>Report Verified Electronically</span>
              <p class="text-teal-600 font-medium">NABL Accredited &bull; QC Passed</p>
            </div>

            <div class="text-right">
              <div class="font-serif italic text-slate-700 dark:text-slate-300 text-lg font-bold">~ Dr. Kavita Rao</div>
              <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">${report.pathologist}</div>
              <div class="text-[10px] text-slate-400">Senior Consultant Pathologist</div>
            </div>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
          <button onclick="window.print()" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-semibold shadow transition-all">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print Lab Report
          </button>
          <button onclick="VaultEngine.closeModal()" class="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all">
            Close
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  },

  /**
   * Modal: Appointment Receipt / Google Maps Directions
   */
  viewReceiptModal(apptId) {
    const appt = this.getAppointments().find(a => a.id === apptId);
    if (!appt) return;

    const modal = document.getElementById('globalModal');
    const modalContent = document.getElementById('globalModalContent');
    if (!modal || !modalContent) return;

    const isVideo = appt.mode === 'video';
    const clinic = window.MedicareData.clinicInfo;
    const branch = clinic.branches.find(b => b.name === appt.clinicBranch) || clinic.branches[0];

    modalContent.innerHTML = `
      <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        <div class="p-6 bg-gradient-to-br from-teal-700 to-slate-900 text-white">
          <div class="flex items-center justify-between mb-3">
            <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-mono font-bold tracking-wider">${appt.id}</span>
            <span class="px-3 py-1 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-semibold">${appt.status}</span>
          </div>
          <h3 class="text-2xl font-bold">Appointment Receipt</h3>
          <p class="text-xs text-teal-200/80 mt-0.5">Medicare Sync Consultation Voucher & Directions</p>
        </div>

        <div class="p-6 space-y-4 text-xs">
          <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800">
            <div class="flex justify-between py-1 border-b border-dashed border-slate-200 dark:border-slate-700">
              <span class="text-slate-500">Doctor:</span>
              <strong class="text-slate-800 dark:text-slate-200">${appt.doctor.name}</strong>
            </div>
            <div class="flex justify-between py-1 border-b border-dashed border-slate-200 dark:border-slate-700">
              <span class="text-slate-500">Specialty:</span>
              <strong class="text-teal-600">${appt.doctor.specialtyName}</strong>
            </div>
            <div class="flex justify-between py-1 border-b border-dashed border-slate-200 dark:border-slate-700">
              <span class="text-slate-500">Date & Slot:</span>
              <strong class="text-slate-800 dark:text-slate-200">${window.WhatsAppEngine.formatReadableDate(appt.date)} at ${appt.time}</strong>
            </div>
            <div class="flex justify-between py-1 border-b border-dashed border-slate-200 dark:border-slate-700">
              <span class="text-slate-500">Token Number:</span>
              <strong class="text-slate-800 dark:text-slate-200 text-sm font-mono">${appt.tokenNumber || 'TK-01'}</strong>
            </div>
            <div class="flex justify-between py-1 border-b border-dashed border-slate-200 dark:border-slate-700">
              <span class="text-slate-500">Patient:</span>
              <strong class="text-slate-800 dark:text-slate-200">${appt.patient.name} (${appt.patient.age || '38'}Y)</strong>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-slate-500">Consultation Fee:</span>
              <strong class="text-emerald-600 text-sm font-bold">₹${appt.fee}</strong>
            </div>
          </div>

          ${!isVideo ? `
            <div class="bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 p-4 rounded-xl">
              <div class="flex items-start gap-3">
                <i data-lucide="map-pin" class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"></i>
                <div>
                  <h5 class="font-bold text-teal-950 dark:text-teal-200 text-sm">${appt.clinicBranch || branch.name}</h5>
                  <p class="text-slate-600 dark:text-slate-400 text-xs mt-0.5">${branch.address}</p>
                  <a href="${branch.mapsUrl}" target="_blank" class="inline-flex items-center gap-1 text-teal-700 dark:text-teal-400 font-bold hover:underline mt-2">
                    <i data-lucide="navigation" class="w-3.5 h-3.5"></i> Open in Google Maps Navigation
                  </a>
                </div>
              </div>
            </div>
          ` : `
            <div class="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/60 p-4 rounded-xl">
              <div class="flex items-start gap-3">
                <i data-lucide="video" class="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5"></i>
                <div>
                  <h5 class="font-bold text-sky-950 dark:text-sky-200 text-sm">HD Video Consultation Room</h5>
                  <p class="text-slate-600 dark:text-slate-400 text-xs mt-0.5">End-to-end encrypted room. Active on consultation day.</p>
                  <a href="${appt.videoMeetingUrl || '#'}" target="_blank" class="inline-flex items-center gap-1 text-sky-700 dark:text-sky-400 font-bold hover:underline mt-2">
                    <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Join Telehealth Room
                  </a>
                </div>
              </div>
            </div>
          `}
        </div>

        <div class="p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
          <button onclick="window.WhatsAppEngine.sendWhatsApp(VaultEngine.getAppointments().find(a => a.id === '${appt.id}'))" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition-all">
            <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Send via WhatsApp
          </button>
          <button onclick="VaultEngine.closeModal()" class="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all">
            Close
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  },

  downloadRxPDF(rxId) {
    this.viewPrescriptionModal(rxId);
    setTimeout(() => {
      window.print();
    }, 400);
  },

  downloadLabPDF(reportId) {
    this.viewLabReportModal(reportId);
    setTimeout(() => {
      window.print();
    }, 400);
  },

  closeModal() {
    const modal = document.getElementById('globalModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
};
