// =============================================
// Meta CAPI & Pixel Tracking
// =============================================
function trackEvent(eventName, eventData = {}, customData = {}) {
    const timeNow = Math.floor(Date.now() / 1000);
    const eventId = 'evt_' + timeNow + '_' + Math.random().toString(36).slice(2, 11);

    if (typeof fbq === 'function') {
        fbq('track', eventName, customData, { eventID: eventId });
    }

    const getOrSetFbp = () => {
        const match = document.cookie.match(new RegExp('(^| )_fbp=([^;]+)'));
        if (match) return match[2];
        const newFbp = `fb.1.${Date.now()}.${Math.round(Math.random() * 10000000000)}`;
        const date = new Date();
        date.setTime(date.getTime() + (90 * 24 * 60 * 60 * 1000));
        document.cookie = `_fbp=${newFbp};expires=${date.toUTCString()};path=/`;
        return newFbp;
    };

    const getOrSetFbc = () => {
        const match = document.cookie.match(new RegExp('(^| )_fbc=([^;]+)'));
        if (match) return match[2];
        const urlParams = new URLSearchParams(window.location.search);
        const fbclid = urlParams.get('fbclid');
        if (fbclid) {
            const newFbc = `fb.1.${Date.now()}.${fbclid}`;
            const date = new Date();
            date.setTime(date.getTime() + (90 * 24 * 60 * 60 * 1000));
            document.cookie = `_fbc=${newFbc};expires=${date.toUTCString()};path=/`;
            return newFbc;
        }
        return null;
    };

    const fbp = getOrSetFbp();
    const fbc = getOrSetFbc();

    const userData = {
        client_user_agent: navigator.userAgent,
        external_id: (function() {
            let id = localStorage.getItem('_external_id');
            if (!id) {
                id = 'anon_' + Math.floor(Date.now() / 1000) + '_' + Math.random().toString(36).substring(2, 15);
                localStorage.setItem('_external_id', id);
            }
            return id;
        })(),
        ...eventData
    };
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const eventPayload = {
        event_name: eventName,
        event_time: timeNow,
        action_source: 'website',
        event_id: eventId,
        event_source_url: window.location.href,
        user_data: userData,
    };
    if (Object.keys(customData).length > 0) eventPayload.custom_data = customData;

    const payload = { data: [eventPayload] };
    const testCode = new URLSearchParams(window.location.search).get('test_event_code');
    if (testCode) payload.test_event_code = testCode;

    fetch('/api/meta-capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).catch(err => console.error('Meta CAPI error:', err));
}

// Trackeos de página
trackEvent('PageView');
trackEvent('ViewContent', {}, {
    content_name: 'Masterclass Alfajores Rentables',
    content_ids: ['masterclass_alfajores_2026'],
    content_type: 'product',
    currency: 'UYU',
    value: 3200
});

// ── Lógica del Modal ────────────────────────────────────────
const overlay   = document.getElementById('modalOverlay');
const btnClose  = document.getElementById('modalClose');

function openModal() {
    if(overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    trackEvent('InitiateCheckout', {}, {
        content_name: 'Masterclass Alfajores Rentables',
        currency: 'UYU', value: 2900,
        content_ids: ['masterclass_alfajores_2026'], content_type: 'product'
    });
}

function closeModal() {
    if(overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    
    // Disparar la lógica del embudo (cross-sell o combo) después de cerrar este
    if (window.triggerFunnelModal) {
        window.triggerFunnelModal();
    }
}

if(btnClose) btnClose.addEventListener('click', closeModal);
if(overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// ── Purchase tracking ────────────────────────────────────────
const btnMp = document.getElementById('btn-modal-mp');
if(btnMp) btnMp.addEventListener('click', () => {
    trackEvent('Purchase', {}, { currency:'UYU', value: 3200,
        content_name: 'Masterclass Alfajores Rentables — Tarjeta',
        content_ids: ['masterclass_alfajores_2026'], content_type:'product', num_items: 1 });
});

const btnWa = document.getElementById('btn-modal-wa');
if(btnWa) btnWa.addEventListener('click', () => {
    trackEvent('Purchase', {}, { currency:'UYU', value: 2900,
        content_name: 'Masterclass Alfajores Rentables — Contado',
        content_ids: ['masterclass_alfajores_2026'], content_type:'product', num_items: 1 });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .split-col, .info-box, .org-layout-card, .expert-editorial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});


// FAQ Accordion Logic
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Cerrar otros abiertos (opcional, para estilo acordeón puro)
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
