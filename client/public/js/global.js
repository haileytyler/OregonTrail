// Create background music
var mySound;
mySound = new Audio("/music/OregonTrailMusic.mp3"); // my friend made this for me :)
mySound.loop = true; // set to loop


// Default sound on
if(sessionStorage.getItem("music") != "Off") {
    sessionStorage.setItem("music", "On");
     mySound.play();
}

// Start where the music stopped on the last page
window.addEventListener("load", function onEvent(e) {
    load_playback()
});

function load_playback(){
    mySound.currentTime = sessionStorage.getItem("playback");
} 

// Save stopping point
window.addEventListener("pagehide", function onEvent(e) { // had to use pagehide instead of unload for safari!
    save_playback()
});

function save_playback(){
    sessionStorage.setItem("playback", mySound.currentTime);
}


// Go to main menu
function start_game() {
    window.location.pathname = "/mainmenu";
}