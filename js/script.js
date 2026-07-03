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

function initializeApp() {
    console.log('🎭 Ulrichb-officiel initialisé');
    setupEventListeners();
}

function setupEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setActiveNavLink();
        });
    });
}

function loadComedyTips() {
    const tipsContainer = document.getElementById('tips-container');
    
    if (!tipsContainer) return;

    tipsContainer.innerHTML = '';

    comedyTips.forEach(tip => {
        const tipCard = createTipCard(tip);
        tipsContainer.appendChild(tipCard);
    });
}

function createTipCard(tip) {
    const card = document.createElement('div');
    card.className = 'tip-card';
    card.innerHTML = `
        <h3>${escapeHtml(tip.title)}</h3>
        <p>${escapeHtml(tip.description)}</p>
        <span class="tip-category">${escapeHtml(tip.category)}</span>
    `;
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    return card;
}

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

function filterTipsByCategory(category) {
    return comedyTips.filter(tip => tip.category === category);
}

function searchTips(query) {
    const lowerQuery = query.toLowerCase();
    return comedyTips.filter(tip => 
        tip.title.toLowerCase().includes(lowerQuery) ||
        tip.description.toLowerCase().includes(lowerQuery) ||
        tip.category.toLowerCase().includes(lowerQuery)
    );
}

function exportTipsAsJSON() {
    return JSON.stringify(comedyTips, null, 2);
}

function addNewTip(newTip) {
    const maxId = Math.max(...comedyTips.map(t => t.id), 0);
    newTip.id = maxId + 1;
    comedyTips.push(newTip);
    console.log('✅ Nouveau conseil ajouté:', newTip);
    loadComedyTips();
}

window.ComedyUtils = {
    tips: comedyTips,
    filter: filterTipsByCategory,
    search: searchTips,
    export: exportTipsAsJSON,
    addTip: addNewTip,
    getTips: () => comedyTips
};

console.log('💡 Utilisez window.ComedyUtils pour accéder aux utilitaires');