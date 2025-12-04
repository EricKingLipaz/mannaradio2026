/**
 * Live Features - Chat, Reactions, Viewer Count, Social Sharing
 * Features: Real-time Interactions, Social Integration
 */

class LiveFeatures {
    constructor() {
        this.viewerCount = 0;
        this.chatEnabled = false;
        this.reactions = ['❤️', '🙏', '🔥', '👏', '✨', '🙌'];

        this.init();
    }

    init() {
        this.setupUI();
        this.attachEventListeners();
        this.startViewerCountSimulation();
    }

    setupUI() {
        // Add live features to radio and TV activities
        const activities = ['.RadioActivity', '.TvActivity', '.OnDemandActivity'];

        activities.forEach(activitySelector => {
            const activity = document.querySelector(activitySelector);
            if (!activity || activity.querySelector('.live-features')) return;

            const liveFeaturesHTML = `
                <div class="live-features">
                    <!-- Floating Action Buttons -->
                    <div class="live-fab-container">
                        <button class="live-fab reactions-fab" title="Reactions">
                            <i class="material-icons">favorite</i>
                        </button>
                        <button class="live-fab chat-fab" title="Live Chat">
                            <i class="material-icons">chat</i>
                            <span class="chat-badge">0</span>
                        </button>
                        <button class="live-fab share-fab" title="Share">
                            <i class="material-icons">share</i>
                        </button>
                    </div>

                    <!-- Reactions Panel -->
                    <div class="reactions-panel">
                        <div class="reactions-grid">
                            ${this.reactions.map(reaction => `
                                <button class="reaction-btn" data-reaction="${reaction}">
                                    ${reaction}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Live Chat Panel -->
                    <div class="live-chat-panel">
                        <div class="chat-header">
                            <h3>Live Chat</h3>
                            <button class="close-chat">
                                <i class="material-icons">close</i>
                            </button>
                        </div>
                        <div class="chat-messages">
                            <div class="chat-message system">
                                <span class="message-text">Welcome to the live chat! Share your thoughts and prayers.</span>
                            </div>
                        </div>
                        <div class="chat-input-container">
                            <input type="text" class="chat-input" placeholder="Type a message...">
                            <button class="send-chat-btn">
                                <i class="material-icons">send</i>
                            </button>
                        </div>
                    </div>

                    <!-- Share Modal -->
                    <div class="share-modal">
                        <div class="share-modal-content">
                            <div class="share-header">
                                <h3>Share</h3>
                                <button class="close-share">
                                    <i class="material-icons">close</i>
                                </button>
                            </div>
                            <div class="share-options">
                                <button class="share-option" data-platform="whatsapp">
                                    <iconify-icon icon="mdi:whatsapp" width="32" height="32"></iconify-icon>
                                    <span>WhatsApp</span>
                                </button>
                                <button class="share-option" data-platform="facebook">
                                    <iconify-icon icon="mdi:facebook" width="32" height="32"></iconify-icon>
                                    <span>Facebook</span>
                                </button>
                                <button class="share-option" data-platform="twitter">
                                    <iconify-icon icon="mdi:twitter" width="32" height="32"></iconify-icon>
                                    <span>Twitter</span>
                                </button>
                                <button class="share-option" data-platform="email">
                                    <i class="material-icons">email</i>
                                    <span>Email</span>
                                </button>
                                <button class="share-option" data-platform="copy">
                                    <i class="material-icons">content_copy</i>
                                    <span>Copy Link</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Floating Reactions Animation Container -->
                    <div class="floating-reactions"></div>
                </div>
            `;

            activity.insertAdjacentHTML('beforeend', liveFeaturesHTML);
        });
    }

    attachEventListeners() {
        // Reactions FAB
        document.querySelectorAll('.reactions-fab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const panel = e.target.closest('.live-features').querySelector('.reactions-panel');
                panel.classList.toggle('show');

                // Close other panels
                document.querySelectorAll('.live-chat-panel, .share-modal').forEach(p => {
                    p.classList.remove('show');
                });
            });
        });

        // Reaction buttons
        document.querySelectorAll('.reaction-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const reaction = e.target.dataset.reaction;
                this.sendReaction(reaction);

                // Close panel
                e.target.closest('.reactions-panel').classList.remove('show');
            });
        });

        // Chat FAB
        document.querySelectorAll('.chat-fab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const panel = e.target.closest('.live-features').querySelector('.live-chat-panel');
                panel.classList.toggle('show');

                // Close other panels
                document.querySelectorAll('.reactions-panel, .share-modal').forEach(p => {
                    p.classList.remove('show');
                });

                // Focus input
                if (panel.classList.contains('show')) {
                    panel.querySelector('.chat-input').focus();
                }
            });
        });

        // Close chat
        document.querySelectorAll('.close-chat').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.live-chat-panel').classList.remove('show');
            });
        });

        // Send chat message
        document.querySelectorAll('.send-chat-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const container = e.target.closest('.chat-input-container');
                const input = container.querySelector('.chat-input');
                this.sendChatMessage(input.value);
                input.value = '';
            });
        });

        // Chat input enter key
        document.querySelectorAll('.chat-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage(e.target.value);
                    e.target.value = '';
                }
            });
        });

        // Share FAB
        document.querySelectorAll('.share-fab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.live-features').querySelector('.share-modal');
                modal.classList.add('show');

                // Close other panels
                document.querySelectorAll('.reactions-panel, .live-chat-panel').forEach(p => {
                    p.classList.remove('show');
                });
            });
        });

        // Close share modal
        document.querySelectorAll('.close-share').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.share-modal').classList.remove('show');
            });
        });

        // Share modal backdrop click
        document.querySelectorAll('.share-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });

        // Share options
        document.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareContent(platform);
            });
        });

        // Close panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.live-fab-container') &&
                !e.target.closest('.reactions-panel') &&
                !e.target.closest('.live-chat-panel')) {
                document.querySelectorAll('.reactions-panel').forEach(p => p.classList.remove('show'));
            }
        });
    }

    sendReaction(reaction) {
        console.log(`Reaction sent: ${reaction}`);

        // Animate the reaction
        this.animateReaction(reaction);

        // In production, send to server
        // await fetch('/api/reactions', { method: 'POST', body: JSON.stringify({ reaction }) });
    }

    animateReaction(reaction) {
        const containers = document.querySelectorAll('.floating-reactions');

        containers.forEach(container => {
            const reactionEl = document.createElement('div');
            reactionEl.className = 'floating-reaction';
            reactionEl.textContent = reaction;

            // Random horizontal position
            reactionEl.style.left = `${Math.random() * 80 + 10}%`;

            container.appendChild(reactionEl);

            // Remove after animation
            setTimeout(() => {
                reactionEl.remove();
            }, 3000);
        });
    }

    sendChatMessage(message) {
        if (!message.trim()) return;

        console.log(`Chat message: ${message}`);

        // Add to chat
        this.addChatMessage('You', message, true);

        // In production, send to server via WebSocket or API
        // socket.emit('chat-message', message);

        // Simulate receiving a response (for demo)
        setTimeout(() => {
            const responses = [
                'Amen! 🙏',
                'God bless you!',
                'Hallelujah! ✨',
                'Praying with you!'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            this.addChatMessage('Community', randomResponse, false);
        }, 2000);
    }

    addChatMessage(username, message, isOwn = false) {
        const chatMessages = document.querySelectorAll('.chat-messages');

        chatMessages.forEach(container => {
            const messageEl = document.createElement('div');
            messageEl.className = `chat-message ${isOwn ? 'own' : ''}`;
            messageEl.innerHTML = `
                <span class="message-username">${username}</span>
                <span class="message-text">${this.escapeHtml(message)}</span>
                <span class="message-time">${this.formatTime(new Date())}</span>
            `;

            container.appendChild(messageEl);

            // Scroll to bottom
            container.scrollTop = container.scrollHeight;

            // Update badge
            if (!isOwn) {
                const badge = container.closest('.live-features').querySelector('.chat-badge');
                if (badge && !container.closest('.live-chat-panel').classList.contains('show')) {
                    const count = parseInt(badge.textContent) + 1;
                    badge.textContent = count;
                    badge.style.display = 'flex';
                }
            }
        });
    }

    shareContent(platform) {
        const url = window.location.href;
        const title = 'Manna Temple Radio & TV';
        const text = 'Listen to Manna Temple Radio and watch live TV - The Voice of The Truth';

        const shareURLs = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`,
        };

        if (platform === 'copy') {
            navigator.clipboard.writeText(url)
                .then(() => {
                    this.showToast('Link copied to clipboard!');
                    document.querySelector('.share-modal.show')?.classList.remove('show');
                })
                .catch(err => console.error('Copy failed:', err));
        } else if (shareURLs[platform]) {
            window.open(shareURLs[platform], '_blank', 'width=600,height=400');
            document.querySelector('.share-modal.show')?.classList.remove('show');
        }
    }

    startViewerCountSimulation() {
        // Simulate viewer count (in production, fetch from server)
        this.viewerCount = Math.floor(Math.random() * 50) + 10;

        setInterval(() => {
            // Randomly adjust viewer count
            const change = Math.floor(Math.random() * 5) - 2;
            this.viewerCount = Math.max(5, this.viewerCount + change);

            this.updateViewerCount(this.viewerCount);
        }, 10000); // Update every 10 seconds

        this.updateViewerCount(this.viewerCount);
    }

    updateViewerCount(count) {
        const countElements = document.querySelectorAll('.listener-count .count');
        countElements.forEach(el => {
            el.textContent = count;
        });
    }

    showToast(message) {
        // Remove existing toast
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toastHTML = `
            <div class="toast-notification show">
                <i class="material-icons">check_circle</i>
                <span>${message}</span>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', toastHTML);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            const toast = document.querySelector('.toast-notification');
            if (toast) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize live features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.liveFeatures = new LiveFeatures();
});
