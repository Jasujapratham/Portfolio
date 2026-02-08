const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => observer.observe(el));

const marquee = document.querySelector('.marquee-track');
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

const codeCta = document.querySelector('.code-cta');
const overlay = document.querySelector('.welcome-overlay');
const welcomeTitle = document.querySelector('.welcome-title');
const welcomeMessage = document.querySelector('.welcome-message');
const welcomeClose = document.querySelector('.welcome-close');

const closeOverlay = () => {
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
};

const openOverlay = (name) => {
  welcomeTitle.textContent = `Welcome, ${name}!`;
  welcomeMessage.textContent = 'Hope you enjoy exploring my portfolio.';
  overlay.classList.add('active');
  overlay.classList.add('celebrate');
  overlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => overlay.classList.remove('celebrate'), 900);
  launchConfetti();
  setTimeout(closeOverlay, 1600);
};

if (codeCta) {
  codeCta.addEventListener('click', () => {
    const name = window.prompt('Enter your name:');
    if (!name) return;
    openOverlay(name.trim().slice(0, 40));
  });
}

if (welcomeClose) {
  welcomeClose.addEventListener('click', closeOverlay);
}

const launchConfetti = () => {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  const colors = ['#ef6b4f', '#1c7c7a', '#f4b26b', '#2d2a28'];

  for (let i = 0; i < 40; i += 1) {
    const piece = document.createElement('span');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    piece.style.transform = `translateY(-20px) rotate(${Math.random() * 120}deg)`;
    confetti.appendChild(piece);
  }

  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 1400);
};

const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing && window.matchMedia('(min-width: 601px)').matches) {
  let x = 0;
  let y = 0;
  let ringX = 0;
  let ringY = 0;
  let lastStar = 0;

  window.addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    const now = performance.now();
    if (now - lastStar > 35) {
      lastStar = now;
      const star = document.createElement('span');
      star.className = 'star';
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 900);
    }
  });

  const animateRing = () => {
    ringX += (x - ringX) * 0.15;
    ringY += (y - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  };

  animateRing();

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
  });
}
