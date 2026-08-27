/**
 * CourseNexus - Interactive Portal & Student Lead Engine
 * Core Application Logic
 */

// Application State
const state = {
  currentCategory: 'all',
  searchQuery: '',
  selectedCourseForPlayer: null,
  activeLesson: null,
  selectedCourseForCheckout: null,
  appliedScholarshipCode: null,
  scholarshipDiscountAmount: 0,
  quiz: {
    currentQuestionIndex: 0,
    answers: {},
    isSubmitted: false,
    score: 0,
    timeRemaining: 180, // 3 minutes in seconds
    timerInterval: null
  },
  checkout: {
    paymentMethod: 'upi',
    selectedEmiMonths: 6,
    timerSeconds: 899 // 14m 59s
  }
};

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initLucide();
  initCategoryPills();
  renderCourses();
  initStats();
  initTestimonials();
  initHiringPartners();
  initFaqs();
  initScholarshipTimer();
  initQuiz();
  initLeadForm();
  initSocialProofToasts();
  setupEventListeners();
  loadStoredLeadsCount();
});

function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// -------------------------------------------------------------
// Category Filtering & Search
// -------------------------------------------------------------
function initCategoryPills() {
  const container = document.getElementById('categoryPillsContainer');
  if (!container) return;

  container.innerHTML = COURSE_CATEGORIES.map(cat => `
    <button
      onclick="setCategory('${cat.id}')"
      class="tab-pill px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 border transition-all ${
        state.currentCategory === cat.id
          ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25'
          : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
      }">
      <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
      <span>${cat.name}</span>
    </button>
  `).join('');

  initLucide();
}

window.setCategory = function(catId) {
  state.currentCategory = catId;
  initCategoryPills();
  renderCourses();
};

window.handleCourseSearch = function(query) {
  state.searchQuery = query.toLowerCase().trim();
  renderCourses();
};

