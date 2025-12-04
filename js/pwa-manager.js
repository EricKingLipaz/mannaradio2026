/**
 * PWA Manager - Service Worker, Install Prompt, Push Notifications
 * Features: App Installation, Offline Support, Update Notifications
 */

class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;

        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.checkIfInstalled();
        this.setupUpdateNotification();
        this.requestNotificationPermission();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/service-worker.js');
                console.log('Service Worker registered successfully:', registration.scope);

                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute

                return registration;
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }

    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the default install prompt
            e.preventDefault();
            this.deferredPrompt = e;

            // Show custom install button
            this.showInstallButton();
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            this.isInstalled = true;
            this.hideInstallButton();

            // Show success message
            this.showNotification('App Installed', 'Manna Temple has been installed successfully!');
        });
    }

    showInstallButton() {
        // Check if install button already exists
        if (document.querySelector('.pwa-install-prompt')) return;

        const installPromptHTML = `
            <div class="pwa-install-prompt">
                <div class="install-content">
                    <img src="/images/icon.png" alt="Manna Temple" class="install-icon">
                    <div class="install-text">
                        <h3>Install Manna Temple</h3>
                        <p>Get quick access and offline support</p>
                    </div>
                    <div class="install-actions">
                        <button class="install-btn primaryBtn">Install</button>
                        <button class="dismiss-btn">Not now</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', installPromptHTML);

        // Attach event listeners
        const installBtn = document.querySelector('.install-btn');
        const dismissBtn = document.querySelector('.dismiss-btn');
        const prompt = document.querySelector('.pwa-install-prompt');

        if (installBtn) {
            installBtn.addEventListener('click', () => this.installApp());
        }

        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                prompt.remove();
                // Don't show again for 7 days
                localStorage.setItem('install-dismissed', Date.now() + (7 * 24 * 60 * 60 * 1000));
            });
        }

        // Check if previously dismissed
        const dismissed = localStorage.getItem('install-dismissed');
        if (dismissed && Date.now() < parseInt(dismissed)) {
            prompt.remove();
        } else {
            // Show after 30 seconds
            setTimeout(() => {
                prompt.classList.add('show');
            }, 30000);
        }
    }

    hideInstallButton() {
        const prompt = document.querySelector('.pwa-install-prompt');
        if (prompt) {
            prompt.remove();
        }
    }

    async installApp() {
        if (!this.deferredPrompt) return;

        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for the user's response
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User ${outcome} the install prompt`);

        // Clear the deferred prompt
        this.deferredPrompt = null;

        // Hide the install button
        this.hideInstallButton();
    }

    checkIfInstalled() {
        // Check if app is running in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('App is running in standalone mode');
        }
    }

    setupUpdateNotification() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                this.showUpdateNotification();
            });
        }
    }

    showUpdateNotification() {
        const updateHTML = `
            <div class="pwa-update-notification">
                <div class="update-content">
                    <i class="material-icons">system_update</i>
                    <span>A new version is available!</span>
                    <button class="reload-btn primaryBtn">Update</button>
                </div>
            </div>
        `;

        // Remove existing notification if any
        const existing = document.querySelector('.pwa-update-notification');
        if (existing) existing.remove();

        document.body.insertAdjacentHTML('beforeend', updateHTML);

        const reloadBtn = document.querySelector('.reload-btn');
        if (reloadBtn) {
            reloadBtn.addEventListener('click', () => {
                window.location.reload();
            });
        }

        // Auto-show
        setTimeout(() => {
            const notification = document.querySelector('.pwa-update-notification');
            if (notification) notification.classList.add('show');
        }, 100);
    }

    async requestNotificationPermission() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            // Don't request permission immediately, wait for user interaction
            // This is better UX - request when user engages with prayer requests or events

            // Check current permission
            if (Notification.permission === 'default') {
                // You can request permission when appropriate, e.g.:
                // - After user submits a prayer request
                // - When user opens events section
                // - After app is installed
                console.log('Notification permission not yet requested');
            }
        }
    }

    async requestPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
                console.log('Notification permission granted');
                this.subscribeToPushNotifications();
            }
        }
    }

    async subscribeToPushNotifications() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready;

                // You would need a VAPID public key from your server for production
                // This is just a placeholder
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY_HERE')
                });

                console.log('Push subscription:', subscription);

                // Send subscription to your server
                // await this.sendSubscriptionToServer(subscription);

            } catch (error) {
                console.error('Failed to subscribe to push notifications:', error);
            }
        }
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    showNotification(title, body, options = {}) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body,
                icon: '/images/icon.png',
                badge: '/images/icon.png',
                ...options
            });

            notification.addEventListener('click', () => {
                window.focus();
                notification.close();
            });
        }
    }

    isAppInstalled() {
        return this.isInstalled;
    }

    // Check if app is online
    checkOnlineStatus() {
        const updateOnlineStatus = () => {
            const condition = navigator.onLine ? 'online' : 'offline';
            console.log(`App is ${condition}`);

            // Show offline indicator
            if (!navigator.onLine) {
                this.showOfflineIndicator();
            } else {
                this.hideOfflineIndicator();
            }
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        updateOnlineStatus();
    }

    showOfflineIndicator() {
        if (document.querySelector('.offline-indicator')) return;

        const offlineHTML = `
            <div class="offline-indicator">
                <i class="material-icons">cloud_off</i>
                <span>You're offline</span>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', offlineHTML);

        setTimeout(() => {
            document.querySelector('.offline-indicator')?.classList.add('show');
        }, 100);
    }

    hideOfflineIndicator() {
        const indicator = document.querySelector('.offline-indicator');
        if (indicator) {
            indicator.classList.remove('show');
            setTimeout(() => indicator.remove(), 300);
        }
    }
}

// Initialize PWA manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pwaManager = new PWAManager();
    window.pwaManager.checkOnlineStatus();
});
