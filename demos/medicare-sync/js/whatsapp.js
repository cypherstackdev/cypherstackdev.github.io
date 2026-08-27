// MedicareSync - WhatsApp Automated Confirmation Engine
window.WhatsAppEngine = {
  /**
   * Generates formatted WhatsApp text message for an appointment
   * @param {Object} appointment 
   * @returns {string} Formatted WhatsApp message string
   */
  generateMessage(appointment) {
    const isVideo = appointment.mode === 'video';
    const clinic = window.MedicareData.clinicInfo;
    const branch = clinic.branches.find(b => b.name === appointment.clinicBranch) || clinic.branches[0];
    const mapsLink = branch.mapsUrl;

    let msg = `🏥 *MEDICARE SYNC — BOOKING CONFIRMATION*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `Dear *${appointment.patient.name}*,\n`;
    msg += `Your consultation has been successfully confirmed!\n\n`;
    
    msg += `🔖 *Booking ID:* \`${appointment.id}\`\n`;
    msg += `🔢 *Token No:* *${appointment.tokenNumber || 'TK-01'}*\n`;
    msg += `🩺 *Doctor:* *${appointment.doctor.name}*\n`;
    msg += `🔬 *Specialty:* ${appointment.doctor.specialtyName}\n`;
    msg += `📅 *Date:* ${this.formatReadableDate(appointment.date)}\n`;
    msg += `⏰ *Time Slot:* ${appointment.time} (${appointment.slotShift || 'Scheduled'})\n`;
    msg += `💳 *Consultation Mode:* ${isVideo ? '📹 HD Video Teleconsultation' : '🏥 In-Clinic Visit'}\n`;
    msg += `💵 *Consultation Fee:* ₹${appointment.fee} (Payable at desk/online)\n\n`;

    if (isVideo) {
      const roomUrl = appointment.videoMeetingUrl || `https://telehealth.medicaresync.health/room/${appointment.id}`;
      msg += `📹 *Telehealth Video Link:*\n${roomUrl}\n`;
      msg += `_(Link will be active 10 mins prior to consultation)_\n\n`;
    } else {
      msg += `📍 *Clinic Address:*\n${appointment.clinicBranch || branch.name}\n${branch.address}\n\n`;
      msg += `🗺️ *Google Maps Directions:*\n${mapsLink}\n\n`;
    }

    msg += `📋 *Patient Details:*\n`;
    msg += `• Name: ${appointment.patient.name} (${appointment.patient.age || '30'}y / ${appointment.patient.gender || 'Patient'})\n`;
    msg += `• Reason: ${appointment.patient.symptoms || 'General Consultation'}\n\n`;

    msg += `📌 *Important Instructions:*\n`;
    if (!isVideo) {
      msg += `1. Please arrive 15 minutes prior to your slot for vitals triage.\n`;
      msg += `2. Carry previous prescriptions or diagnostic reports if any.\n`;
    } else {
      msg += `1. Ensure a stable internet connection and quiet environment.\n`;
      msg += `2. Keep your camera and microphone enabled.\n`;
    }
    msg += `3. Need to reschedule or cancel? Reply *RESCHEDULE* or call ${clinic.phone}.\n\n`;
    msg += `📞 *Emergency 24/7 Hotline:* ${clinic.emergencyHelpline}\n`;
    msg += `🌐 *Manage Vault & Reports:* https://medicaresync.health/vault\n\n`;
    msg += `_Thank you for choosing Medicare Sync. Wishing you good health!_`;

    return msg;
  },

  /**
   * Helper to format YYYY-MM-DD into a human-friendly format
   */
  formatReadableDate(dateStr) {
    if (!dateStr) return 'Scheduled Date';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  },

  /**
   * Generates wa.me deep link URL
   * @param {string} phone - Patient's phone number
   * @param {string} text - Message body
   */
  getWhatsAppUrl(phone, text) {
    // Clean phone number
    let cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    const encodedText = encodeURIComponent(text);
    if (cleanPhone) {
      return `https://wa.me/${cleanPhone}?text=${encodedText}`;
    }
    return `https://wa.me/?text=${encodedText}`;
  },

  /**
   * Open WhatsApp in a new tab
   */
  sendWhatsApp(appointment) {
    const text = this.generateMessage(appointment);
    const url = this.getWhatsAppUrl(appointment.patient.phone, text);
    window.open(url, '_blank');
  },

  /**
   * Copy confirmation text to clipboard
   */
  async copyToClipboard(appointment) {
    const text = this.generateMessage(appointment);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      if (window.showToast) {
        window.showToast("WhatsApp confirmation message copied to clipboard!", "success");
      }
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      if (window.showToast) {
        window.showToast("Failed to copy to clipboard", "error");
      }
      return false;
    }
  }
};
