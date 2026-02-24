// ── Cursor ──
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
});

// ── Scroll Progress ──
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
});

// ── Card Intersection Observer ──
const cards = document.querySelectorAll('.card');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            // Animate skill bars
            e.target.querySelectorAll('.skill-fill').forEach(f => {
                f.style.width = f.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.15 });
cards.forEach(c => io.observe(c));

// ── Spider Web Canvas ──
const canvas = document.getElementById('web-canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawWeb();
}

function drawWeb() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width * 0.85;
    const cy = canvas.height * 0.12;
    const spokes = 12;
    const rings = 7;
    const maxR = Math.min(canvas.width, canvas.height) * 0.55;

    ctx.strokeStyle = '#ff2244';
    ctx.lineWidth = 0.8;

    // Spokes
    for (let i = 0; i < spokes; i++) {
        const angle = (i / spokes) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.stroke();
    }

    // Rings (concentric polygons)
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

    // Second web bottom-left
    const cx2 = canvas.width * 0.1;
    const cy2 = canvas.height * 0.88;
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