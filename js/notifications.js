/**
 * Système de notifications - Ulrichb-officiel
 */

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.initContainer();
    }

    /**
     * Crée le conteneur de notifications
     */
    initContainer() {
        if (!document.getElementById('notifications-container')) {
            const container = document.createElement('div');
            container.id = 'notifications-container';
            container.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            `;
            document.body.appendChild(container);
        }
    }

    /**
     * Affiche une notification
     */
    show(message, type = 'info', duration = 4000) {
        const id = Date.now();
        const notification = document.createElement('div');
        
        // Styles selon le type
        let bgColor, textColor, icon;
        switch(type) {
            case 'success':
                bgColor = '#d4edda';
                textColor = '#155724';
                icon = '✅';
                break;
            case 'error':
                bgColor = '#f8d7da';
                textColor = '#721c24';
                icon = '❌';
                break;
            case 'warning':
                bgColor = '#fff3cd';
                textColor = '#856404';
                icon = '⚠️';
                break;
            default:
                bgColor = '#d1ecf1';
                textColor = '#0c5460';
                icon = 'ℹ️';
        }

        notification.style.cssText = `
            background-color: ${bgColor};
            color: ${textColor};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            min-width: 300px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        `;

        notification.innerHTML = `
            <span>${icon}</span>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="
                background: none;
                border: none;
                color: ${textColor};
                cursor: pointer;
                font-size: 1.2rem;
                margin-left: auto;
            ">×</button>
        `;

        const container = document.getElementById('notifications-container');
        container.appendChild(notification);

        // Auto-remove
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    /**
     * Notification de succès
     */
    success(message) {
        this.show(message, 'success');
    }

    /**
     * Notification d'erreur
     */
    error(message) {
        this.show(message, 'error', 5000);
    }

    /**
     * Notification d'avertissement
     */
    warning(message) {
        this.show(message, 'warning');
    }

    /**
     * Notification info
     */
    info(message) {
        this.show(message, 'info');
    }
}

window.notificationManager = new NotificationManager();

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Utilitaires
window.NotificationUtils = {
    success: (msg) => window.notificationManager.success(msg),
    error: (msg) => window.notificationManager.error(msg),
    warning: (msg) => window.notificationManager.warning(msg),
    info: (msg) => window.notificationManager.info(msg)
};

console.log('🔔 Utilisez window.NotificationUtils pour les notifications');