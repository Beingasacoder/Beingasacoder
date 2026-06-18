// ============================================================
//  M UMAR FAROOQ PORTFOLIO — FIXED & ENHANCED SCRIPT
// ============================================================

// Dynamic State
let isDarkMode = true;
let isWhatsAppOpen = false;

// ── DOM Ready ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  const themeToggleBtn        = document.getElementById('theme-toggle');
  const themeToggleMobileBtn  = document.getElementById('theme-toggle-mobile');
  const menuToggleBtn         = document.getElementById('menu-toggle');
  const mobileDrawer          = document.getElementById('mobile-drawer');
  const loader                = document.getElementById('loader');
  const loadingBar            = document.getElementById('loading-bar');
  const toast                 = document.getElementById('toast');
  const toastMsg              = document.getElementById('toast-message');

  // ── Premium Loader ──────────────────────────────────────
  if (loader && loadingBar) {
    loadingBar.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('opacity-0');
      setTimeout(() => {
        loader.style.display = 'none';
        initializeScrollTrigger();
      }, 700);
    }, 2000);
  }

  // ── Mobile Menu Toggle ──────────────────────────────────
  if (menuToggleBtn && mobileDrawer) {
    menuToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Close mobile drawer on nav link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.add('hidden');
    });
  });

  // ── Theme Toggle ────────────────────────────────────────
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      document.body.style.backgroundColor = '#090D1A';
      document.body.style.color = '#F1F5F9';
      document.querySelectorAll('.theme-sun-icon, #theme-sun').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.theme-moon-icon, #theme-moon').forEach(el => el.classList.remove('hidden'));
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#1E293B';
      document.querySelectorAll('.theme-sun-icon, #theme-sun').forEach(el => el.classList.remove('hidden'));
      document.querySelectorAll('.theme-moon-icon, #theme-moon').forEach(el => el.classList.add('hidden'));
    }
  }

  if (themeToggleBtn)       themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

  // ── Nav Scroll Shadow ───────────────────────────────────
  window.addEventListener('scroll', () => {
    const header = document.getElementById('nav-header');
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.remove('py-5', 'border-transparent');
      header.classList.add('py-3', 'glass-panel', 'shadow-xl', 'shadow-indigo-950/10');
    } else {
      header.classList.add('py-5', 'border-transparent');
      header.classList.remove('py-3', 'glass-panel', 'shadow-xl', 'shadow-indigo-950/10');
    }
  });

  // ── Particle Canvas ─────────────────────────────────────
  const particleCanvas = document.getElementById('particle-canvas');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let width  = (particleCanvas.width  = window.innerWidth);
    let height = (particleCanvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(65, Math.floor(width / 20));
    let mousePosition = { x: null, y: null };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.baseColor = Math.random() > 0.5 ? '#6366F1' : '#8B5CF6';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width)  this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
        if (mousePosition.x && mousePosition.y) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100) { this.x -= dx * 0.01; this.y -= dy * 0.01; }
        }
      }
      draw() {
        ctx.fillStyle = isDarkMode ? this.baseColor + '2A' : this.baseColor + '1F';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function connectNodes() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * (isDarkMode ? 0.12 : 0.05);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectNodes();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('mousemove', e => { mousePosition.x = e.clientX; mousePosition.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mousePosition.x = null; mousePosition.y = null; });
    window.addEventListener('resize', () => {
      width  = particleCanvas.width  = window.innerWidth;
      height = particleCanvas.height = window.innerHeight;
    });
  }

  // ── Skill Meters (direct observer) ─────────────────────
  const meters = document.querySelectorAll('.skill-meter');
  if (meters.length) {
    const meterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-width');
          meterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    meters.forEach(m => meterObserver.observe(m));
  }

  // ── Toast helpers (expose globally) ────────────────────
  window.showToast = function(message) {
    const t  = document.getElementById('toast');
    const tm = document.getElementById('toast-message');
    if (!t || !tm) return;
    tm.innerText = message;
    t.classList.remove('hidden');
    t.classList.add('flex');
    setTimeout(window.dismissToast, 4500);
  };

  window.dismissToast = function() {
    const t = document.getElementById('toast');
    if (!t) return;
    t.classList.add('hidden');
    t.classList.remove('flex');
  };

}); // end DOMContentLoaded


// ── Scroll Trigger ─────────────────────────────────────────
function initializeScrollTrigger() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        // Trigger stats counter when stats banner becomes visible
        if (entry.target.classList.contains('stats-banner')) {
          animateCounts();
        }
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
}

// ── Stats Counter ──────────────────────────────────────────
function animateCounts() {
  const stats = [
    { id: 'stat-projects',   limit: 75 },
    { id: 'stat-clients',    limit: 40 },
    { id: 'stat-experience', limit: 4  }
  ];
  stats.forEach(stat => {
    const el = document.getElementById(stat.id);
    if (!el || el.dataset.animated) return;
    el.dataset.animated = 'true';
    let count = 0;
    const step = Math.ceil(stat.limit / 50);
    const timer = setInterval(() => {
      count += step;
      if (count >= stat.limit) {
        el.innerText = stat.limit + '+';
        clearInterval(timer);
      } else {
        el.innerText = count;
      }
    }, 40);
  });
}

