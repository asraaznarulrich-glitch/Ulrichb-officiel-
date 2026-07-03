/**
 * Système de gestion des cookies - Ulrichb-officiel
 */

class CookieManager {
    constructor() {
        this.cookieName = 'ulrichb_cookies_accepted';
        this.checkCookieConsent();
    }

    /**
     * Vérifie si l'utilisateur a accepté les cookies
     */
    checkCookieConsent() {
        if (!localStorage.getItem(this.cookieName) && !document.getElementById('cookie-banner')) {
            this.showCookieBanner();
        }
    }

    /**
     * Affiche la banneau de cookies
     */
    showCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
            z-index: 9998;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        `;

        banner.innerHTML = `
            <div style="flex: 1;">
                <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem;">🍪 Gestion des cookies</h3>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">
                    Nous utilisons des cookies pour améliorer votre expérience. En acceptant, vous consentez à notre 
                    <a href="pages/politique-confidentialite.html" style="color: var(--accent-color); text-decoration: underline;">politique de confidentialité</a>.
                </p>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="reject-cookies" style="
                    background-color: transparent;
                    color: white;
                    border: 2px solid white;
                    padding: 0.6rem 1.2rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                ">Refuser</button>
                <button id="accept-cookies" style="
                    background-color: var(--accent-color);
                    color: var(--dark-color);
                    border: none;
                    padding: 0.6rem 1.2rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                ">Accepter tous</button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('accept-cookies').addEventListener('click', () => {
            this.acceptCookies();
        });

        document.getElementById('reject-cookies').addEventListener('click', () => {
            this.rejectCookies();
        });
    }

    /**
     * Accepte les cookies
     */
    acceptCookies() {
        localStorage.setItem(this.cookieName, JSON.stringify({
            accepted: true,
            timestamp: new Date().toISOString(),
            analytics: true,
            marketing: true
        }));

        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => banner.remove(), 300);
        }

        notificationManager.success('✅ Cookies acceptés. Merci !');
    }

    /**
     * Refuse les cookies
     */
    rejectCookies() {
        localStorage.setItem(this.cookieName, JSON.stringify({
            accepted: false,
            timestamp: new Date().toISOString(),
            analytics: false,
            marketing: false
        }));

        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => banner.remove(), 300);
        }

        notificationManager.info('ℹ️ Cookies refusés. Nous respectons votre choix.');
    }

    /**
     * Vérifie si les cookies sont acceptés
     */
    areAccepted() {
        const cookies = localStorage.getItem(this.cookieName);
        return cookies ? JSON.parse(cookies).accepted : false;
    }

    /**
     * Réinitialise le consentement aux cookies
     */
    reset() {
        localStorage.removeItem(this.cookieName);
        this.checkCookieConsent();
    }
}

window.cookieManager = new CookieManager();

// Ajouter animation CSS
const cookieStyle = document.createElement('style');
cookieStyle.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(cookieStyle);

console.log('🍪 Système de cookies initialisé');