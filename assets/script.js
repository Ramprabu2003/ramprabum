window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
    }, 1400);
});

const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
if (cursorDot && cursorOutline) {
    let mx = 0;
    let my = 0;
    let ox = 0;
    let oy = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursorDot.style.left = `${mx}px`;
        cursorDot.style.top = `${my}px`;
    });

    (function animateCursor() {
        ox += (mx - ox) * 0.12;
        oy += (my - oy) * 0.12;
        cursorOutline.style.left = `${ox}px`;
        cursorOutline.style.top = `${oy}px`;
        requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll('a, button, .proj-card, .skill-card, .filter-btn').forEach((el) => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const words = ['Web Interfaces', 'Data Dashboards', 'UI/UX Designs', 'Analytics Reports'];
    let wi = 0;
    let ci = 0;
    let del = false;

    function step() {
        const word = words[wi];
        ci += del ? -1 : 1;
        el.textContent = word.slice(0, ci);
        let t = del ? 60 : 100;
        if (!del && ci === word.length) {
            del = true;
            t = 1200;
        } else if (del && ci === 0) {
            del = false;
            wi = (wi + 1) % words.length;
            t = 300;
        }
        setTimeout(step, t);
    }

    step();
})();

window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    document.querySelectorAll('section[id]').forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) scrollTop.classList.toggle('visible', window.scrollY > 400);
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function onClick(e) {
        const href = this.getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
});

(function initCounters() {
    const nums = document.querySelectorAll('.stat-num');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const end = parseInt(entry.target.dataset.count || '0', 10);
            let n = 0;
            const timer = setInterval(() => {
                n = Math.min(end, n + Math.ceil(end / 50));
                entry.target.textContent = n;
                if (n >= end) clearInterval(timer);
            }, 20);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    nums.forEach((n) => obs.observe(n));
})();

(function initSkillBars() {
    const bars = document.querySelectorAll('.skill-level div');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const w = entry.target.dataset.w;
            entry.target.style.width = w;
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    bars.forEach((bar) => {
        bar.dataset.w = bar.style.width;
        bar.style.width = '0';
        obs.observe(bar);
    });
})();

(function initProjectFilter() {
    const btns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.project-item');
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            btns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            items.forEach((item) => {
                const ok = f === 'all' || item.dataset.category === f;
                item.classList.toggle('hidden', !ok);
            });
        });
    });
})();

(function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const root = document.documentElement;
    let theme = localStorage.getItem('portfolio-theme') || 'dark';
    root.setAttribute('data-theme', theme);
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
})();

(function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const loadedAtInput = document.getElementById('formLoadedAt');
    const loadedAt = Date.now();
    if (loadedAtInput) loadedAtInput.value = String(loadedAt);

    const LAST_SENT_KEY = 'portfolio-last-contact-submit';
    const MIN_FILL_MS = 3500;
    const COOLDOWN_MS = 60000;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_FILE_EXTENSIONS = ['pdf', 'doc', 'docx', 'txt', 'png', 'jpg', 'jpeg', 'webp'];

    function setHiddenField(name, value) {
        let field = form.querySelector(`input[name="${name}"]`);
        if (!field) {
            field = document.createElement('input');
            field.type = 'hidden';
            field.name = name;
            form.appendChild(field);
        }
        field.value = value;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const companyWebsite = document.getElementById('companyWebsite').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const honey = document.getElementById('websiteTrap');
        const attachmentInput = document.getElementById('attachment');
        const attachment = attachmentInput && attachmentInput.files ? attachmentInput.files[0] : null;
        const hasAttachment = Boolean(attachment);

        // Silent drop for bots that fill hidden honeypot field.
        if (honey && honey.value.trim() !== '') {
            showToast('Message blocked as spam', 'warning');
            return;
        }

        const now = Date.now();
        if (now - loadedAt < MIN_FILL_MS) {
            showToast('Please wait a few seconds before submitting', 'warning');
            return;
        }

        const lastSent = parseInt(localStorage.getItem(LAST_SENT_KEY) || '0', 10);
        if (lastSent && now - lastSent < COOLDOWN_MS) {
            const waitSec = Math.ceil((COOLDOWN_MS - (now - lastSent)) / 1000);
            showToast(`Please wait ${waitSec}s before sending again`, 'warning');
            return;
        }

        if (!name || !email || !subject || !message) {
            showToast('Please fill all fields', 'warning');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('Please enter a valid email', 'warning');
            return;
        }
        if (phone && !/^\+[1-9]\d{0,3}[-()\d\s]{6,18}$/.test(phone)) {
            showToast('Phone must include country code (example: +91 9876543210)', 'warning');
            return;
        }

        if (/https?:\/\/|www\./i.test(message)) {
            showToast('Links are not allowed in message', 'warning');
            return;
        }

        if (attachment) {
            const ext = attachment.name.includes('.') ? attachment.name.split('.').pop().toLowerCase() : '';
            if (!ALLOWED_FILE_EXTENSIONS.includes(ext)) {
                showToast('Unsupported file type', 'warning');
                return;
            }
            if (attachment.size > MAX_FILE_SIZE) {
                showToast('File too large. Max 5MB allowed', 'warning');
                return;
            }
        }

        const recipientEmail = form.dataset.recipientEmail;
        if (!recipientEmail) {
            showToast('Recipient email is not configured', 'warning');
            return;
        }

        const btn = document.getElementById('sendBtn');
        if (!btn) return;
        const text = btn.querySelector('.btn-text');
        const loading = btn.querySelector('.btn-loading');
        btn.disabled = true;
        if (text) text.classList.add('d-none');
        if (loading) loading.classList.remove('d-none');

        try {
            const submitFrame = document.getElementById('formSubmitFrame');
            const endpoint = `https://formsubmit.co/${encodeURIComponent(recipientEmail)}`;

            setHiddenField('_subject', `Portfolio Contact from ${email}: ${subject}`);
            setHiddenField('_replyto', email);
            setHiddenField('reply_to', email);
            setHiddenField('_captcha', 'false');
            setHiddenField('_template', 'table');

            const originalTarget = form.getAttribute('target');
            const originalAction = form.getAttribute('action');
            const originalMethod = form.getAttribute('method');

            form.setAttribute('target', submitFrame ? submitFrame.name : '');
            form.setAttribute('action', endpoint);
            form.setAttribute('method', 'POST');

            form.submit();

            form.reset();
            localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
            if (loadedAtInput) loadedAtInput.value = String(Date.now());
            showToast(hasAttachment ? 'Message sent successfully with attachment!' : 'Message sent successfully!', 'success');

            if (originalTarget) form.setAttribute('target', originalTarget); else form.removeAttribute('target');
            if (originalAction) form.setAttribute('action', originalAction); else form.removeAttribute('action');
            if (originalMethod) form.setAttribute('method', originalMethod); else form.removeAttribute('method');
        } catch (error) {
            showToast('Failed to send message. Try again.', 'warning');
        } finally {
            btn.disabled = false;
            if (text) text.classList.remove('d-none');
            if (loading) loading.classList.add('d-none');
        }
    });
})();

