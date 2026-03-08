// ── Cursor ──
const cursor = document.getElementById('cursor');
const dot    = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    dot.style.left    = e.clientX + 'px';
    dot.style.top     = e.clientY + 'px';
});

// ── Scroll Progress ──
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
});

// ── Card Intersection Observer + Skills ──
const cards = document.querySelectorAll('.card');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            e.target.querySelectorAll('.skill-fill').forEach(f => {
                f.style.width = f.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.15 });
cards.forEach(c => io.observe(c));

// ── Active Nav Highlighting ──
const navLinks = document.querySelectorAll('nav a[data-section]');
const sections = document.querySelectorAll('main section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === entry.target.id);
            });
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
});

// Close menu on nav link click (mobile)
navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksContainer.classList.remove('open');
    });
});

// ── Typewriter Effect ──
const roles = [
    'Curious Builder',
    'Problem Solver',
    'ML Developer',
    'Web Developer',
];
const typeEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
        typeEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
    } else {
        typeEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === current.length) {
        speed = 1800; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400; // pause before next word
    }

    setTimeout(type, speed);
}
type();

// ── Spider Web Canvas ──
const canvas = document.getElementById('web-canvas');
const ctx    = canvas.getContext('2d');

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    drawWeb();
}

function drawWeb() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const spokes = 12;
    const rings  = 7;

    // Top-right web
    const cx   = canvas.width * 0.85;
    const cy   = canvas.height * 0.12;
    const maxR = Math.min(canvas.width, canvas.height) * 0.55;

    ctx.strokeStyle = '#ff2244';
    ctx.lineWidth   = 0.8;

    for (let i = 0; i < spokes; i++) {
        const angle = (i / spokes) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.stroke();
    }
    for (let r = 1; r <= rings; r++) {
        const radius = (r / rings) * maxR;
        ctx.beginPath();
        for (let i = 0; i <= spokes; i++) {
            const angle = (i / spokes) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Bottom-left web
    const cx2   = canvas.width * 0.1;
    const cy2   = canvas.height * 0.88;
    const maxR2 = Math.min(canvas.width, canvas.height) * 0.35;

    for (let i = 0; i < spokes; i++) {
        const angle = (i / spokes) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx2, cy2);
        ctx.lineTo(cx2 + Math.cos(angle) * maxR2, cy2 + Math.sin(angle) * maxR2);
        ctx.stroke();
    }
    for (let r = 1; r <= 5; r++) {
        const radius = (r / 5) * maxR2;
        ctx.beginPath();
        for (let i = 0; i <= spokes; i++) {
            const angle = (i / spokes) * Math.PI * 2;
            const x = cx2 + Math.cos(angle) * radius;
            const y = cy2 + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
}

window.addEventListener('resize', resize);
resize();