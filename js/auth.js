/**
 * Système d'authentification - Ulrichb-officiel
 */

class AuthManager {
    constructor() {
        this.currentUser = this.loadUser();
        this.initAuthUI();
    }

    /**
     * Charge l'utilisateur depuis localStorage
     */
    loadUser() {
        const userJSON = localStorage.getItem('ulrichb_user');
        return userJSON ? JSON.parse(userJSON) : null;
    }

    /**
     * Sauvegarde l'utilisateur
     */
    saveUser(user) {
        localStorage.setItem('ulrichb_user', JSON.stringify(user));
        this.currentUser = user;
    }

    /**
     * Inscription utilisateur
     */
    signup(email, password, nom) {
        // Validation basique
        if (!email || !password || !nom) {
            throw new Error('Tous les champs sont obligatoires');
        }
        if (password.length < 6) {
            throw new Error('Le mot de passe doit contenir au moins 6 caractères');
        }

        // Créer nouvel utilisateur
        const user = {
            id: Date.now(),
            email: email,
            nom: nom,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
            preferences: {
                notifications: true,
                newsletter: false
            }
        };

        this.saveUser(user);
        console.log('✅ Inscription réussie:', user.email);
        return user;
    }

    /**
     * Connexion utilisateur
     */
    login(email, password) {
        // En production, cela irait vérifier une base de données
        const users = JSON.parse(localStorage.getItem('ulrichb_users') || '[]');
        const user = users.find(u => u.email === email);

        if (!user || user.password !== this.hashPassword(password)) {
            throw new Error('Email ou mot de passe incorrect');
        }

        this.saveUser(user);
        console.log('✅ Connexion réussie:', user.email);
        return user;
    }

    /**
     * Déconnexion
     */
    logout() {
        localStorage.removeItem('ulrichb_user');
        this.currentUser = null;
        console.log('✅ Déconnexion réussie');
        window.location.reload();
    }

    /**
     * Hash simple du mot de passe (en production, utiliser bcrypt côté serveur)
     */
    hashPassword(password) {
        return btoa(password); // Base64 pour la démo
    }

    /**
     * Initialise l'interface d'authentification
     */
    initAuthUI() {
        const authBtn = document.getElementById('auth-btn');
        if (!authBtn) return;

        if (this.currentUser) {
            authBtn.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span>👤 ${this.currentUser.nom}</span>
                    <button onclick="authManager.logout()" style="
                        background-color: #ff6b6b;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Déconnexion</button>
                </div>
            `;
        } else {
            authBtn.innerHTML = `
                <button onclick="openAuthModal()" style="
                    background-color: var(--accent-color);
                    color: var(--dark-color);
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                ">Connexion / Inscription</button>
            `;
        }
    }

    /**
     * Met à jour les préférences utilisateur
     */
    updatePreferences(preferences) {
        if (this.currentUser) {
            this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
            this.saveUser(this.currentUser);
            console.log('✅ Préférences mises à jour');
        }
    }
}

window.authManager = new AuthManager();

// Utilitaires
window.AuthUtils = {
    getCurrentUser: () => window.authManager.currentUser,
    isLoggedIn: () => window.authManager.currentUser !== null,
    logout: () => window.authManager.logout()
};

console.log('🔐 Utilisez window.AuthUtils pour l\'authentification');