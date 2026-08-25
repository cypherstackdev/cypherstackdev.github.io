document.addEventListener("DOMContentLoaded", () => {
  // 1. Typing Animation
  const words = [
    "Python Automation & Scraping Architect",
    "Full-Stack Software Engineer",
    "24/7 Cloud Pipeline Developer",
    "Data Intelligence & Reverse Engineering"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedElem = document.getElementById("typed-text");

  function typeEffect() {
    if (!typedElem) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typedElem.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElem.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // 2. Project Category Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
          setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => { card.style.display = "none"; }, 200);
        }
      });
    });
  });

  // 3. One-Click Copy Email
  const copyBtn = document.getElementById("copy-email-btn");
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3500);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.getAttribute("data-email") || "abhiroy.tcsdev@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast(`✓ Copied "${email}" to clipboard!`);
      });
    });
  }

  // 4. Project Inquiry Form Submission
  const inquiryForm = document.getElementById("inquiry-form");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const clientName = document.getElementById("client-name").value.trim();
      const clientEmail = document.getElementById("client-email").value.trim();
      const projectType = document.getElementById("project-type").value;
      const timeline = document.getElementById("project-timeline").value.trim() || "Flexible";
      const details = document.getElementById("project-details").value.trim();

      const subject = encodeURIComponent(`Project Inquiry: ${projectType} - ${clientName}`);
      const body = encodeURIComponent(
        `Hi,\n\nI would like to discuss a project with you.\n\n` +
        `Client/Organization: ${clientName}\n` +
        `Reply Email: ${clientEmail}\n` +
        `Project Category: ${projectType}\n` +
        `Timeline / Budget: ${timeline}\n\n` +
        `Project Requirements & Target URLs:\n${details}\n\n` +
        `Looking forward to your scope and proposal.`
      );

      // Open user email client
      window.location.href = `mailto:abhiroy.tcsdev@gmail.com?subject=${subject}&body=${body}`;
      showToast("🚀 Opening your email client to send inquiry...");
    });
  }

  // 5. Smooth Nav Link Highlighting on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
