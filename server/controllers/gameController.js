// required models
var gameDataModel = require('../models/gameData');
var terrainModel = require('../models/terrain');
var weatherModel = require('../models/weather');
var paceModel = require('../models/pace');

// Get all paces
exports.getAllPaces = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(paceModel.paces);
}

// declare gameData object in exports and use getGameData (this is day 0- use the pace that the user sets)
// i chose the first day weather and terrain- always starts off on the right foot :)
exports.names = [];
exports.playerStatus = [true, true, true, true, true];
exports.milesTraveled = 0;
exports.groupHealth = 100;
exports.daysOnTrail = 0;
exports.messages = [];
exports.currentGameData = gameDataModel.createGameData(exports.names, exports.playerStatus, "", "", "", exports.milesTraveled,
    exports.groupHealth, paceModel.paces[0], exports.daysOnTrail, weatherModel.weatherList[2], terrainModel.terrains[2], 
    exports.messages);

// Change Pace
exports.changePace = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    exports.currentGameData.currentPace = paceModel.paces[req.params.paceId];
    res.send(exports.currentGameData.currentPace);
}

// Update Game:
exports.updateGame = function(req, res) {
    // Miles traveled:
    exports.milesTraveled += Math.floor(exports.currentGameData.currentPace.miles * exports.currentGameData.currentWeather.mileChange * 
        exports.currentGameData.currentTerrain.miles);
    if (exports.milesTraveled > 500) {
        exports.milesTraveled = 500; // miles is capped at 500
    }
    exports.currentGameData.milesTraveled = exports.milesTraveled; // update current game data

    // Group Health
    exports.groupHealth += (exports.currentGameData.currentPace.healthChange + exports.currentGameData.currentWeather.healthChange);
    if (exports.groupHealth > 100) {
        exports.groupHealth = 100; // group health is capped at 100
    } else if (exports.groupHealth < 0) {
        exports.groupHealth = 0; // minimum health of 0
    }
    exports.currentGameData.groupHealth = exports.groupHealth; // update current game data

    // Kill off players based on group health
    var deaths = ["measles.", "exhaustion.", "typhoid.", "dysentery."]; // possible deaths
    if (exports.groupHealth >= 50) {
        // console.log("In good health");
    } else if (exports.groupHealth >= 20 && exports.groupHealth < 50) {
        // poor health- 3% chance each player dies per day 
        for (let i = 0; i < 5; i++) {
            if (Math.random() < 0.03 && exports.playerStatus[i] != false) {
                exports.playerStatus[i] = false;
                exports.messages.push(exports.currentGameData.playerNames[i] + " has died of " + 
                deaths[Math.floor(Math.random() * 4)]); // pick a random death
            }
        }
    } else if (exports.groupHealth > 0 && exports.groupHealth < 20) {
        // very poor- 10% chance each player per day 
        for (let i = 0; i < 5; i++){
            if (Math.random() < 0.1 && exports.playerStatus[i] != false) {
                exports.playerStatus[i] = false;
                exports.messages.push(exports.currentGameData.playerNames[i] + " has died of "+ 
                deaths[Math.floor(Math.random() * 4)]); // pick a random death
            }
        }
    } else {
        // game over- everyone is dead
        for (let i = 0; i < exports.playerStatus.length; i++) {
            exports.playerStatus[i] = false;
        }
        exports.messages.push("All your players have died. Game Over.");
    }
    // all die from probability
    var deadCount = 0;
    for (let i = 0; i < exports.playerStatus.length; i++) {
        if (exports.playerStatus[i] == false) deadCount++;
    }
    if (deadCount == 5 && !exports.messages.includes("All your players have died. Game Over.")) {
        exports.messages.push("All your players have died. Game Over.");
    } 
    exports.currentGameData.playerStatus = exports.playerStatus; // update current game data

    // days on trail
    exports.daysOnTrail++;
    exports.currentGameData.daysOnTrail = exports.daysOnTrail; // update current game data

    // Weighted random choice function (adapted from Michael Czechowski):
    // multiply indices in proportion to probability
    var weight = function(arr) {
        return [].concat(...arr.map((obj) => Array(Math.ceil(obj.probability * 100)).fill(obj))); 
    }
    var pick = function(arr) {
        let weighted = weight(arr);
        return weighted[Math.floor(Math.random() * weighted.length)]
    }
    var currentWeather = pick(weatherModel.weatherList); // random weather
    exports.currentGameData.currentWeather = currentWeather; // update current game data

    /* Customization: 
        - probability of getting a terrain increases if you were in this terrain yesterday
        - probability of getting it will increase to 50% and other probabilities will adjust accordingly 
    */
    for (let i = 0; i < terrainModel.terrains.length; i++) {
        if (terrainModel.terrains[i].name == exports.currentGameData.currentTerrain.name) {
            terrainModel.terrains[i].probability = 0.5;
        } else {
            terrainModel.terrains[i].probability = 0.125;
        }
    }

    var currentTerrain = pick(terrainModel.terrains); // random terrain
    exports.currentGameData.currentTerrain = currentTerrain; // update current game data

    // calculate score
    var scoreCalc = function(status, health, days) {
        // only get a score if you make it to Oregon
        var score = 0;
        // player status affecting score
        var playersAlive = 0;
        for (var i = 0; i < status.length; i++) {
            if (status[i] == true) playersAlive++;
        }
        score += (playersAlive * 400); // score increase (based on actual game)

        // group health affecting score- a specific amount per person in each health category (from actual game)
        if (health >= 80) {
            score += (playersAlive * 500);
        } else if (health >= 50 && health < 80) {
            score += (playersAlive * 400);
        } else if (health >= 20 && health < 50) {
            score += (playersAlive * 300);
        } else if (health > 0 && health < 20) {
            score += (playersAlive * 200)
        }

        // days ahead of schedule affect on score (must make it in 45 days)
        score += (45 - days) * 200

        // double as a carpenter and triple as a farmer (from the actual game- may not implement as it does not affect gameplay now)
        
        return score;
    }

    // Messages:
    if (exports.daysOnTrail == 45 && exports.milesTraveled != 500) {
        exports.messages.push("Your party got lost in the snowy mountains and ate each other.");
    }
    if (exports.milesTraveled == 500) {
        exports.messages.push("You made it! Score: ");
        exports.messages.push(scoreCalc(exports.playerStatus, exports.groupHealth, exports.daysOnTrail));
    }
        
    res.send(exports.currentGameData);
}

// Reset Game:
exports.resetGame = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    // reset
    exports.names = [];
    exports.currentGameData.playerNames = exports.names;
    exports.playerStatus = [true, true, true, true, true]
    exports.currentGameData.playerStatus = exports.playerStatus;
    exports.currentGameData.playerProfession = "";
    exports.currentGameData.playerMoney = "";
    exports.currentGameData.startMonth = "";
    exports.milesTraveled = 0;
    exports.currentGameData.milesTraveled = exports.milesTraveled;
    exports.groupHealth = 100;
    exports.currentGameData.groupHealth = exports.groupHealth;
    exports.currentGameData.currentPace = paceModel.paces[0];
    exports.daysOnTrail = 0;
    exports.currentGameData.daysOnTrail = exports.daysOnTrail;
    exports.currentGameData.currentWeather = weatherModel.weatherList[2];
    exports.currentGameData.currentTerrain = terrainModel.terrains[2];
    exports.messages = [];
    exports.currentGameData.messages = exports.messages;
    
    res.send(exports.currentGameData);
}

// Get Game Data:
exports.getGameData = function(req, res) {
    // return json of the game data
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(exports.currentGameData);
}