// ── Portfolio Filter ───────────────────────────────────────
function filterPortfolio(category) {
  document.querySelectorAll('.portfolio-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.className = 'portfolio-filter-btn px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border border-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20';
    } else {
      btn.className = 'portfolio-filter-btn px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white';
    }
  });
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.display = (category === 'All' || item.getAttribute('data-cat') === category) ? 'flex' : 'none';
  });
}

// ── Project Modal Data ─────────────────────────────────────
const projectCases = [
  {
    title: 'Traveler Book',
    category: 'Mobile Apps',
    img: '✈️',
    accentColor: '#06B6D4',
    description: 'A full social media app for travelers — users can create posts, share travel destinations with photos, discover places worldwide, leave comments, and rate locations. Built with Flutter, Firebase Firestore, and Provider for state management.',
    screenshots: [
      'assets/images/traveler_splash.png',
      'assets/images/traveler_home.png',
      'assets/images/traveler_discover.png',
      'assets/images/traveler_signup.png',
      'assets/images/traveler_comments.png'
    ],
    features: [
      '✓ Firebase Auth — Email/Password + Google Sign-In',
      '✓ Real-time Firestore posts, comments & ratings',
      '✓ Discover screen with trending destinations & category filters',
      '✓ Provider state management with clean MVVM architecture',
      '✓ Search, notifications, liked posts & user profile system'
    ]
  },
  {
    title: 'Chachacha Restaurant',
    category: 'Mobile Apps',
    img: '🍽️',
    accentColor: '#F59E0B',
    description: 'A complete home delivery ordering app for Chachacha Restaurant, Bahawalpur. Customers can browse menu by category, view hot deals with discounts, add items to cart, and place orders. Integrated with Firebase & REST API for live menu and order management.',
    screenshots: [
      'assets/images/chacha_splash.webp',
      'assets/images/chacha_home.png',
      'assets/images/chacha_menu.png'
    ],
    features: [
      '✓ Animated splash screen with restaurant branding',
      '✓ Home delivery order flow with cart & checkout',
      '✓ Hot deals section with percentage discount badges',
      '✓ Menu categories: Burger, Pizza, Desi Food, Steaks & more',
      '✓ Firebase backend + REST API for real-time menu data',
      '✓ Provider state management — clean & scalable architecture'
    ]
  },
  {
    title: 'Service & Learning UI',
    category: 'UI/UX Design',
    img: '🎨',
    accentColor: '#A855F7',
    description: 'Two premium UI designs converted from Figma to Flutter pixel-perfect code. First: a Home Service Booking app with gradient branding, login/auth flow, and service categories. Second: a Kids Educational & Entertainment platform with subject browsing, games, tools, and a fun learning dashboard.',
    screenshots: [
      'assets/images/service_splash.png',
      'assets/images/service_login.png',
      'assets/images/entertain_home.png',
      'assets/images/entertain_tools.png'
    ],
    features: [
      '✓ Pixel-perfect Figma-to-Flutter implementation',
      '✓ Service App: gradient splash, social login (Google/Facebook/Apple)',
      '✓ Service App: purple/pink brand with clean form UI',
      '✓ Kids App: subject cards, games, tools & cartoon sections',
      '✓ Kids App: Drawing Pad, Voice Recorder, Flash Card, Calculator tools',
      '✓ Responsive layouts across all screen sizes'
    ]
  }
];

let currentModalScreenshot = 0;

