const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }
    // Show the install prompt
    promptEvent.prompt();
    // Wait for the user to respond to the prompt
    const result = await promptEvent.userChoice;
    console.log('User choice:', result);
    // Reset the deferred prompt variable, it can only be used once
    window.deferredPrompt = null;
    // Hide the install button again after installing
    butInstall.style.display = 'none';
});

window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully!', event);
    // Clear the deferredPrompt variable
    window.deferredPrompt = null;
});