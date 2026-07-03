/* ============================================
   SCRIPT PRINCIPAL - Ulrichb-officiel
   ============================================ */

// Données des conseils de comédie
const comedyTips = [
    {
        id: 1,
        title: "Le timing est tout",
        description: "Maîtrisez l'art de la pause. C'est souvent l'absence de paroles qui fait rire, pas les paroles elles-mêmes.",
        category: "Technique"
    },
    {
        id: 2,
        title: "Observez la vie quotidienne",
        description: "Les meilleures blagues viennent de l'observation des situations banales. Développez votre capacité à voir l'humour partout.",
        category: "Inspiration"
    },
    {
        id: 3,
        title: "Connectez-vous avec votre audience",
        description: "Faites du contact visuel, reconnaissez votre audience. L'humour est une conversation, pas une conférence.",
        category: "Scène"
    },
    {
        id: 4,
        title: "Écrivez régulièrement",
        description: "La comédie, c'est du travail. Écrivez chaque jour, même si ce n'est que quelques lignes.",
        category: "Écriture"
    },
    {
        id: 5,
        title: "Testez vos blagues",
        description: "Ce qui vous fait rire ne fera pas toujours rire les autres. Testez, ajustez, perfectionnez.",
        category: "Développement"
    },
    {
        id: 6,
        title: "Connaissez votre personnage",
        description: "Développez une persona sur scène. Cela vous rend unique et mémorable.",
        category: "Performance"
    }
];

/* ============================================
   INITIALISATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setActiveNavLink();
    loadComedyTips();
});

/* ============================================
   FONCTIONS PRINCIPALES
   ============================================ */

/**
 * Initialise l'application
 */
function initializeApp() {
    console.log('🎭 Ulrichb-officiel initialisé');
    setupEventListeners();
}

/**
 * Configure les écouteurs d'événements
 */
function setupEventListeners() {
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Fermer le menu mobile au clic
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setActiveNavLink();
        });
    });
}

/**
 * Charge et affiche les conseils de comédie
 */
function loadComedyTips() {
    const tipsContainer = document.getElementById('tips-container');
    
    if (!tipsContainer) return;

    tipsContainer.innerHTML = '';

    comedyTips.forEach(tip => {
        const tipCard = createTipCard(tip);
        tipsContainer.appendChild(tipCard);
    });
}

/**
 * Crée une carte de conseil
 * @param {Object} tip - L'objet conseil
 * @returns {HTMLElement} - L'élément HTML de la carte
 */
function createTipCard(tip) {
    const card = document.createElement('div');
    card.className = 'tip-card';
    card.innerHTML = `
        <h3>${escapeHtml(tip.title)}</h3>
        <p>${escapeHtml(tip.description)}</p>
        <span class="tip-category">${escapeHtml(tip.category)}</span>
    `;
    
    // Ajouter une animation au survol
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    return card;
}

/**
 * Définit le lien actif dans la navigation
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Échappe les caractères HTML pour la sécurité
 * @param {string} text - Le texte à échapper
 * @returns {string} - Le texte échappé
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Filtre les conseils par catégorie
 * @param {string} category - La catégorie à filtrer
 * @returns {Array} - Les conseils filtrés
 */
function filterTipsByCategory(category) {
    return comedyTips.filter(tip => tip.category === category);
}

/**
 * Recherche parmi les conseils
 * @param {string} query - La requête de recherche
 * @returns {Array} - Les conseils correspondants
 */
function searchTips(query) {
    const lowerQuery = query.toLowerCase();
    return comedyTips.filter(tip => 
        tip.title.toLowerCase().includes(lowerQuery) ||
        tip.description.toLowerCase().includes(lowerQuery) ||
        tip.category.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Exporte les données en JSON
 * @returns {string} - Les données au format JSON
 */
function exportTipsAsJSON() {
    return JSON.stringify(comedyTips, null, 2);
}

/**
 * Ajoute un nouveau conseil (exemple)
 * @param {Object} newTip - Le nouveau conseil
 */
function addNewTip(newTip) {
    const maxId = Math.max(...comedyTips.map(t => t.id), 0);
    newTip.id = maxId + 1;
    comedyTips.push(newTip);
    console.log('✅ Nouveau conseil ajouté:', newTip);
    loadComedyTips();
}

/**
 * Utilitaires de console pour développement
 */
window.ComedyUtils = {
    tips: comedyTips,
    filter: filterTipsByCategory,
    search: searchTips,
    export: exportTipsAsJSON,
    addTip: addNewTip,
    getTips: () => comedyTips
};

console.log('💡 Utilisez window.ComedyUtils pour accéder aux utilitaires');
