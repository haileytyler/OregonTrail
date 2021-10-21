const express = require('express');
const app = express();
app.use(express.static('client/public'));
const port = 1337;

// Client Side Routes:

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: './client/views' })
    });
app.get('/mainmenu', function (req, res) {
    res.sendFile('mainmenu.html', {root: './client/views' })
    });
app.get('/topten', function (req, res) {
    res.sendFile('topten.html', {root: './client/views' })
    });
app.get('/setup', function (req, res) {
    res.sendFile('setup.html', {root: './client/views' })
    });
app.get('/trail', function (req, res) {
    res.sendFile('trail.html', {root: './client/views' })
    });


// API Routes:

var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

// game controller:
var game = require('./controllers/gameController');

// paces post
app.route('/api/game/paces/:paceId')
    .post(game.changePace);

// get game data
app.route('/api/game/gameData')
    .get(game.getGameData);

// game update
app.route('/api/game/gameUpdate')
    .get(game.updateGame);

// reset game
app.route('/api/game/resetGame')
    .get(game.resetGame);

// top ten controller:
var topTenController = require('./controllers/topTenController');

// top ten get and post
app.route('/api/topTen/scores')
    .get(topTenController.getTopScores)
    .post(topTenController.saveTopScore);
    

// setup controller:
var setupController = require('./controllers/setupController');

// player get and post
app.route('/api/setup/player')
    .get(setupController.getAllPlayerNames)
    .post(setupController.savePlayerName);

// profession post
app.route('/api/setup/profession/:ProfessionId')
    .post(setupController.saveProfession);

// game screen get
app.route('/api/setup/screen/:gameScreenId')
    .get(setupController.getGameScreen);

// start month post
app.route('/api/setup/month')
    .post(setupController.saveStartMonth); // ex {"month" : "june"}
 

app.listen(port, () => {
  console.log(`Oregon Trail listening at http://localhost:${port}`);
});