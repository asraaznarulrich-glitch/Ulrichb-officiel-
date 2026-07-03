/**
 * Gestionnaire de vidéos - Ulrichb-officiel
 * Gère le chargement et l'affichage des vidéos
 */

class VideoManager {
    constructor() {
        this.videos = [];
        this.filteredVideos = [];
    }

    /**
     * Charge les vidéos depuis le fichier JSON
     */
    async loadVideos() {
        try {
            const response = await fetch('../data/videos.json');
            const data = await response.json();
            this.videos = data.videos;
            this.filteredVideos = this.videos;
            console.log('✅ Vidéos chargées:', this.videos.length);
            return this.videos;
        } catch (error) {
            console.error('❌ Erreur lors du chargement des vidéos:', error);
            return [];
        }
    }

    /**
     * Filtre les vidéos par catégorie
     */
    filterByCategory(category) {
        if (category === 'all') {
            this.filteredVideos = this.videos;
        } else {
            this.filteredVideos = this.videos.filter(video => video.category === category);
        }
        return this.filteredVideos;
    }

    /**
     * Recherche dans les vidéos
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.videos.filter(video =>
            video.title.toLowerCase().includes(lowerQuery) ||
            video.description.toLowerCase().includes(lowerQuery) ||
            video.category.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Ajoute une nouvelle vidéo
     */
    addVideo(videoData) {
        const newVideo = {
            id: Math.max(...this.videos.map(v => v.id), 0) + 1,
            ...videoData
        };
        this.videos.push(newVideo);
        console.log('✅ Vidéo ajoutée:', newVideo);
        return newVideo;
    }

    /**
     * Obtient une vidéo par ID
     */
    getVideoById(id) {
        return this.videos.find(video => video.id === id);
    }

    /**
     * Obtient toutes les catégories
     */
    getCategories() {
        return [...new Set(this.videos.map(video => video.category))];
    }

    /**
     * Exporte les vidéos en JSON
     */
    exportAsJSON() {
        return JSON.stringify(this.videos, null, 2);
    }
}

// Créer une instance globale
window.videoManager = new VideoManager();

// Utilitaires pour la console
window.VideoUtils = {
    loadVideos: () => window.videoManager.loadVideos(),
    filter: (category) => window.videoManager.filterByCategory(category),
    search: (query) => window.videoManager.search(query),
    addVideo: (data) => window.videoManager.addVideo(data),
    getAll: () => window.videoManager.videos,
    export: () => window.videoManager.exportAsJSON()
};

console.log('🎬 Utilisez window.VideoUtils pour gérer les vidéos');