// -------------------------------------------------------------
// Course Catalog Rendering
// -------------------------------------------------------------
function renderCourses() {
  const grid = document.getElementById('courseGrid');
  const countBadge = document.getElementById('courseCountBadge');
  if (!grid) return;

  const filtered = COURSES_DATA.filter(course => {
    const matchesCategory = state.currentCategory === 'all' || course.category === state.currentCategory;
    const matchesSearch = !state.searchQuery || 
      course.title.toLowerCase().includes(state.searchQuery) ||
      course.overview.toLowerCase().includes(state.searchQuery) ||
      course.instructor.name.toLowerCase().includes(state.searchQuery) ||
      course.toolsCovered.some(t => t.toLowerCase().includes(state.searchQuery));
    return matchesCategory && matchesSearch;
  });

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} Programs`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-2xl border border-slate-800">
        <i data-lucide="search-x" class="w-12 h-12 text-slate-500 mx-auto mb-3"></i>
        <h3 class="text-xl font-bold text-white mb-1">No courses found matching "${state.searchQuery}"</h3>
        <p class="text-slate-400 text-sm mb-4">Try searching for keywords like "Full-Stack", "AI", "UPSC", "Design", or "Figma"</p>
        <button onclick="clearSearch()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">
          Reset Filter
        </button>
      </div>
    `;
    initLucide();
    return;
  }

  grid.innerHTML = filtered.map(course => `
    <div class="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 glass-card-hover flex flex-col justify-between relative group">
      ${course.badge.includes('Bestseller') ? `<div class="ribbon-bestseller">BESTSELLER</div>` : ''}
      
      <!-- Top Card Header -->
      <div class="p-6 pb-4">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 flex items-center gap-1.5">
            <span class="pulse-live-dot"></span>
            ${course.categoryLabel}
          </span>
          <div class="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
            <span>${course.rating}</span>
            <span class="text-slate-400 font-normal">(${course.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        <h3 class="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          ${course.title}
        </h3>

        <p class="text-slate-400 text-xs mb-4 line-clamp-2 leading-relaxed">
          ${course.overview}
        </p>

        <!-- Instructor Row -->
        <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 mb-4">
          <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="w-10 h-10 rounded-full object-cover border border-indigo-500/30">
          <div class="min-w-0 flex-1">
            <div class="text-xs font-bold text-white flex items-center gap-1">
              ${course.instructor.name}
              <i data-lucide="badge-check" class="w-3.5 h-3.5 text-blue-400 fill-blue-400/20"></i>
            </div>
            <div class="text-[11px] text-slate-400 truncate">${course.instructor.role}</div>
          </div>
        </div>

        <!-- Key Meta -->
        <div class="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4">
          <div class="flex items-center gap-1.5 bg-slate-900/40 p-2 rounded-lg border border-slate-800/40">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-indigo-400"></i>
            <span class="truncate">${course.duration}</span>
          </div>
          <div class="flex items-center gap-1.5 bg-slate-900/40 p-2 rounded-lg border border-slate-800/40">
            <i data-lucide="monitor-play" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span class="truncate">${course.format.split('+')[0]}</span>
          </div>
        </div>

        <!-- Tool Badges -->
        <div class="flex flex-wrap gap-1.5 mb-4">
          ${course.toolsCovered.slice(0, 4).map(tool => `
            <span class="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-mono">
              ${tool}
            </span>
          `).join('')}
          ${course.toolsCovered.length > 4 ? `
            <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800/50 text-slate-400">
              +${course.toolsCovered.length - 4} more
            </span>
          ` : ''}
        </div>

        <div class="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium mb-1">
          <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
          <span>${course.nextBatchDate}</span>
        </div>
      </div>

      <!-- Card Footer & Pricing / CTA -->
      <div class="p-6 pt-4 bg-slate-950/60 border-t border-slate-800/60">
        <div class="flex items-baseline justify-between mb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-extrabold text-white font-heading">₹${course.price.discounted.toLocaleString('en-IN')}</span>
              <span class="text-sm text-slate-500 line-through">₹${course.price.original.toLocaleString('en-IN')}</span>
            </div>
            <div class="text-[11px] text-indigo-400 font-medium flex items-center gap-1">
              <i data-lucide="credit-card" class="w-3 h-3"></i>
              No-Cost EMI from ₹${course.price.emiPerMonth.toLocaleString('en-IN')}/mo
            </div>
          </div>
          <span class="px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            ${Math.round((1 - course.price.discounted / course.price.original) * 100)}% OFF
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button 
            onclick="openVideoPlayerModal('${course.id}')"
            class="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-white border border-indigo-900/50 flex items-center justify-center gap-1.5 transition-all">
            <i data-lucide="play-circle" class="w-4 h-4 text-indigo-400"></i>
            <span>Preview & Syllabus</span>
          </button>
          <button 
            onclick="openCheckoutModal('${course.id}')"
            class="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-1.5 transition-all">
            <i data-lucide="zap" class="w-4 h-4 text-amber-300 fill-amber-300"></i>
            <span>Enroll Now</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  initLucide();
}

window.clearSearch = function() {
  state.searchQuery = '';
  state.currentCategory = 'all';
  const searchInput = document.getElementById('courseSearchInput');
  if (searchInput) searchInput.value = '';
  initCategoryPills();
  renderCourses();
};

// -------------------------------------------------------------
// Interactive Video Player & Curriculum Drawer Modal
// -------------------------------------------------------------
window.openVideoPlayerModal = function(courseId) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) return;

  state.selectedCourseForPlayer = course;
  const firstPreviewLesson = course.syllabus[0]?.lessons[0] || null;
  state.activeLesson = firstPreviewLesson;

  const modal = document.getElementById('videoPlayerModal');
  const modalContent = document.getElementById('videoPlayerModalContent');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = renderVideoPlayerHTML(course);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  initLucide();
  setupVideoPlayerControls();
};

window.closeVideoPlayerModal = function() {
  const modal = document.getElementById('videoPlayerModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  const video = document.getElementById('activeLessonVideo');
  if (video) video.pause();
};

function renderVideoPlayerHTML(course) {
  const activeLesson = state.activeLesson;

  return `
    <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl modal-container">
      
      <!-- Top Modal Header -->
      <div class="p-4 px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <i data-lucide="graduation-cap" class="w-5 h-5"></i>
          </span>
          <div>
            <h2 class="text-base font-bold text-white truncate max-w-xl">${course.title}</h2>
            <div class="text-xs text-slate-400 flex items-center gap-2">
              <span>Mentor: <strong class="text-slate-200">${course.instructor.name}</strong></span>
              <span>•</span>
              <span class="text-amber-400 font-semibold flex items-center gap-0.5">
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i> ${course.rating}
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="openCheckoutModal('${course.id}')" class="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30">
            <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-300 fill-amber-300"></i>
            Enroll Now (₹${course.price.discounted.toLocaleString('en-IN')})
          </button>
          <button onclick="closeVideoPlayerModal()" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <!-- Main Player Grid (Video Player Left, Curriculum Drawer Right) -->
      <div class="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        <!-- Left: Video Player & Lesson Notes -->
        <div class="lg:col-span-8 p-4 lg:p-6 overflow-y-auto border-r border-slate-800 flex flex-col">
          
          <!-- Video Container -->
          <div class="video-aspect-box rounded-xl border border-slate-800 shadow-2xl relative mb-4 group">
            <video 
              id="activeLessonVideo" 
              src="${activeLesson?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}" 
              poster="${activeLesson?.videoThumbnail || ''}"
              class="w-full h-full object-cover"
              controls>
            </video>
          </div>

          <!-- Video Title & Meta Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between gap-2 mb-1">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  FREE PREVIEW LESSON
                </span>
                <span class="text-xs text-slate-400 flex items-center gap-1">
                  <i data-lucide="clock" class="w-3 h-3"></i> ${activeLesson?.duration || '25 min'}
                </span>
              </div>
              <button onclick="triggerDoubtWhatsapp('${course.title}', '${activeLesson?.title}')" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Ask Mentor on WhatsApp
              </button>
            </div>
            <h3 id="currentLessonTitle" class="text-lg font-bold text-white">
              ${activeLesson?.title || 'Lesson Preview'}
            </h3>
            <p id="currentLessonSummary" class="text-xs text-slate-300 mt-1 leading-relaxed">
              ${activeLesson?.summary || course.overview}
            </p>
          </div>

          <!-- Takeaways & Highlights -->
          <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-4">
            <h4 class="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-4 h-4"></i> What You Learn in This Session:
            </h4>
            <ul id="lessonTakeawaysList" class="space-y-1.5 text-xs text-slate-300">
              ${(activeLesson?.keyTakeaways || course.highlights).map(t => `
                <li class="flex items-start gap-2">
                  <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0"></i>
                  <span>${t}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Syllabus Download & Batch Details CTA -->
          <div class="mt-auto pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button onclick="downloadSyllabusPDF('${course.id}')" class="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2">
              <i data-lucide="download" class="w-4 h-4 text-indigo-400"></i>
              Download Full Syllabus PDF (with Schedule)
            </button>
            <div class="text-xs text-slate-400">
              <span class="text-emerald-400 font-semibold">${course.enrolledCount.toLocaleString()}</span> students already registered
            </div>
          </div>
        </div>

        <!-- Right: Curriculum Accordion Drawer -->
        <div class="lg:col-span-4 bg-slate-950 p-4 lg:p-6 overflow-y-auto flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="list-video" class="w-4 h-4 text-indigo-400"></i> Course Curriculum
            </h3>
            <span class="text-[11px] text-slate-400">${course.syllabus.length} Modules</span>
          </div>

          <!-- Modules List -->
          <div class="space-y-3 flex-1 overflow-y-auto pr-1">
            ${course.syllabus.map((mod, modIdx) => `
              <div class="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden">
                <div class="p-3 bg-slate-900 flex items-center justify-between cursor-pointer" onclick="toggleModuleDrawer('mod-${modIdx}')">
                  <div class="min-w-0 pr-2">
                    <div class="text-xs font-bold text-slate-200 truncate">${mod.title}</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">${mod.duration}</div>
                  </div>
                  <i data-lucide="chevron-down" id="icon-mod-${modIdx}" class="w-4 h-4 text-slate-400 transition-transform"></i>
                </div>

                <div id="content-mod-${modIdx}" class="divide-y divide-slate-800/60">
                  ${mod.lessons.map((lesson, lesIdx) => `
                    <div 
                      onclick="${lesson.isFreePreview ? `switchLesson('${course.id}', ${modIdx}, ${lesIdx})` : `triggerLockedAlert('${lesson.title}', '${course.id}')`}"
                      class="p-3 text-xs flex items-center justify-between gap-2 hover:bg-slate-800/50 cursor-pointer transition-colors ${state.activeLesson?.title === lesson.title ? 'bg-indigo-950/40 border-l-2 border-indigo-500' : ''}">
                      <div class="flex items-start gap-2 min-w-0">
                        <i data-lucide="${lesson.isFreePreview ? (state.activeLesson?.title === lesson.title ? 'play' : 'play-circle') : 'lock'}" 
                           class="w-4 h-4 mt-0.5 shrink-0 ${lesson.isFreePreview ? 'text-indigo-400' : 'text-slate-600'}"></i>
                        <div class="min-w-0">
                          <p class="font-medium truncate ${lesson.isFreePreview ? 'text-slate-200' : 'text-slate-400'}">${lesson.title}</p>
                          <span class="text-[10px] text-slate-500">${lesson.duration}</span>
                        </div>
                      </div>
                      ${lesson.isFreePreview ? `
                        <span class="px-2 py-0.5 text-[9px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap">
                          FREE
                        </span>
                      ` : `
                        <span class="px-2 py-0.5 text-[9px] font-medium rounded bg-slate-800 text-slate-400 border border-slate-700 whitespace-nowrap flex items-center gap-1">
                          <i data-lucide="lock" class="w-2.5 h-2.5"></i> Locked
                        </span>
                      `}
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom Lock Notice -->
          <div class="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-800/40 text-center">
            <i data-lucide="sparkles" class="w-5 h-5 text-amber-400 mx-auto mb-1.5"></i>
            <h4 class="text-xs font-bold text-white mb-1">Unlock All Modules & Live Doubt Support</h4>
            <p class="text-[11px] text-slate-300 mb-2.5">Get instant access to assignments, cloud labs, and placement cohort.</p>
            <button onclick="openCheckoutModal('${course.id}')" class="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-md">
              Enroll for ₹${course.price.discounted.toLocaleString('en-IN')}
            </button>
          </div>

        </div>

      </div>
    </div>
  `;
}

window.toggleModuleDrawer = function(id) {
  const content = document.getElementById(`content-${id}`);
  const icon = document.getElementById(`icon-${id}`);
  if (!content) return;

  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    content.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(-90deg)';
  }
};

window.switchLesson = function(courseId, modIdx, lesIdx) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) return;

  const lesson = course.syllabus[modIdx]?.lessons[lesIdx];
  if (!lesson) return;

  state.activeLesson = lesson;
  const modalContent = document.getElementById('videoPlayerModalContent');
  if (modalContent) {
    modalContent.innerHTML = renderVideoPlayerHTML(course);
    initLucide();
    const video = document.getElementById('activeLessonVideo');
    if (video) {
      video.play().catch(() => {});
    }
  }
};

window.triggerLockedAlert = function(lessonTitle, courseId) {
  showToast(`🔒 "${lessonTitle}" is part of full enrollment. Complete your admission to unlock!`, 'info');
  openCheckoutModal(courseId);
};

window.downloadSyllabusPDF = function(courseId) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) return;

  showToast(`📥 Downloading detailed syllabus for ${course.title}...`, 'success');
  
  // Trigger generated syllabus download as readable text/pdf mock
  const syllabusContent = `
=====================================================
COURSENEXUS ACCREDITED SYLLABUS & CURRICULUM OVERVIEW
=====================================================
Course: ${course.title}
Track: ${course.categoryLabel}
Duration: ${course.duration}
Format: ${course.format}
Lead Instructor: ${course.instructor.name} (${course.instructor.role})
Next Batch Commencement: ${course.nextBatchDate}

KEY HIGHLIGHTS:
${course.highlights.map(h => `• ${h}`).join('\n')}

DETAILED MODULE BREAKDOWN:
${course.syllabus.map(m => `
[${m.title}]
Duration: ${m.duration}
Summary: ${m.summary}
Lessons:
${m.lessons.map(l => `  - ${l.title} (${l.duration}) [${l.isFreePreview ? 'Free Demo' : 'Enrolled Only'}]`).join('\n')}
`).join('\n')}

=====================================================
ADMISSIONS & COUNSELING HELPLINE:
WhatsApp: +91 98765 43210 | Email: admissions@coursenexus.in
Website: https://coursenexus.in
=====================================================
  `.trim();

  const blob = new Blob([syllabusContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${course.slug}-syllabus.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

window.triggerDoubtWhatsapp = function(courseName, lessonName) {
  const message = encodeURIComponent(`Hi CourseNexus Mentor Team, I was watching the demo for "${courseName}" - Lesson: "${lessonName}". I have a doubt and would like to speak to the counselor.`);
  window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
};

function setupVideoPlayerControls() {
  // Can enhance video listener events if needed
}

// -------------------------------------------------------------
// Instant UPI & EMI Enrollment Modal (Razorpay Style)
// -------------------------------------------------------------
window.openCheckoutModal = function(courseId) {
  const course = COURSES_DATA.find(c => c.id === courseId) || COURSES_DATA[0];
  state.selectedCourseForCheckout = course;

  const modal = document.getElementById('checkoutModal');
  const modalContent = document.getElementById('checkoutModalContent');
  if (!modal || !modalContent) return;

  renderCheckoutView();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = 'auto';
};

function renderCheckoutView() {
  const course = state.selectedCourseForCheckout;
  if (!course) return;

  const modalContent = document.getElementById('checkoutModalContent');
  if (!modalContent) return;

  const basePrice = course.price.discounted;
  const gstWaiver = Math.round(basePrice * 0.18);
  const scholarshipDiscount = state.scholarshipDiscountAmount || 0;
  const finalPrice = Math.max(999, basePrice - scholarshipDiscount);

  modalContent.innerHTML = `
    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[94vh] flex flex-col shadow-2xl modal-container">
      
      <!-- Checkout Header Banner with Timer -->
      <div class="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-4 px-6 text-white flex items-center justify-between border-b border-indigo-700/50">
        <div class="flex items-center gap-2.5">
          <div class="p-2 bg-indigo-500/30 rounded-lg border border-indigo-400/40">
            <i data-lucide="shield-check" class="w-5 h-5 text-emerald-300"></i>
          </div>
          <div>
            <div class="text-xs font-semibold text-indigo-200">256-Bit SSL Encrypted Instant Admission</div>
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              CourseNexus Instant Checkout
              <span class="px-2 py-0.5 text-[10px] rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Verified</span>
            </h3>
          </div>
        </div>

        <!-- Live Countdown Timer -->
        <div class="bg-slate-950/60 px-3 py-1.5 rounded-xl border border-amber-500/40 flex items-center gap-2 text-right">
          <i data-lucide="flame" class="w-4 h-4 text-amber-400 animate-pulse"></i>
          <div>
            <div class="text-[9px] text-amber-300 font-bold uppercase tracking-wider">Scholarship Offer Ends</div>
            <div id="checkoutTimerDisplay" class="text-xs font-mono font-extrabold text-amber-400">14:59</div>
          </div>
        </div>

        <button onclick="closeCheckoutModal()" class="p-2 rounded-xl bg-slate-900/40 hover:bg-slate-900 text-slate-300 hover:text-white">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Main Checkout Body -->
      <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <!-- Left: Course Summary & Pricing Breakdown -->
        <div class="md:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
              ${course.categoryLabel}
            </span>
            <h4 class="text-sm font-bold text-white mt-2 mb-1">${course.title}</h4>
            <p class="text-[11px] text-slate-400 mb-3">${course.duration} • Next Batch: ${course.nextBatchDate.split(':')[1] || 'Upcoming'}</p>

            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800/80 mb-4 space-y-1.5 text-xs">
              <div class="flex justify-between text-slate-400">
                <span>Standard Fee</span>
                <span class="line-through">₹${course.price.original.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Early Bird Direct Admission</span>
                <span>₹${basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-emerald-400">
                <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3 h-3"></i> 18% GST Waiver Promo</span>
                <span>-₹${gstWaiver.toLocaleString('en-IN')} (Free)</span>
              </div>
              ${scholarshipDiscount > 0 ? `
                <div class="flex justify-between text-amber-400 font-semibold bg-amber-950/40 p-1.5 rounded border border-amber-800/40">
                  <span class="flex items-center gap-1"><i data-lucide="award" class="w-3 h-3"></i> Quiz Scholarship (${state.appliedScholarshipCode})</span>
                  <span>-₹${scholarshipDiscount.toLocaleString('en-IN')}</span>
                </div>
              ` : ''}
              <div class="pt-2 border-t border-slate-800 flex justify-between items-baseline font-bold text-white text-sm">
                <span>Total Amount Due</span>
                <span class="text-xl text-emerald-400 font-heading">₹${finalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <!-- Coupon Input -->
            <div class="mb-4">
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">Apply Scholarship / Partner Coupon</label>
              <div class="flex gap-2">
                <input 
                  type="text" 
                  id="couponInput" 
                  placeholder="e.g. SCHOLAR100 or NEXUS50" 
                  value="${state.appliedScholarshipCode || ''}"
                  class="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-indigo-500 font-mono">
                <button onclick="applyCouponCode()" class="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl">
                  Apply
                </button>
              </div>
              <div id="couponStatusMsg" class="text-[10px] mt-1 text-slate-400"></div>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
            <div class="flex items-center gap-2">
              <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i>
              <span>7-Day 100% Money-Back Guarantee</span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i>
              <span>Instant LMS Access & WhatsApp Group Link</span>
            </div>
          </div>
        </div>

        <!-- Right: Payment Method Selector & Instant Execution -->
        <div class="md:col-span-7 flex flex-col justify-between">
          
          <div>
            <!-- Payment Methods Tabs -->
            <div class="grid grid-cols-3 gap-2 mb-4 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button 
                onclick="setPaymentMethod('upi')"
                class="py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  state.checkout.paymentMethod === 'upi' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }">
                <i data-lucide="qr-code" class="w-3.5 h-3.5"></i> Instant UPI
              </button>
              <button 
                onclick="setPaymentMethod('emi')"
                class="py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  state.checkout.paymentMethod === 'emi' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }">
                <i data-lucide="credit-card" class="w-3.5 h-3.5"></i> No-Cost EMI
              </button>
              <button 
                onclick="setPaymentMethod('card')"
                class="py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  state.checkout.paymentMethod === 'card' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }">
                <i data-lucide="wallet" class="w-3.5 h-3.5"></i> Cards / NetBank
              </button>
            </div>

            <!-- Tab Content: Instant UPI -->
            ${state.checkout.paymentMethod === 'upi' ? `
              <div class="space-y-4">
                <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div class="qr-frame shrink-0 bg-white p-2.5 rounded-xl shadow-lg">
                    <!-- Dynamic simulated QR Code -->
                    <svg viewBox="0 0 100 100" class="w-24 h-24 text-slate-950 fill-current">
                      <rect width="100" height="100" fill="white" />
                      <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#0f172a" />
                      <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#0f172a" />
                      <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#0f172a" />
                      <rect x="45" y="10" width="8" height="8" fill="#6366f1" />
                      <rect x="45" y="25" width="8" height="15" fill="#0f172a" />
                      <rect x="45" y="45" width="10" height="10" fill="#6366f1" />
                      <rect x="60" y="45" width="15" height="8" fill="#0f172a" />
                      <rect x="60" y="60" width="8" height="20" fill="#0f172a" />
                      <rect x="75" y="60" width="15" height="15" fill="#6366f1" />
                      <rect x="45" y="75" width="10" height="15" fill="#0f172a" />
                      <rect x="25" y="45" width="15" height="8" fill="#0f172a" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-white mb-1">Scan & Pay with any UPI App</div>
                    <p class="text-[11px] text-slate-400 mb-2">Google Pay, PhonePe, Paytm, BHIM, CRED</p>
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-[11px] font-mono text-indigo-300">
                      <span>UPI ID: <strong>coursenexus@icici</strong></span>
                      <i data-lucide="copy" class="w-3 h-3 cursor-pointer" onclick="copyUpiId()"></i>
                    </div>
                  </div>
                </div>

                <!-- UPI App Direct Buttons -->
                <div class="grid grid-cols-3 gap-2 text-xs font-medium">
                  <button onclick="processInstantPayment('Google Pay')" class="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center justify-center gap-2">
                    <span class="font-bold text-blue-400">G</span>Pay
                  </button>
                  <button onclick="processInstantPayment('PhonePe')" class="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center justify-center gap-2">
                    <span class="font-bold text-purple-400">Phone</span>Pe
                  </button>
                  <button onclick="processInstantPayment('Paytm UPI')" class="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center justify-center gap-2">
                    <span class="font-bold text-cyan-400">Pay</span>tm
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- Tab Content: No-Cost EMI Calculator -->
            ${state.checkout.paymentMethod === 'emi' ? `
              <div class="space-y-3">
                <div class="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Select No-Cost EMI Duration:</span>
                  <span class="text-emerald-400 font-bold">0% Interest • 0 Processing Fee</span>
                </div>
                
                <div class="grid grid-cols-3 gap-2">
                  ${[3, 6, 12].map(months => {
                    const monthlyEmi = Math.round(finalPrice / months);
                    const isSelected = state.checkout.selectedEmiMonths === months;
                    return `
                      <div 
                        onclick="setEmiMonths(${months})"
                        class="p-3 rounded-xl border cursor-pointer text-center transition-all ${
                          isSelected ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }">
                        <div class="text-xs font-bold ${isSelected ? 'text-indigo-300' : 'text-slate-300'}">${months} Months EMI</div>
                        <div class="text-sm font-extrabold text-white mt-1">₹${monthlyEmi.toLocaleString('en-IN')}<span class="text-[10px] font-normal text-slate-400">/mo</span></div>
                        <div class="text-[9px] text-emerald-400 mt-0.5">Total: ₹${finalPrice.toLocaleString('en-IN')}</div>
                      </div>
                    `;
                  }).join('')}
                </div>

                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div class="text-[11px] font-bold text-slate-300 mb-2">Supported Banking & NBFC Partners:</div>
                  <div class="flex flex-wrap gap-2 text-[10px] text-slate-400">
                    <span class="px-2 py-1 bg-slate-900 rounded border border-slate-800">HDFC Bank</span>
                    <span class="px-2 py-1 bg-slate-900 rounded border border-slate-800">ICICI Bank</span>
                    <span class="px-2 py-1 bg-slate-900 rounded border border-slate-800">State Bank of India</span>
                    <span class="px-2 py-1 bg-slate-900 rounded border border-slate-800">Axis Bank</span>
                    <span class="px-2 py-1 bg-slate-900 rounded border border-slate-800">Bajaj Finserv No-Cost Card</span>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- Tab Content: Credit/Debit & NetBanking -->
            ${state.checkout.paymentMethod === 'card' ? `
              <div class="space-y-3">
                <div>
                  <label class="block text-[11px] text-slate-300 mb-1">Card Number</label>
                  <input type="text" placeholder="4532 •••• •••• 8892" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500">
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="block text-[11px] text-slate-300 mb-1">Expiry Date (MM/YY)</label>
                    <input type="text" placeholder="08/28" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500">
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-300 mb-1">CVV</label>
                    <input type="password" placeholder="•••" maxlength="3" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500">
                  </div>
                </div>
                <div>
                  <label class="block text-[11px] text-slate-300 mb-1">Cardholder Name</label>
                  <input type="text" placeholder="e.g. Rahul Sharma" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Bottom Action Button -->
          <div class="mt-6 pt-4 border-t border-slate-800">
            <button 
              id="confirmPaymentBtn"
              onclick="executeEnrollment()"
              class="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all">
              <i data-lucide="lock" class="w-4 h-4"></i>
              <span>Pay & Complete Admission • ₹${finalPrice.toLocaleString('en-IN')}</span>
            </button>
            <div class="text-center text-[10px] text-slate-500 mt-2">
              🔒 Instant Access Credentials & Receipt will be delivered to your WhatsApp & Email.
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  initLucide();
}

window.setPaymentMethod = function(method) {
  state.checkout.paymentMethod = method;
  renderCheckoutView();
};

window.setEmiMonths = function(months) {
  state.checkout.selectedEmiMonths = months;
  renderCheckoutView();
};

window.copyUpiId = function() {
  navigator.clipboard.writeText('coursenexus@icici');
  showToast('📋 UPI ID copied to clipboard: coursenexus@icici', 'success');
};

window.applyCouponCode = function() {
  const input = document.getElementById('couponInput');
  const msg = document.getElementById('couponStatusMsg');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast('Please enter a coupon code', 'error');
    return;
  }

  if (code === 'SCHOLAR100' || code === 'NEXUS50' || code === 'SUPER30') {
    state.appliedScholarshipCode = code;
    state.scholarshipDiscountAmount = state.selectedCourseForCheckout?.price.scholarshipDiscount || 3000;
    showToast(`🎉 Coupon "${code}" Applied! ₹${state.scholarshipDiscountAmount} Instant Scholarship Discount`, 'success');
    renderCheckoutView();
  } else {
    showToast(`❌ Invalid coupon code "${code}". Try SCHOLAR100 or take the Mock Test!`, 'error');
    if (msg) msg.innerHTML = `<span class="text-rose-400">Coupon "${code}" is expired or invalid. Take the Mock Test to earn a valid coupon!</span>`;
  }
};

window.processInstantPayment = function(appName) {
  showToast(`⚡ Redirecting to ${appName} UPI Intent...`, 'info');
  setTimeout(() => {
    executeEnrollment();
  }, 1200);
};

window.executeEnrollment = function() {
  const btn = document.getElementById('confirmPaymentBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Processing Secure Payment via Razorpay...`;
    initLucide();
  }

  setTimeout(() => {
    const course = state.selectedCourseForCheckout;
    const finalPrice = Math.max(999, course.price.discounted - state.scholarshipDiscountAmount);
    const enrollmentRecord = {
      id: 'NEX-' + Math.floor(100000 + Math.random() * 900000),
      courseId: course.id,
      courseTitle: course.title,
      amount: finalPrice,
      paymentMethod: state.checkout.paymentMethod.toUpperCase(),
      date: new Date().toISOString(),
      studentName: 'Candidate ' + Math.floor(100 + Math.random() * 900),
      status: 'CONFIRMED'
    };

    // Save to local storage
    const stored = JSON.parse(localStorage.getItem('coursenexus_enrollments') || '[]');
    stored.unshift(enrollmentRecord);
    localStorage.setItem('coursenexus_enrollments', JSON.stringify(stored));

    // Trigger Confetti Celebration
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    renderEnrollmentSuccessModal(enrollmentRecord, course);
  }, 1800);
};

function renderEnrollmentSuccessModal(record, course) {
  const modalContent = document.getElementById('checkoutModalContent');
  if (!modalContent) return;

  modalContent.innerHTML = `
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-xl w-full text-center shadow-2xl modal-container">
      <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
        <i data-lucide="check-circle-2" class="w-8 h-8"></i>
      </div>

      <span class="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        ADMISSION CONFIRMED
      </span>

      <h3 class="text-2xl font-black text-white mt-3 mb-1 font-heading">Welcome to the Cohort!</h3>
      <p class="text-xs text-slate-300 mb-6">
        Your enrollment in <strong class="text-white">${course.title}</strong> has been successfully registered.
      </p>

      <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs mb-6">
        <div class="flex justify-between text-slate-400">
          <span>Student Enrollment ID:</span>
          <span class="font-mono text-white font-bold">${record.id}</span>
        </div>
        <div class="flex justify-between text-slate-400">
          <span>Batch Commencement:</span>
          <span class="text-emerald-400 font-semibold">${course.nextBatchDate}</span>
        </div>
        <div class="flex justify-between text-slate-400">
          <span>Amount Paid:</span>
          <span class="text-white font-bold">₹${record.amount.toLocaleString('en-IN')} (${record.paymentMethod})</span>
        </div>
        <div class="flex justify-between text-slate-400">
          <span>LMS Portal URL:</span>
          <span class="text-indigo-400 font-mono">lms.coursenexus.in</span>
        </div>
      </div>

      <div class="space-y-3">
        <a 
          href="https://chat.whatsapp.com/sample-cohort-invite" 
          target="_blank"
          class="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30">
          <i data-lucide="message-circle" class="w-4 h-4"></i> Join Private WhatsApp Batch Group
        </a>
        <button 
          onclick="closeCheckoutModal()"
          class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">
          Back to Course Catalog
        </button>
      </div>
    </div>
  `;

  initLucide();
}

// -------------------------------------------------------------
// Interactive Mock Test / Quiz Simulator
// -------------------------------------------------------------
function initQuiz() {
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quizQuestionContainer');
  const progressText = document.getElementById('quizProgressText');
  const progressBar = document.getElementById('quizProgressBar');
  if (!container) return;

  const currentIdx = state.quiz.currentQuestionIndex;
  const q = QUIZ_QUESTIONS[currentIdx];

  if (progressText) {
    progressText.textContent = `Question ${currentIdx + 1} of ${QUIZ_QUESTIONS.length}`;
  }
  if (progressBar) {
    progressBar.style.width = `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`;
  }

  container.innerHTML = `
    <div class="mb-4">
      <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
        ${q.category}
      </span>
      <h4 class="text-base font-bold text-white mt-3 leading-snug">${q.question}</h4>
    </div>

    <div class="space-y-2.5 mb-6">
      ${q.options.map((opt, optIdx) => {
        const isSelected = state.quiz.answers[q.id] === optIdx;
        return `
          <div 
            onclick="selectQuizOption(${q.id}, ${optIdx})"
            class="quiz-option-card p-3.5 rounded-xl border bg-slate-900/80 border-slate-800 flex items-center justify-between gap-3 text-xs ${
              isSelected ? 'selected' : ''
            }">
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }">
                ${String.fromCharCode(65 + optIdx)}
              </span>
              <span class="text-slate-200 font-medium">${opt.text}</span>
            </div>
            ${isSelected ? `<i data-lucide="check" class="w-4 h-4 text-indigo-400 shrink-0"></i>` : ''}
          </div>
        `;
      }).join('')}
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-slate-800">
      <button 
        onclick="prevQuizQuestion()" 
        ${currentIdx === 0 ? 'disabled' : ''}
        class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed">
        Previous
      </button>

      ${currentIdx < QUIZ_QUESTIONS.length - 1 ? `
        <button 
          onclick="nextQuizQuestion()"
          class="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-1.5">
          Next Question <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      ` : `
        <button 
          onclick="submitQuizAssessment()"
          class="px-6 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
          <i data-lucide="award" class="w-4 h-4"></i> Submit & Calculate Scholarship
        </button>
      `}
    </div>
  `;

  initLucide();
}

