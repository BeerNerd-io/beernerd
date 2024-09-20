document.addEventListener('DOMContentLoaded', () => {
    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // Variables to store the install prompt event and PWA status
    let deferredPrompt;
    let isPWAInstalled = false;

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPromotion();
    });

    // Navigation drawer functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navDrawer = document.querySelector('.nav-drawer');
    const header = document.querySelector('header');

    if (navToggle && navDrawer && header) {
        navToggle.addEventListener('click', () => {
            navDrawer.classList.toggle('open');
            navToggle.classList.toggle('open');
            header.classList.toggle('open');
        });

        // Close drawer when clicking outside
        document.addEventListener('click', (event) => {
            if (!navDrawer.contains(event.target) && !navToggle.contains(event.target)) {
                navDrawer.classList.remove('open');
                navToggle.classList.remove('open');
                header.classList.remove('open');
            }
        });
    }

    // Initialize online/offline status
    updateOnlineStatus();

    // Function to show install promotion (you can customize this based on your UI)
    function showInstallPromotion() {
        const installButton = document.getElementById('install-button');
        if (installButton) {
            installButton.style.display = 'block';
            installButton.addEventListener('click', installPWA);
        }
    }

    // Function to handle PWA installation
    function installPWA() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    isPWAInstalled = true;
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        }
    }

    // Listen for the appinstalled event
    window.addEventListener('appinstalled', (evt) => {
        console.log('BeerNerd PWA was installed');
        isPWAInstalled = true;
    });

    // Basic offline functionality
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    function updateOnlineStatus(event) {
        const condition = navigator.onLine ? "online" : "offline";
        console.log(`Connection status: ${condition}`);
        // You can update UI here based on online/offline status
        if (condition === "offline") {
            showOfflineNotification();
        } else {
            hideOfflineNotification();
        }
    }

    function showOfflineNotification() {
        const offlineNotification = document.getElementById('offline-notification');
        if (offlineNotification) {
            offlineNotification.style.display = 'block';
        }
    }

    function hideOfflineNotification() {
        const offlineNotification = document.getElementById('offline-notification');
        if (offlineNotification) {
            offlineNotification.style.display = 'none';
        }
    }
});
