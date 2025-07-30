// script.js - Romantic Website Interactions
document.addEventListener('DOMContentLoaded', function() {
    // ============== UTILITY FUNCTIONS ==============
    function createElement(tag, attributes = {}, innerHTML = '') {
        const el = document.createElement(tag);
        Object.assign(el, attributes);
        if (innerHTML) el.innerHTML = innerHTML;
        return el;
    }

    function showError(message) {
        console.error(message);
        // You could show a user-friendly error message here if needed
    }

    // ============== TAB SYSTEM ==============
    function setupTabs() {
        try {
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');
            
            if (!tabs.length || !tabContents.length) {
                throw new Error('Tab elements not found');
            }
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active classes
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Set active tab
                    this.classList.add('active');
                    
                    // Show corresponding content
                    const tabId = this.dataset.tab;
                    const content = document.getElementById(tabId);
                    if (content) {
                        content.classList.add('active');
                    }
                });
            });
        } catch (error) {
            showError('Tab system error: ' + error.message);
        }
    }

    // ============== FLOATING HEARTS ==============
    function createFloatingHearts() {
        try {
            const heartsContainer = document.querySelector('.hearts');
            if (!heartsContainer) return;
            
            for (let i = 0; i < 20; i++) {
                const heart = createElement('div', {
                    className: 'heart',
                    style: `left:${Math.random() * 100}%;animation-delay:${Math.random() * 5}s;`
                }, '❤️');
                heartsContainer.appendChild(heart);
            }
        } catch (error) {
            showError('Floating hearts error: ' + error.message);
        }
    }

    // ============== GALLERY LIGHTBOX ==============
    function setupGalleryLightbox() {
        try {
            const memoryItems = document.querySelectorAll('.memory-item');
            if (!memoryItems.length) return;
            
            // Create lightbox elements
            const overlay = createElement('div', { className: 'lightbox-overlay' });
            overlay.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="" alt="" class="lightbox-image">
                </div>
            `;
            document.body.appendChild(overlay);
            
            // Handle item clicks
            memoryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const img = this.querySelector('img');
                    const video = this.querySelector('video');
                    
                    if (video) {
                        video.controls = true;
                        return;
                    }
                    
                    if (img?.src) {
                        overlay.querySelector('.lightbox-image').src = img.src;
                        overlay.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            // Close handlers
            overlay.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeLightbox();
            });
            
            function closeLightbox() {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        } catch (error) {
            showError('Gallery lightbox error: ' + error.message);
        }
    }

    // ============== MESSAGE FORM ==============
    function setupMessageForm() {
        try {
            const messageForm = document.getElementById('message-form');
            const savedMessage = document.getElementById('saved-message');
            
            if (!messageForm || !savedMessage) return;
            
            messageForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const textarea = this.querySelector('textarea');
                const message = textarea?.value.trim();
                
                if (message) {
                    savedMessage.innerHTML = `
                        <div class="message">
                            <p>${message}</p>
                            <div class="message-date">${new Date().toLocaleDateString()}</div>
                        </div>
                    `;
                    textarea.value = '';
                    savedMessage.scrollIntoView({ behavior: 'smooth' });
                }
            });
        } catch (error) {
            showError('Message form error: ' + error.message);
        }
    }

    // ============== SPECIAL EFFECTS ==============
    function setupSpecialEffects() {
        try {
            // Heart beat effect
            const heartBeat = document.querySelector('.heart-beat');
            if (heartBeat) {
                heartBeat.addEventListener('click', function() {
                    this.classList.add('pulse');
                    setTimeout(() => this.classList.remove('pulse'), 300);
                    
                    // Create heart burst
                    createHeartBurst(this);
                });
            }
            
            // Couple photo interaction
            document.querySelectorAll('.couple-photo').forEach(photo => {
                photo.addEventListener('click', function() {
                    this.classList.add('photo-click');
                    setTimeout(() => this.classList.remove('photo-click'), 300);
                });
            });
        } catch (error) {
            showError('Special effects error: ' + error.message);
        }
    }
    
    function createHeartBurst(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            const heart = createElement('div', {
                className: 'burst-heart',
                style: `left:${rect.left + rect.width/2}px;top:${rect.top + rect.height/2}px;`
            }, '❤️');
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }

    // ============== INITIALIZE EVERYTHING ==============
    function init() {
        setupTabs();
        createFloatingHearts();
        setupGalleryLightbox();
        setupMessageForm();
        setupSpecialEffects();
        
        // Add dynamic styles
        addDynamicStyles();
    }
    
    function addDynamicStyles() {
        const style = createElement('style');
        style.textContent = `
            .burst-heart {
                position: absolute;
                font-size: 1.5rem;
                animation: float-up 1s ease-out forwards;
                pointer-events: none;
                z-index: 100;
            }
            
            @keyframes float-up {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0); opacity: 0; }
            }
            
            .pulse {
                animation: pulse 0.3s ease;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.5); }
                100% { transform: scale(1); }
            }
            
            .photo-click {
                transform: scale(1.1) rotate(5deg) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Start the application
    init();
});

