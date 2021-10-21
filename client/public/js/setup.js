let gameContainer = document.getElementById("gameContainer");
var gameScreen = 0;

window.addEventListener("load", function onEvent(e) {
    // on load fetch the first game screen
    fetchGameScreen();
});

document.addEventListener('keypress', function onEvent(e) {
    if (e.keyCode === 32) { // space -> main menu
        if (gameScreen == 2 && document.activeElement != document.getElementById("player1")) { // allow spaces for wagon leader
            // reset game so player can set up their game again
            resetPlayerGame();
            // go to main menu
            start_game();
        } else if (gameScreen == 3 && (document.activeElement != document.getElementById("player2") && // allow spaces for wagon party
        document.activeElement != document.getElementById("player3") && 
        document.activeElement != document.getElementById("player4") &&
        document.activeElement != document.getElementById("player5"))) {
            resetPlayerGame();
            start_game();
        } else if (gameScreen != 2 && gameScreen != 3) { // all other gamescreens
            resetPlayerGame();
            start_game();
        }
    } else if (e.keyCode === 49) { 
        if (gameScreen == 0) { // 1 -> banker
            // move to next setup screen (1 is differences)
            gameScreen = 2;
            // save profession choice
            savePlayerProfession(0);
            // update game screen
            fetchGameScreen();
        } else if (gameScreen == 4) { // 1 -> March
            // move to summary screen
            gameScreen = 5;
            // save start month
            savePlayerStartMonth("March");
            // update game screen
            fetchGameScreen();
        }
    } else if (e.keyCode === 50) { // 2 -> carpenter
        if (gameScreen == 0) {
            gameScreen = 2;
            savePlayerProfession(1);
            fetchGameScreen();
        } else if (gameScreen == 4) { // 2 -> April
            gameScreen = 5;
            savePlayerStartMonth("April");
            fetchGameScreen();
        }
    } else if (e.keyCode === 51) { // 3 -> farmer
        if (gameScreen == 0) {
            gameScreen = 2;
            savePlayerProfession(2);
            fetchGameScreen();
        } else if (gameScreen == 4) { // 3 -> May
            gameScreen = 5;
            savePlayerStartMonth("May");
            fetchGameScreen();
        }
    } else if (e.keyCode === 52) { // 4 -> differences b/t the choices
        if (gameScreen == 0) {
            gameScreen = 1;
            fetchGameScreen();
        } else if (gameScreen == 4) { // 4 -> June
            gameScreen = 5;
            savePlayerStartMonth("June");
            fetchGameScreen();
        }
    } else if (e.keyCode === 53) { // 5 -> July
        if (gameScreen == 4) {
            gameScreen = 5;
            savePlayerStartMonth("July");
            fetchGameScreen();
        }
    } else if (e.keyCode === 13) { // enter -> profession choices
        if (gameScreen == 1) {
            gameScreen = 0;
            fetchGameScreen();
        }
    }
});

document.addEventListener('click', function onEvent(e){
    if (e.target && e.target.id == "NextButton") {
        // use a next button to save input while moving to next screen
        if (gameScreen == 2 && document.getElementById("player1").value.length != 0) { // save wagon leader
            savePlayer(document.getElementById("player1").value);
            gameScreen++;
        } else if (gameScreen == 2 && document.getElementById("player1").value.length == 0) { 
            // if player did not type in leader name -> alert
            alert("Enter wagon leader name");

        } else if (gameScreen == 3) { // save rest of wagon party
            // if player did not type in a party name -> alert
            var noName = true;
            for (let i = 2; i <= 5; i++) {
                if (document.getElementById("player" + i).value.length == 0) {
                    alert("Enter all party names.");
                    noName = false;
                }
            }
            if (noName) {
                for (let i = 2; i <= 5; i++) {
                    savePlayer(document.getElementById("player" + i).value);
                }
                gameScreen++;
            }
        }
        if (gameScreen > 4) gameScreen = 4; // stay in array bounds
        // update game screen
        fetchGameScreen()
    } else if (e.target && e.target.id =="StartButton") { // click start button on summary page -> go to trail
        go_to_trail();
    } // click events that are the same as the keypress ones 
    else  if (e.target && e.target.id == "banker") {
        gameScreen = 2;
        savePlayerProfession(0);
        fetchGameScreen();
    } else if (e.target && e.target.id == "carpenter") {
        gameScreen = 2;
        savePlayerProfession(1);
        fetchGameScreen();
    } else if (e.target && e.target.id == "farmer") {
        gameScreen = 2;
        savePlayerProfession(2);
        fetchGameScreen();
    } else if (e.target && e.target.id == "differences") {
        gameScreen = 1;
        fetchGameScreen();
    } else if (e.target && e.target.id == "mainmenu") {
         resetPlayerGame();
         start_game();
    } else if(e.target && e.target.id == "backToProf") {
        gameScreen = 0;
        fetchGameScreen();
    } else if(e.target && e.target.id == "marchItem") {
        gameScreen = 5;
        savePlayerStartMonth("March");
        fetchGameScreen();
    } else if(e.target && e.target.id == "aprilItem") {
        gameScreen = 5;
        savePlayerStartMonth("April");
        fetchGameScreen();
    } else if(e.target && e.target.id == "mayItem") {
        gameScreen = 5;
        savePlayerStartMonth("May");
        fetchGameScreen();
    } else if(e.target && e.target.id == "juneItem") {
        gameScreen = 5;
        savePlayerStartMonth("June");
        fetchGameScreen();
    } else if(e.target && e.target.id == "julyItem") {
        gameScreen = 5;
        savePlayerStartMonth("July");
        fetchGameScreen();
    }
});

