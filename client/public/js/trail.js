window.addEventListener("load", function onEvent(e) {
    // set all modal boxes to not show on load
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal2").style.display = "none";
    document.getElementById("myModal3").style.display = "none";
    // set the messages pop-up to be an empty array
    document.getElementById("myPopup").innerHTML = [];
    // scroll to bottom of page so user can see game controls (image had to be a set size)
    window.scrollTo(0,document.body.scrollHeight);
    // fill in game data with day 0
    getMyGameData();
});

// pace differences HTML (used twice so saved to a variable)
var paceDiff = "<h5> Differences between paces</h5>" +
    "<p class = \"differences\">Steady: you travel about 8 hours a day, taking frequent rests. You " +
    "take care not to get too tired.</p>" + 
    "<p class = \"differences\">Strenuous: you travel about 12 hours a day, starting just after sunrise " +
    "and stopping shortly before sunset. You stop to rest only when necessary. " +
    "You finish each day feeling very tired.</p> " +
    "<p class = \"differences\">Grueling: you travel about 16 hours a day, starting before sunrise and continuing until dark. " +
    "You almost never stop to rest. You almost never stop to rest. You do not get enough sleep at night. " +
    "You finish each day feeling absolutely exhausted, and your health suffers.</p> " +
    "<p class = \"differences\">Resting: you set up camp and do not travel. As a result, " +
    "your health benefits and you get stronger. </p><h2 class = \"space\">Press SPACEBAR to continue</h2>";

document.addEventListener('keypress', function onEvent(e) {
    if (e.keyCode === 13 && document.getElementById("myModal").style.display === "none" &&
    document.getElementById("myModal2").style.display === "none" && 
    document.getElementById("myModal3").style.display === "none") { // only allow user to update game if no modals are open
        // close pop-up when user updates game
        if (document.getElementById("myPopup").classList.contains("show")) {
            document.getElementById("myPopup").classList.toggle("show");
        }
        updatePlayerGame(); // includes call to getMyGameData() to fill in HTML (so that they occur in order)
    } else if (e.code === "KeyR" && document.getElementById("myModal2").style.display === "block") { // "R" instead of enter incase they are spamming enter
        // all players died- only choice is to restart/ go to main menu
        resetPlayerGame();
        start_game();
    } else if (e.keyCode === 13 && document.getElementById("myModal3").style.display === "block" &&  // ENTER instead of "R" because user name input
    document.getElementById("userName").value.length == 0) { // make sure user inputs name
        alert("Enter your name!");
    } else if (e.keyCode === 13 && document.getElementById("myModal3").style.display === "block" && 
    document.getElementById("userName").value.length != 0) {
        // get today's date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        // call save user fetch with input HTML, player score, and date from above
        saveUserName(document.getElementById("userName").value, parseInt(document.getElementById("score").innerHTML), today);
        // restart / go to main menu
        resetPlayerGame();
        start_game();
    } else if (e.keyCode === 32 && document.getElementById("myModal").style.display === "none" &&
    document.getElementById("myModal2").style.display === "none" && 
    document.getElementById("myModal3").style.display === "none") { // only allow user to change pace if game is not over
        // show change pace modal
        document.getElementById("myModal").style.display = "block";
    } else if (e.keyCode === 32 && document.getElementById("myModal").style.display == "block") { // go back to pace choices from differences
        // replace HTML with orignal
        document.getElementById("paces").innerHTML = '<h4> Change Pace:</h4>' +
        '<h3> The pace at which you travel can change. Your choices are: </h3>' +
        '<ol>' +
            '<li id = "steady">a steady pace</li>' +
            '<li id = "strenuous">a strenuous pace</li>' +
            '<li id = "grueling">a grueling pace</li>' +
            '<li id = "resting">a resting pace</li>' +
            '<li id = "differences">find out what these different paces mean</li>' +
        '</ol>' +
        '<h2 class = "center">What is your choice?</h2>'
    } else if (e.keyCode === 49 && document.getElementById("myModal").style.display == "block") { // 1 -> steady (when pace modal is open)
        // save new pace
        changePlayerPace(0);
        // close pace modal
        document.getElementById("myModal").style.display = "none";
        // change HTML to include new pace
        getMyGameData();
    } else if (e.keyCode === 50 && document.getElementById("myModal").style.display == "block") { // 2 -> strenuous
        changePlayerPace(1);
        document.getElementById("myModal").style.display = "none";
        getMyGameData();
    } else if (e.keyCode === 51 && document.getElementById("myModal").style.display == "block") { // 3 -> grueling
        changePlayerPace(2);
        document.getElementById("myModal").style.display = "none";
        getMyGameData();
    } else if (e.keyCode === 52 && document.getElementById("myModal").style.display == "block") { // 4 -> resting
        changePlayerPace(3);
        document.getElementById("myModal").style.display = "none";
        getMyGameData();
    } else if (e.keyCode === 53 && document.getElementById("myModal").style.display == "block") { // 5 -> differences
        // change HTML to differences
        document.getElementById("paces").innerHTML = paceDiff;
    }
});