window.selectQuizOption = function(questionId, optionIndex) {
  state.quiz.answers[questionId] = optionIndex;
  renderQuizQuestion();
};

window.nextQuizQuestion = function() {
  if (state.quiz.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
    state.quiz.currentQuestionIndex++;
    renderQuizQuestion();
  }
};

window.prevQuizQuestion = function() {
  if (state.quiz.currentQuestionIndex > 0) {
    state.quiz.currentQuestionIndex--;
    renderQuizQuestion();
  }
};

window.submitQuizAssessment = function() {
  let score = 0;
  QUIZ_QUESTIONS.forEach(q => {
    const selectedIdx = state.quiz.answers[q.id];
    if (selectedIdx !== undefined && q.options[selectedIdx]?.isCorrect) {
      score++;
    }
  });

  state.quiz.score = score;
  state.quiz.isSubmitted = true;

  const container = document.getElementById('quizQuestionContainer');
  if (!container) return;

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const scholarshipCode = score >= 2 ? 'SCHOLAR100' : 'NEXUS50';
  const scholarshipDiscount = score >= 2 ? '₹3,500' : '₹2,000';

  if (window.confetti) {
    window.confetti({ particleCount: 90, spread: 60, origin: { y: 0.7 } });
  }

  container.innerHTML = `
    <div class="text-center py-4">
      <div class="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="trophy" class="w-8 h-8"></i>
      </div>

      <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
        ASSESSMENT RESULT: ${score} / ${QUIZ_QUESTIONS.length} (${percentage}%)
      </span>

      <h4 class="text-xl font-bold text-white mt-3 mb-1 font-heading">
        ${score === 3 ? 'Outstanding Aptitude! Top 5% Percentile' : score === 2 ? 'Great Job! Solid Foundation' : 'Good Effort! Skill Acceleration Recommended'}
      </h4>
      <p class="text-xs text-slate-300 max-w-md mx-auto mb-6">
        Based on your assessment performance, you have unlocked an exclusive merit scholarship for all CourseNexus career tracks.
      </p>

      <!-- Unlocked Scholarship Coupon Box -->
      <div class="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-amber-500/40 max-w-md mx-auto mb-6 text-left">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[11px] font-bold text-amber-400 flex items-center gap-1">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> UNLOCKED SCHOLARSHIP CODE
          </span>
          <span class="text-xs font-extrabold text-emerald-400">${scholarshipDiscount} OFF</span>
        </div>
        <div class="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span class="font-mono text-sm font-black text-white tracking-widest">${scholarshipCode}</span>
          <button onclick="copyCouponFromQuiz('${scholarshipCode}')" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
            <i data-lucide="copy" class="w-3 h-3"></i> Apply Code
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <button onclick="openCheckoutModal('fswd-ai-pro')" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30">
          Claim Scholarship & Enroll Now
        </button>
        <button onclick="resetQuiz()" class="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">
          Retake Assessment
        </button>
      </div>
    </div>
  `;

  initLucide();
};

