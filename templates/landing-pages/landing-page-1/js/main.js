// ============================================================
// LANDING PAGE #1 — JAVASCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Landing Page #1 ready.');

    // ============================================================
    // 1. FAQ ACCORDION
    // ============================================================
    const faqDetails = document.querySelectorAll('#faq details');
    faqDetails.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                faqDetails.forEach(other => {
                    if (other !== this && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // ============================================================
    // 2. SMOOTH SCROLL
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================================
    // 3. MOBILE NAV TOGGLE
    // ============================================================
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');

    if (!document.querySelector('.hamburger')) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: var(--text-color, #1a1a2e);
        `;

        if (logo) {
            logo.after(hamburger);
        }

        hamburger.addEventListener('click', function() {
            const navUl = nav.querySelector('ul');
            if (navUl) {
                navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
                navUl.style.flexDirection = 'column';
                navUl.style.gap = '16px';
                navUl.style.padding = '16px 0';
                navUl.style.width = '100%';
            }
        });

        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMobile = (e) => {
            hamburger.style.display = e.matches ? 'block' : 'none';
            const navUl = nav.querySelector('ul');
            if (navUl && !e.matches) {
                navUl.style.display = 'flex';
                navUl.style.flexDirection = 'row';
                navUl.style.gap = '32px';
                navUl.style.padding = '0';
                navUl.style.width = 'auto';
            }
            if (navUl && e.matches) {
                navUl.style.display = 'none';
            }
        };
        handleMobile(mediaQuery);
        mediaQuery.addEventListener('change', handleMobile);
    }

    console.log('✅ Template ready for customization.');
});
