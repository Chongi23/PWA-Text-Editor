const butInstall = document.getElementById('buttonInstall');

// Installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event-(DONE)
window.addEventListener('beforeinstallprompt', (event) => {
    //Store the triggered events
    window.deferredPrompt = event;
    //Remove the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element-(DONE)
butInstall.addEventListener('click', async () => {
const promptEvent= window.deferredPrompt;
if(!promptEvent){
    return;
}
//Show Prompt
promptEvent.prompt();
//Reset the deferred prompt variable, it can only be used once.
window.deferredPrompt = null;

butInstall.classList.toggle('hidden', true);
 });

// TODO: Add an handler for the `app-installed` event-(DONE)
window.addEventListener('appinstalled', (event) => {
//Clear prompt
window.deferredPrompt = null;
});