window.copyCouponFromQuiz = function(code) {
  state.appliedScholarshipCode = code;
  state.scholarshipDiscountAmount = code === 'SCHOLAR100' ? 3500 : 2000;
  showToast(`🎉 Scholarship Code "${code}" copied & activated for checkout!`, 'success');
  openCheckoutModal('fswd-ai-pro');
};

window.resetQuiz = function() {
  state.quiz.currentQuestionIndex = 0;
  state.quiz.answers = {};
  state.quiz.isSubmitted = false;
  state.quiz.score = 0;
  renderQuizQuestion();
};

// -------------------------------------------------------------
// Student Lead Capture & Free Counseling Engine
// -------------------------------------------------------------
function initLeadForm() {
  const leadForm = document.getElementById('careerCounselingForm');
  if (!leadForm) return;

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('leadFullName')?.value.trim();
    const phone = document.getElementById('leadPhone')?.value.trim();
    const email = document.getElementById('leadEmail')?.value.trim();
    const targetCareer = document.getElementById('leadTargetCareer')?.value;
    const gradYear = document.getElementById('leadGradYear')?.value;
    const preferredMode = document.getElementById('leadPreferredMode')?.value;

    if (!fullName || !phone || !email || !targetCareer) {
      showToast('Please fill all mandatory fields.', 'error');
      return;
    }

    const newLead = {
      id: 'LEAD-' + Math.floor(10000 + Math.random() * 90000),
      fullName,
      phone,
      email,
      targetCareer,
      gradYear,
      preferredMode,
      submittedAt: new Date().toISOString(),
      status: 'Pending Counselor Callback'
    };

    // Save lead to local storage
    const storedLeads = JSON.parse(localStorage.getItem('coursenexus_leads') || '[]');
    storedLeads.unshift(newLead);
    localStorage.setItem('coursenexus_leads', JSON.stringify(storedLeads));
    loadStoredLeadsCount();

    // Show Success Modal / Toast
    leadForm.reset();
    showLeadConfirmationModal(newLead);
  });
}

