// Pace object
function pace(name, miles, healthChange) {
    this.name = name; // name of pace
    this.miles = miles; // # of miles a player will move in a day when traveling at this pace
    this.healthChange = healthChange; // the effect moving at this pace has on health
}

// Paces (static)
function createPace(name, miles, healthChange) {
    return new pace(name, miles, healthChange);
}

exports.paces = [];

// miles moved (+10 from assignment)
var steady =  createPace("Steady", 35, 0);
var strenuous = createPace("Strenuous", 40, -3);
var grueling = createPace("Grueling", 45, -8);
var resting = createPace("Resting", 0, 5);

exports.paces.push(steady);
exports.paces.push(strenuous);
exports.paces.push(grueling);
exports.paces.push(resting);