const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function showToast(message, type) {
    const toast = document.getElementById('toastNotif');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast-notif ${type} show`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ---- HERO CANVAS PARTICLES ----
(function initParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const NUM = 100;
    const MAX_DIST = 130;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    const pts = Array.from({ length: NUM }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        a: Math.random() * 0.4 + 0.15,
    }));

    function frame() {
        ctx.clearRect(0, 0, W, H);
        pts.forEach((p) => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const md = Math.sqrt(mdx * mdx + mdy * mdy);
            if (md < 80 && md > 0) { p.x += (mdx / md) * 1.5; p.y += (mdy / md) * 1.5; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108,99,255,${p.a})`;
            ctx.fill();
        });
        for (let i = 0; i < NUM; i++) {
            for (let j = i + 1; j < NUM; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < MAX_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - d / MAX_DIST)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(frame);
    }
    frame();
})();

// ---- 3D TILT CARDS ----
(function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
            card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
})();

// ---- SCROLL REVEAL ----
(function initReveal() {
    const sel = '.section-header, .proj-card, .skill-card, .timeline-card, ' +
                '.about-img-card, .contact-info-card, .contact-form';
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            setTimeout(() => entry.target.classList.add('revealed'), i * 80);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(sel).forEach((el) => { el.setAttribute('data-reveal', ''); obs.observe(el); });
})();

// ---- MAGNETIC BUTTONS ----
(function initMagneticButtons() {
    document.querySelectorAll('.btn-glow, .btn-glass, .btn-resume').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
})();

// ---- PROJECT MODALS ----
(function initProjectModals() {
    const overlay = document.getElementById('projModal');
    const closeBtn = document.getElementById('projModalClose');
    const content = document.getElementById('projModalContent');
    if (!overlay || !closeBtn || !content) return;

    function esc(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function openModal(card) {
        const iconEl = card.querySelector('.proj-icon');
        const title = card.querySelector('.proj-title').textContent;
        const desc = card.querySelector('.proj-desc').textContent;
        const tags = Array.from(card.querySelectorAll('.proj-tags span'))
            .map((s) => `<span>${esc(s.textContent)}</span>`).join('');
        const liveEl = card.querySelector('.proj-link:first-child');
        const codeEl = card.querySelector('.proj-link:last-child');
        const iconClass = iconEl ? iconEl.className : 'fas fa-code';
        const liveHref = liveEl ? liveEl.getAttribute('href') : '#';
        const codeHref = codeEl ? codeEl.getAttribute('href') : '#';
        content.innerHTML = `
            <div class="proj-modal-icon"><i class="${esc(iconClass)}"></i></div>
            <h3 class="proj-modal-title">${esc(title)}</h3>
            <p class="proj-modal-desc">${esc(desc)}</p>
            <div class="proj-modal-tags">${tags}</div>
            <div class="proj-modal-links">
                <a href="${esc(liveHref)}" class="modal-live" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="${esc(codeHref)}" class="modal-code" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> View Code
                </a>
            </div>`;
        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.proj-card').forEach((card) => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.proj-link')) openModal(card);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