document.addEventListener('click', function onEvent(e){
    if (e.target && e.target.id == "closeModal") {  // click pace modal x -> close modal
        document.getElementById("myModal").style.display = "none";
    } // click events that are the same as the keypress ones  
    else if (e.target && e.target.id == "steady") {
        changePlayerPace(0);
        document.getElementById("myModal").style.display = "none";
        getMyGameData();
    } else if (e.target && e.target.id == "strenuous") {
        changePlayerPace(1);
        document.getElementById("myModal").style.display = "none";
        getMyGameData();
    } else if (e.target && e.target.id == "grueling") {
        changePlayerPace(2);
        document.getElementById("myModal").style.display = "none";
        getMyGameData();
    } else if (e.target && e.target.id == "differences") {
        document.getElementById("paces").innerHTML = paceDiff;
    } else if (e.target && e.target.id == "popup") { // click on 'Party Health Status' for messages on player deaths etc. 
        document.getElementById("myPopup").classList.toggle("show");
    } else if (e.target && e.target.id == "playAgain") { // click on restart message -> restart / go to main menu
        resetPlayerGame();
        start_game();
    } 
});


// get game data fetch
function getMyGameData() {
    fetch("/api/game/gameData").then(function(res) {
        if(res.status != 200) {
            console.log(res.status + " msg: " + res.value);
            return;
        }
        res.text().then(function(gameData) {
            console.log("recieved back " + gameData);
            // change game data HTML to respresent current day
            document.getElementById("days").innerHTML = JSON.parse(gameData)["daysOnTrail"];
            document.getElementById("miles").innerHTML = JSON.parse(gameData)["milesTraveled"];
            document.getElementById("health").innerHTML = JSON.parse(gameData)["groupHealth"];
            document.getElementById("weather").innerHTML = JSON.parse(gameData)["currentWeather"].type;
            document.getElementById("pace").innerHTML = JSON.parse(gameData)["currentPace"].name;
            document.getElementById("terrain").innerHTML = JSON.parse(gameData)["currentTerrain"].name;
            // count how many players are alive and then change HTML
            var status = JSON.parse(gameData)["playerStatus"];
            var playersAlive = 0;
            for (let i = 0; i < status.length; i++) {
                if (status[i] == true) playersAlive++;
            }
            document.getElementById("alive").innerHTML = playersAlive;

            // Messages:
            // put JSON messages from game data object in an array
            var playerMessages = [];
            for (let i in JSON.parse(gameData)["messages"]) {
                playerMessages.push([JSON.parse(gameData)["messages"] [i]]);
            }
            // change message string array to HTML strings
            var playerMessagesOutput = "";
            for (let i in playerMessages) {
                playerMessagesOutput += '<p>' + playerMessages[i] + '</p>'
            }
            // update message popup if needed
            if (document.getElementById("myPopup").innerHTML != playerMessagesOutput) {
                document.getElementById("myPopup").innerHTML = playerMessagesOutput;
                document.getElementById("myPopup").classList.toggle("show");
            }
            // game over if all players are dead
            for (let i in playerMessages) {
                if (playerMessages[i] == ("All your players have died. Game Over.") || 
                playerMessages[i] == ("Your party got lost in the snowy mountains and ate each other.")) {
                    // show game over modal that prompts the user to restart/ go to main menu and ends all game function
                    document.getElementById("myModal2").style.display = "block";
                    // scroll to bottom for user to see the modal
                    window.scrollTo(0,document.body.scrollHeight);
                }
            }
            // game over if player made it to Oregon
            for (let i in playerMessages) {
                if (playerMessages[i] == "You made it! Score: ") {
                    // show winner modal with input for user to put in name for top ten
                    document.getElementById("myModal3").style.display = "block";
                    // show score in winner modal
                    document.getElementById("score").innerHTML = playerMessages[playerMessages.length - 1];
                    // scroll to bottom for user to see the modal
                    window.scrollTo(0,document.body.scrollHeight);
                }
            }

            // update background based on terrain
            document.getElementById("wagon_on_trail").style.backgroundImage = "url(" + 
                JSON.parse(gameData)["currentTerrain"].imageUrl + ")";

            // move wagon across the screen
            var move = 900 - ((JSON.parse(gameData)["milesTraveled"]) * 2);
            document.getElementById("wagon").style.marginLeft = move + "px";
        })
    })
}

// update player game fetch
function updatePlayerGame() {
    fetch("/api/game/gameUpdate").then(function(res) {
        if(res.status != 200) {
            console.log(res.status + " msg: " + res.value);
            return;
        }
        res.text().then(function(data) {
            console.log("recieved back" + data);
            getMyGameData();  // call getGameData() to force correct order of fetches
        })
    })
}

// change pace fetch
function changePlayerPace(pace) {
    fetch('/api/game/paces/' + pace,
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

// resert game fetch
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

// save user name fetch
function saveUserName(name, score, date) {
    console.log('{"userName": "' + name + '", "score": ' + score + ', "date": "' + date + '"}');
    fetch('/api/topTen/scores',
        {
            method:'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: '{"userName": "' + name + '", "score": ' + score + ', "date": "' + date + '"}'
            
        }).then(function(response) {
            console.log(response);
            if (response.status !== 200) {
                console.log('problem with ajax call! ' + response.status + " msg: " + response.value);
                return;
            }
    });
}  