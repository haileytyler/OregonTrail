// required models
var gameData = require('../models/gameData');

// required controllers
var gameController = require('../controllers/gameController');

// create a local copy of the current game data
var localGameData = gameController.currentGameData;

// Get Game Screen:
exports.getGameScreen = function(req, res) {
    res.setHeader('Content-Type', 'text/HTML');
    var currentGameScreen = gameData.gameScreen[req.params.gameScreenId];
    res.send(currentGameScreen);
}

// Save Profession:
exports.saveProfession = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var professionInfo = gameData.professions[req.params.ProfessionId];
    localGameData.playerProfession = professionInfo[0]; // profession name
    localGameData.playerMoney = professionInfo[1]; // profession $$
    res.send(professionInfo);
}

// Player Names:
// Get player names 
gameController.names = [];
exports.getAllPlayerNames = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(gameController.names);
}

// Save player name-
exports.savePlayerName = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	gameController.names.push(req.body.name);
    res.send(req.body);
}
localGameData.playerNames = gameController.names; // update local game data

// Save start month:
exports.saveStartMonth = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    localGameData.startMonth = req.body.month;
    res.send(localGameData.startMonth);
}