function go_to_trail() {
    // go to trail
    window.location.pathname = "/trail";
}

// reset player game fetch
function resetPlayerGame() {
    fetch("/api/game/resetGame").then(function(res) {
        if(res.status != 200) {
            console.log(res.status + " msg: " + res.value);
            return;
        }
        res.text().then(function(data) {
            console.log("recieved back" + data);
        })
    })
}

// get game screen fetch
function fetchGameScreen() {
    fetch("/api/setup/screen/" + gameScreen).then(function(res) {
        if(res.status != 200) {
            console.log(res.status + " msg: " + res.value);
            return;
        }
        res.text().then(function(data) {
            if (gameScreen == 5) {
                getCurrentGameData();
            }
            document.getElementById("gameContainer").innerHTML = data;
        })
    });
}

// save profession fetch
function savePlayerProfession(prof) {
    fetch('/api/setup/profession/' + prof,
        {
            method:'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        }).then(function(response) {
            if (response.status !== 200) {
                console.log('problem with ajax call! ' + response.status + " msg: " + response.value);
                return;
            }
    });
}   

// save start month fetch
function savePlayerStartMonth(mon) {
    fetch('/api/setup/month',
        {
            method:'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: '{"month": "' + mon + '"}'
        }).then(function(response) {
            if (response.status !== 200) {
                console.log('problem with ajax call! ' + response.status + " msg: " + response.value);
                return;
            }
    });
}   

// save player name(s) fetch
function savePlayer(playerName) {
    fetch('/api/setup/player',
        {
            method:'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: '{"name": "' + playerName + '"}'
        }).then(function(response) {
            if (response.status !== 200) {
                console.log('problem with ajax call! ' + response.status + " msg: " + response.value);
                return;
            }
    });
} 

// current game data fetch for summary page
function getCurrentGameData() {
    fetch("/api/game/gameData").then(function(res) {
        if(res.status != 200) {
            console.log(res.status + " msg: " + res.value);
            return;
        }
        res.text().then(function(gameData) {
            console.log("recieved back " + gameData);
            // insert player names into HTML
            document.getElementById("rPlayer1Name").innerHTML = JSON.parse(gameData)["playerNames"][0];
            document.getElementById("rPlayer2Name").innerHTML = JSON.parse(gameData)["playerNames"][1];
            document.getElementById("rPlayer3Name").innerHTML = JSON.parse(gameData)["playerNames"][2];
            document.getElementById("rPlayer4Name").innerHTML = JSON.parse(gameData)["playerNames"][3];
            document.getElementById("rPlayer5Name").innerHTML = JSON.parse(gameData)["playerNames"][4];
            // insert profession into HTML
            document.getElementById("rProfession").innerHTML = JSON.parse(gameData)["playerProfession"];
            // insert player money into HTML
            document.getElementById("rMoney").innerHTML = JSON.parse(gameData)["playerMoney"];
            // insert start month into HTML
            document.getElementById("rMonth").innerHTML = JSON.parse(gameData)["startMonth"];
        })
    });
}