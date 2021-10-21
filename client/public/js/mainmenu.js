document.addEventListener('keypress', function onEvent(e) {
    if (e.keyCode === 49) { // 1 -> set up
        go_to_setup()
    } else if (e.keyCode === 50) { // 2 -> learn about the trail
        go_to_info()
    } else if (e.keyCode === 51){ // 3 -> top ten
        go_to_top_ten()
    } else if (e.keyCode === 52){ // 4 -> toggle sound
        toggle_sound()
    }
});

// Click (1) to go to setup
document.getElementById("go_to_setup").addEventListener('click', function onEvent(e) {
    go_to_setup();
});

function go_to_setup() {
    window.location.pathname = "/setup";
}

// Click (2) to go to top ten
document.getElementById("go_to_top_ten").addEventListener('click', function onEvent(e) {
    go_to_top_ten();
});

function go_to_top_ten() {
    window.location.pathname = "/topten";
}

// Click (3) to go to info page
document.getElementById("trail_info").addEventListener('click', function onEvent(e) {
    go_to_info();
});



function go_to_info() {
    // replace main menu with game info
    document.getElementById("Learn").innerHTML = '<p id = "howToPlay">Try taking a journey by covered wagon across 500 ' +
    'miles of plains, deserts, and mountains. Press space during the game to change your pace to conserve health or ' +
    'to try to get to Oregon faster. Your score will depend on how many people you kept alive, your group health, and ' +
    'how many days it took you to get to Oregon.  <h2>Good Luck!</h2>' + 
    '<h3 id = "mainmenu">Press the spacebar for the main menu</h3>';

    // Click the message to go back to main menu
    document.getElementById("mainmenu").addEventListener('click', function onEvent(e) {
        start_game();
    })
    // Press SPACE for the main menu
    document.addEventListener('keypress', function onEvent(e) {
        if (e.keyCode === 32){
            start_game();
        }
    });
}

// Click (4) to toggle sound
document.getElementById("toggle_sound").addEventListener('click', function onEvent(e) {
    toggle_sound()
});

function toggle_sound(){
    var x = document.getElementById("toggle_sound");
    if(sessionStorage.getItem("music") == "On") {
        // Change to off state
        x.innerHTML = "Turn Sound On";
        sessionStorage.setItem("music", "Off");
        mySound.pause();
    }
    else {
        // Change to on state
        x.innerHTML = "Turn Sound Off";
        sessionStorage.setItem("music", "On");
        mySound.play();
    } 
}

// Make sure the correct audio message is diplayed when the page loads
window.addEventListener('load', function onEvent(e) {
    sound()
}); 

function sound() {
    var x = document.getElementById("toggle_sound");
    if(sessionStorage.getItem("music") == "Off") {
        // Turn on music when off
        x.innerHTML = "Turn Sound On";
    }
    else {
        // Turn off music when on
        x.innerHTML = "Turn Sound Off";
    }
} 
