// Top Ten object:
function topTen(userName, score, date) {
    this.userName = userName; // player name
    this.score = score; // player score (use proffesions to calculate score)
    this.date = date; // date of game
}

exports.createTen = function(userName, score, date) {
    return new topTen(userName, score, date);
}