function showLeadConfirmationModal(lead) {
  const modal = document.getElementById('leadConfirmationModal');
  const modalContent = document.getElementById('leadConfirmationContent');
  if (!modal || !modalContent) {
    showToast(`✅ Counseling Request Booked! Counselor will call ${lead.phone} in 15 mins.`, 'success');
    return;
  }

  modalContent.innerHTML = `
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl modal-container">
      <div class="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="phone-call" class="w-7 h-7 animate-bounce"></i>
      </div>

      <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        COUNSELOR DISPATCHED
      </span>

      <h3 class="text-xl font-bold text-white mt-3 mb-1">1-on-1 Session Scheduled!</h3>
      <p class="text-xs text-slate-300 mb-4">
        Hi <strong class="text-white">${lead.fullName}</strong>, our Senior Career Advisor has received your details for 
        <span class="text-indigo-400 font-semibold">${lead.targetCareer}</span>.
      </p>

      <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 mb-5">
        <div class="flex justify-between text-slate-400">
          <span>Inquiry Ticket:</span>
          <span class="font-mono text-white font-bold">${lead.id}</span>
        </div>
        <div class="flex justify-between text-slate-400">
          <span>Expected Call Time:</span>
          <span class="text-amber-400 font-semibold">Within 15 Minutes (10 AM - 9 PM)</span>
        </div>
        <div class="flex justify-between text-slate-400">
          <span>WhatsApp Updates:</span>
          <span class="text-emerald-400 font-semibold">+91 ${lead.phone}</span>
        </div>
      </div>

      <div class="space-y-2">
        <a 
          href="https://wa.me/919876543210?text=Hi%20Counselor,%20I%20just%20submitted%20my%20lead%20request%20${lead.id}%20for%20${encodeURIComponent(lead.targetCareer)}"
          target="_blank"
          class="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2">
          <i data-lucide="message-circle" class="w-4 h-4"></i> Chat Directly on WhatsApp
        </a>
        <button 
          onclick="closeLeadModal()"
          class="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700">
          Done
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  initLucide();
}

window.closeLeadModal = function() {
  const modal = document.getElementById('leadConfirmationModal');
  if (modal) modal.classList.remove('active');
};

function loadStoredLeadsCount() {
  const stored = JSON.parse(localStorage.getItem('coursenexus_leads') || '[]');
  const badge = document.getElementById('adminLeadCountBadge');
  if (badge) {
    badge.textContent = `${stored.length} Leads`;
  }
}

// -------------------------------------------------------------
// Admin / Coaching Institute Leads Inspector Drawer
// -------------------------------------------------------------
window.openAdminLeadsDrawer = function() {
  const modal = document.getElementById('adminLeadsDrawer');
  const content = document.getElementById('adminLeadsList');
  if (!modal || !content) return;

  const leads = JSON.parse(localStorage.getItem('coursenexus_leads') || '[]');
  const enrollments = JSON.parse(localStorage.getItem('coursenexus_enrollments') || '[]');

  content.innerHTML = `
    <div class="mb-6 grid grid-cols-2 gap-4">
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-xs text-slate-400">Total Student Inquiries</div>
        <div class="text-2xl font-black text-white mt-1">${leads.length}</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-xs text-slate-400">Paid Enrollments (Local)</div>
        <div class="text-2xl font-black text-emerald-400 mt-1">${enrollments.length}</div>
      </div>
    </div>

    <div class="flex items-center justify-between mb-3">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">Recent Counseling Requests</h4>
      <button onclick="clearAllLeads()" class="text-[11px] text-rose-400 hover:underline">Clear History</button>
    </div>

    ${leads.length === 0 ? `
      <div class="text-center py-10 text-slate-500 text-xs">
        <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
        No leads captured yet. Submit the counseling form to test live capture!
      </div>
    ` : `
      <div class="space-y-2.5">
        ${leads.map(lead => `
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-white">${lead.fullName}</span>
              <span class="font-mono text-[10px] text-slate-500">${lead.id}</span>
            </div>
            <div class="text-indigo-400 font-medium mb-1">${lead.targetCareer} • Class/Grad: ${lead.gradYear || 'N/A'}</div>
            <div class="flex items-center justify-between text-slate-400 pt-2 border-t border-slate-800/80">
              <span class="flex items-center gap-1">
                <i data-lucide="phone" class="w-3 h-3 text-emerald-400"></i> +91 ${lead.phone}
              </span>
              <a 
                href="https://wa.me/91${lead.phone}?text=Hi%20${encodeURIComponent(lead.fullName)},%20calling%20from%20CourseNexus%20regarding%20your%20career%20inquiry."
                target="_blank"
                class="px-2.5 py-1 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold flex items-center gap-1">
                <i data-lucide="message-circle" class="w-3 h-3"></i> WhatsApp Lead
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;

  modal.classList.add('active');
  initLucide();
};

window.closeAdminLeadsDrawer = function() {
  const modal = document.getElementById('adminLeadsDrawer');
  if (modal) modal.classList.remove('active');
};

window.clearAllLeads = function() {
  localStorage.removeItem('coursenexus_leads');
  loadStoredLeadsCount();
  openAdminLeadsDrawer();
  showToast('Leads database reset successfully', 'info');
};

// -------------------------------------------------------------
// Live Scholarship Countdown Timer
// -------------------------------------------------------------
function initScholarshipTimer() {
  const timerBanner = document.getElementById('scholarshipCountdownBanner');
  let seconds = 14 * 60 + 59;

  setInterval(() => {
    seconds--;
    if (seconds <= 0) seconds = 15 * 60;

    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    if (timerBanner) {
      timerBanner.textContent = formatted;
    }
    const checkoutDisplay = document.getElementById('checkoutTimerDisplay');
    if (checkoutDisplay) {
      checkoutDisplay.textContent = formatted;
    }
  }, 1000);
}

// -------------------------------------------------------------
// Stats, Testimonials & FAQs
// -------------------------------------------------------------
function initStats() {
  const container = document.getElementById('statsContainer');
  if (!container) return;

  container.innerHTML = STATS_DATA.map(st => `
    <div class="glass-panel p-6 rounded-2xl border border-slate-800 text-center glass-card-hover">
      <div class="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="${st.icon}" class="w-5 h-5"></i>
      </div>
      <div class="text-3xl font-extrabold text-white font-heading mb-1">${st.value}</div>
      <div class="text-xs font-semibold text-slate-300 mb-1">${st.label}</div>
      <div class="text-[11px] text-emerald-400 font-medium">${st.change}</div>
    </div>
  `).join('');

  initLucide();
}

function initTestimonials() {
  const container = document.getElementById('testimonialsContainer');
  if (!container) return;

  container.innerHTML = PLACEMENT_STORIES.map(story => `
    <div class="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between glass-card-hover relative">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <img src="${story.avatar}" alt="${story.name}" class="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40">
          <div>
            <h4 class="text-sm font-bold text-white">${story.name}</h4>
            <p class="text-[11px] text-slate-400">${story.fromRole}</p>
          </div>
        </div>

        <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 mb-4">
          <div class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Placed At:</div>
          <div class="text-xs font-extrabold text-white mt-0.5">${story.toRole}</div>
          <div class="text-xs font-bold text-amber-400 mt-0.5">${story.package}</div>
        </div>

        <p class="text-xs text-slate-300 italic leading-relaxed">
          "${story.quote}"
        </p>
      </div>

      <div class="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span>Batch: <strong class="text-slate-300">${story.batch}</strong></span>
        <span class="px-2 py-0.5 rounded bg-slate-800 font-semibold text-slate-300">${story.companyLogo}</span>
      </div>
    </div>
  `).join('');

  initLucide();
}

function initHiringPartners() {
  const container = document.getElementById('hiringPartnersTrack');
  if (!container) return;

  // Duplicate for seamless loop
  const list = [...HIRING_PARTNERS, ...HIRING_PARTNERS, ...HIRING_PARTNERS];
  container.innerHTML = list.map(partner => `
    <div class="inline-flex items-center gap-2 px-5 py-2.5 mx-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-bold whitespace-nowrap">
      <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
      <span class="text-white">${partner.name}</span>
      <span class="text-slate-500 text-[10px] font-normal">(${partner.domain})</span>
    </div>
  `).join('');
}

function initFaqs() {
  const container = document.getElementById('faqsContainer');
  if (!container) return;

  container.innerHTML = FAQS_DATA.map((faq, idx) => `
    <div class="border border-slate-800 rounded-2xl bg-slate-900/60 overflow-hidden">
      <button 
        onclick="toggleFaq(${idx})" 
        class="w-full p-4 px-5 text-left font-semibold text-white text-sm flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
        <span>${faq.q}</span>
        <i data-lucide="chevron-down" id="faqIcon-${idx}" class="w-4 h-4 text-slate-400 transition-transform"></i>
      </button>
      <div id="faqAnswer-${idx}" class="hidden p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/40">
        ${faq.a}
      </div>
    </div>
  `).join('');

  initLucide();
}

window.toggleFaq = function(idx) {
  const ans = document.getElementById(`faqAnswer-${idx}`);
  const icon = document.getElementById(`faqIcon-${idx}`);
  if (!ans) return;

  if (ans.classList.contains('hidden')) {
    ans.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    ans.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
};

// -------------------------------------------------------------
// Real-time Social Proof Ticker & Notifications
// -------------------------------------------------------------
const SOCIAL_PROOF_EVENTS = [
  '⚡ Rahul from Bengaluru just enrolled in Full-Stack Web & AI Engineering',
  '🔥 Priya from Hyderabad booked a 1-on-1 counseling call',
  '🎯 Amit from Pune scored 100% in Aptitude Mock Test & unlocked ₹3,500 Scholarship',
  '🚀 Sneha from Delhi got placed at Swiggy as Product Designer (18 LPA)',
  '📚 Vikram from Patna registered for UPSC CSE Foundation Batch 11'
];

function initSocialProofToasts() {
  let idx = 0;
  setInterval(() => {
    const toast = document.getElementById('liveActivityToast');
    const text = document.getElementById('liveActivityText');
    if (!toast || !text) return;

    text.textContent = SOCIAL_PROOF_EVENTS[idx % SOCIAL_PROOF_EVENTS.length];
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4500);

    idx++;
  }, 12000);
}

// -------------------------------------------------------------
// Toast Notifications Engine
// -------------------------------------------------------------
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('globalToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-950 border-emerald-700 text-emerald-200'
           : type === 'error' ? 'bg-rose-950 border-rose-700 text-rose-200'
           : 'bg-slate-900 border-slate-700 text-slate-200';

  toast.className = `p-3 px-4 rounded-xl border text-xs font-semibold shadow-2xl flex items-center gap-2 transform transition-all duration-300 translate-y-4 opacity-0 ${bg}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

function setupEventListeners() {
  // Close modals on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoPlayerModal();
      closeCheckoutModal();
      closeLeadModal();
      closeAdminLeadsDrawer();
    }
  });
}
