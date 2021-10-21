// Game Data object
function gameData(playerNames, playerStatus, playerProfession, playerMoney, startMonth, milesTraveled, 
    groupHealth, currentPace, daysOnTrail, currentWeather, currentTerrain, messages) {
    this.playerNames = playerNames; // store the names of the five players in the wagon team (in a array)
    this.playerStatus = playerStatus; // whether or not each player is alive (in a array)
    this.playerProfession = playerProfession; // profession chosen at start (has effect on starting $)
    this.playerMoney = playerMoney; // amount of money wagon team has
    this.startMonth = startMonth; // the month the game starts in (chosen at start)
    this.milesTraveled = milesTraveled; // how far the wagon has progressed
    this.groupHealth = groupHealth; // single representation of wagon team health
    this.currentPace = currentPace; // assign the current pace (use pace object)
    this.daysOnTrail = daysOnTrail; // how many days (1 day = 1 update) has the wagon team been on the trail
    this.currentWeather = currentWeather; // assign the current weather for this update (use weather object)
    this.currentTerrain = currentTerrain; // assign the current terrain for this update (use terrain object)
    this.messages = messages; // text to show the user on the client side
}

exports.createGameData = function(playerNames, playerStatus, playerProfession, playerMoney, startMonth, milesTraveled, 
    groupHealth, currentPace, daysOnTrail, currentWeather, currentTerrain, messages) {
    return new gameData(playerNames, playerStatus, playerProfession, playerMoney, startMonth, milesTraveled, 
        groupHealth, currentPace, daysOnTrail, currentWeather, currentTerrain, messages);
}

// Game Screen HTML (static):
exports.gameScreen = [];

const Screen0 = '<h1>Many kinds of people made the trip to Oregon</h1><p class = "game" >You may:</p><ol class = "center"> <li id = "banker">' +
                'Be a banker from Boston</li> <li id = "carpenter">Be a carpenter from Ohio</li>' +
                '<li id = "farmer">Be a farmer from Illinois</li><li id = "differences">Find out the differences between the choices' +
                '</li><h2>What is your choice?</h2>';

const Screen1 = '<div class = "gamediff"><p class = "diff"> Traveling to Oregon isn\'t easy! But if you\'re a banker, you\'ll have more money for supplies ' +
                'and services than a carpenter or a farmer. However, the harder you have to try, the more points you deserve! ' +
                'Therefore, the farmer earns the greatest number of points and the banker earns the least. </p>' +
                '<h2 id = "backToProf">Press ENTER to continue</h2></div>';

const Screen2 = '<h1> What is the first name of the wagon leader?</h1>' +
                '<p class = "game">Leader Name: <input id = "player1" type = "text"/>' +
                '<button type = "button" class = "button" id = "NextButton">Next</button> </p>';

const Screen3 = '<h2>What are the names of your wagon party</h2>' +
                '<p class = "game">Player name: <input id = "player2" type = "text"/> <br/>' +
                'Player name: <input id = "player3" type = "text"/> <br/>' +
                'Player name: <input id = "player4" type = "text"/> <br/>' +
                'Player name: <input id = "player5" type = "text"/> <br/>' +
                '<button type = "button" class = "button" id = "NextButton" >Next</button> </p>';

const Screen4 = '<p class = "center">It is 1848. Your jumping off place for Oregon is Independence, Missouri. You must decide which month to' +
                ' leave Independence.</p><ol class = "center"><li id = "marchItem">March</li><li id = "aprilItem"' +
                '>April</li><li id = "mayItem">May</li><li id = "juneItem">June</li><li id = "julyItem">July</li></ol><div' +
                ' id = "selectedOption"> <h2>What is your choice?</h2></div>';

const Screen5 = '<p class = "game"> Congratulations! You are ready to start on your journey. </p>' +
                '<p class = "game"> Here are the settings you selected for the game: </p>' +
                '<div id = "returnData" >' + 
                '<p class = "game">Wagon Leader: <span id = "rPlayer1Name"></span><br />' +
                'Member: <span id = "rPlayer2Name"></span><br />' +
                'Member: <span id = "rPlayer3Name"></span><br />' +
                'Member: <span id = "rPlayer4Name"></span><br />' +
                'Member: <span id = "rPlayer5Name"></span><br />' +
                'Your profession: <span id = "rProfession"></span><br />' +
                'Current bank account: <span id = "rMoney"></span><br /> ' +
                'Month leaving: <span id = "rMonth"></span><br />' +
                '<span class = "center"> <button type = "button" class = "button-2" id = "StartButton" >Start</button> </span></p>' +
                '</div>';


exports.gameScreen.push(Screen0);
exports.gameScreen.push(Screen1);
exports.gameScreen.push(Screen2);
exports.gameScreen.push(Screen3);
exports.gameScreen.push(Screen4);
exports.gameScreen.push(Screen5);


// Professions (static):
exports.professions = [];

const banker = ["banker", 2000];
const carpenter = ["carpenter", 1800];
const farmer = ["farmer", 1500];

exports.professions.push(banker);
exports.professions.push(carpenter);
exports.professions.push(farmer);

