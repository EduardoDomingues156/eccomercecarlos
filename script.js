// ======== Scroll to Section ========
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}



// ======== Intersection Observer for Scroll Animations ========
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ======== Smooth parallax for hero image ========
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-image img');
  if (heroImg) {
    const scrollY = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    if (scrollY < heroBottom) {
      heroImg.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  }
});

// ======== Animated counter for stats ========
function animateCounter(element, target, suffix = '') {
  let current = 0;
  const duration = 2000;
  const increment = target / (duration / 16);
  
  function update() {
    current += increment;
    if (current >= target) {
      current = target;
      element.textContent = '+' + current + suffix;
      return;
    }
    element.textContent = '+' + Math.floor(current) + suffix;
    requestAnimationFrame(update);
  }
  
  update();
}

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      
      if (text.includes('369')) {
        animateCounter(el, 369, ' M');
      } else if (text.includes('+4')) {
        animateCounter(el, 4, '');
      }
      
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
  statObserver.observe(el);
});

// ======== Chat animation on scroll ========
const chatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('chat-active');
      chatObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const chatContainer = document.querySelector('.chat-container');
if (chatContainer) {
  chatObserver.observe(chatContainer);
}

// ======== Animated chart bars ========
document.querySelectorAll('.chart-bar').forEach(bar => {
  bar.style.setProperty('--bar-h', bar.dataset.height);
});

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const growthVisual = document.querySelector('.growth-visual');
if (growthVisual) {
  chartObserver.observe(growthVisual);
}

// ======== Smooth card hover with 3D tilt ========
document.querySelectorAll('.sistema-card, .consultoria-card, .step-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / centerY * 3;
    const tiltY = (centerX - x) / centerX * 3;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

// ======== Current year in footer ========
const footerYear = document.querySelector('.footer p');
if (footerYear) {
  footerYear.innerHTML = footerYear.innerHTML.replace('2024', new Date().getFullYear());
}

// ======== WhatsApp Form Submission ========
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const instagram = document.getElementById('instagram').value;
    const cargo = document.getElementById('cargo').value;
    const faturamento = document.getElementById('faturamento').value;
    const investimento = document.getElementById('investimento').value;
    
    const message = `Olá! Vim pelo site da I Hate Likes e gostaria de agendar uma consultoria.
    
📌 *Dados do Contato:*
👤 *Nome:* ${name}
📧 *E-mail:* ${email}
📸 *Instagram:* ${instagram}
💼 *Cargo:* ${cargo}
💰 *Faturamento:* ${faturamento}
🚀 *Investimento em Anúncios:* ${investimento}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '5511999999999'; // Substituir pelo número real
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  });
}