function openProjectModal(index) {
  const data = projectCases[index];
  document.getElementById('modal-title').innerText       = data.title;
  document.getElementById('modal-category').innerText    = data.category;
  document.getElementById('modal-description').innerText = data.description;
  document.getElementById('modal-icon').innerText        = data.img;

  // Features list
  const list = document.getElementById('modal-features');
  list.innerHTML = '';
  data.features.forEach(f => {
    const li = document.createElement('li');
    li.className = 'flex items-start gap-2';
    li.innerHTML = '<span style="color:' + (data.accentColor||'#6366F1') + '">' + f.substring(0,1) + '</span><span>' + f.substring(1) + '</span>';
    list.appendChild(li);
  });

  // Screenshot gallery
  currentModalScreenshot = 0;
  const gallery = document.getElementById('modal-gallery');
  if (gallery && data.screenshots && data.screenshots.length > 0) {
    gallery.innerHTML = '';
    // Main image
    const mainImg = document.createElement('div');
    mainImg.id = 'modal-main-img-wrap';
    mainImg.className = 'relative rounded-2xl overflow-hidden bg-slate-900 mb-3';
    mainImg.innerHTML = '<img id="modal-main-img" src="' + data.screenshots[0] + '" alt="Screenshot" class="w-full h-64 object-cover object-top">';
    gallery.appendChild(mainImg);

    // Thumbnails
    if (data.screenshots.length > 1) {
      const thumbRow = document.createElement('div');
      thumbRow.className = 'flex gap-2 overflow-x-auto pb-1';
      data.screenshots.forEach((src, i) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.alt = 'Screenshot ' + (i+1);
        thumb.className = 'w-16 h-24 object-cover object-top rounded-xl cursor-pointer border-2 transition-all duration-200 flex-shrink-0 ' + (i===0 ? 'border-indigo-500' : 'border-transparent opacity-60');
        thumb.onclick = function() {
          document.getElementById('modal-main-img').src = src;
          thumbRow.querySelectorAll('img').forEach(t => { t.className = t.className.replace('border-indigo-500','border-transparent').replace('opacity-60','') + ' opacity-60'; });
          this.className = this.className.replace('border-transparent','border-indigo-500').replace(' opacity-60','');
        };
        thumbRow.appendChild(thumb);
      });
      gallery.appendChild(thumbRow);
    }
  }

  const modal = document.getElementById('project-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// ── Testimonials ───────────────────────────────────────────
const testimonials = [
  { name: 'Arthur de Silva',  role: 'CEO, CapitalFlow Ventures', avatar: '💼',
    text: 'Muhammad Umar Farooq delivered our cross-platform transaction app with outstanding quality. Frame rate drop is near zero, and the overall VIP aesthetic of the design has substantially boosted our daily active user rates.' },
  { name: 'Elena Rostova',    role: 'Creative Director, LuxeStudio', avatar: '👩‍🎨',
    text: 'Working with Umar was an absolute pleasure. His mastery of Flutter combined with his background in creative graphics means you get gorgeous, fully production-ready apps. Highly recommended for premium contracts.' },
  { name: 'Marcus Reynolds',  role: 'Product Owner, StreamForce', avatar: '👨‍💻',
    text: 'We needed a dynamic media layout with offline synchronization. Umar constructed exactly what we envisioned in record time. His deep understanding of Flutter state engines saved us weeks of refactoring.' }
];

let activeTestimonialIndex = 0;

function updateTestimonialUI() {
  const data = testimonials[activeTestimonialIndex];
  document.getElementById('testimonial-text').innerText   = `"${data.text}"`;
  document.getElementById('testimonial-name').innerText   = data.name;
  document.getElementById('testimonial-role').innerText   = data.role;
  document.getElementById('testimonial-avatar').innerText = data.avatar;
}

function nextTestimonial() {
  activeTestimonialIndex = (activeTestimonialIndex + 1) % testimonials.length;
  updateTestimonialUI();
}

function prevTestimonial() {
  activeTestimonialIndex = (activeTestimonialIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonialUI();
}

// ── Booking Form ───────────────────────────────────────────
function handleBookingSubmit(event) {
  event.preventDefault();
  const name  = document.getElementById('book-name').value;
  const email = document.getElementById('book-email').value;
  const type  = document.getElementById('book-type').value;
  const date  = document.getElementById('book-date').value;
  const time  = document.getElementById('book-time').value;
  if (!name || !email || !date || !time) return;

  const serial = 'VIP-' + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('ticket-id').innerText   = serial;
  document.getElementById('ticket-name').innerText = name;
  document.getElementById('ticket-type').innerText = type;
  document.getElementById('ticket-date').innerText = date;
  document.getElementById('ticket-time').innerText = time;

  const barcodeContainer = document.getElementById('ticket-barcode');
  barcodeContainer.innerHTML = '';
  for (let i = 0; i < 28; i++) {
    const line = document.createElement('span');
    line.className = 'barcode-line';
    line.style.width = Math.random() > 0.4 ? '3px' : '1.5px';
    barcodeContainer.appendChild(line);
  }

  document.getElementById('booking-form').classList.add('hidden');
  document.getElementById('booking-ticket').classList.remove('hidden');
  window.showToast('VIP Slot Allocation Confirmed! ✅');
}

function resetBookingForm() {
  document.getElementById('booking-form').reset();
  document.getElementById('booking-form').classList.remove('hidden');
  document.getElementById('booking-ticket').classList.add('hidden');
}

// ── Contact Form ───────────────────────────────────────────
function handleContactSubmit(event) {
  event.preventDefault();
  const name    = document.getElementById('contact-name').value;
  const email   = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const msg     = document.getElementById('contact-message').value;
  if (!name || !email || !subject || !msg) return;
  document.getElementById('contact-form').reset();
  window.showToast('Message Sent Successfully! ✅');
}

// ── WhatsApp Widget ────────────────────────────────────────
function toggleWhatsApp() {
  isWhatsAppOpen = !isWhatsAppOpen;
  const box = document.getElementById('whatsapp-box');
  if (!box) return;
  if (isWhatsAppOpen) {
    box.classList.remove('hidden');
    setTimeout(() => {
      box.classList.remove('scale-95', 'opacity-0');
      box.classList.add('scale-100', 'opacity-100');
    }, 50);
  } else {
    box.classList.add('scale-95', 'opacity-0');
    box.classList.remove('scale-100', 'opacity-100');
    setTimeout(() => box.classList.add('hidden'), 300);
  }
}

function launchWhatsApp() {
  const msgInput = document.getElementById('whatsapp-msg-input');
  const text = msgInput ? msgInput.value : 'Hello! I want to discuss a project.';
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/923156651556?text=${encoded}`, '_blank');
}
