// Press spacebar to start
document.addEventListener('keypress', function onEvent(e) {
    if (e.keyCode === 32) {
        start_game();
    }
});

// Click message to start
document.getElementById("clicking").addEventListener('click', function onEvent(e) {
    start_game()
}); 

// Touch message to start (for tablet users)
document.getElementById("clicking").addEventListener('touchend', function onEvent(e) {
    start_game()
}); 


// Enable session storage for music
try {
    sessionStorage.setItem("Test", 1);
} catch (error) {
    alert("Please enable local storage access in your browser settings in order to get the full experience");
}

// Enable autoplay for music
mySound.play().catch(error => {
    alert("Please enable autoplay in your browser settings in order to get the full experience");
}); 