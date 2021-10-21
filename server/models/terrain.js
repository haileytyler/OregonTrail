// Terrain object
function terrain(name, imageUrl, miles, probability) {
    this.name = name; // name for terrain
    this.imageUrl = imageUrl; // the url of the image that will be displayed
    this.miles = miles; // terrain effect on miles covered
    this.probability = probability; // probability of this terrain (all equal- added so we can use same function as weather)
}


function createTerrain(name, imageUrl, miles, probability) {
    return new terrain(name, imageUrl, miles, probability);
}

// Terrain (static):
exports.terrains = [];

var desert = createTerrain('Desert', '/images/Desert.png', 0.7, 0.2);
var forest = createTerrain('Forest', '/images/Forest.png', 0.8, 0.2);
var grassland = createTerrain('Grassland', '/images/Grassland.png', 0.9, 0.2);
var mountains = createTerrain('Mountains', '/images/Mountains.png', 0.6, 0.2);
var plains = createTerrain('Plains', '/images/Plains.png', 1, 0.2);

exports.terrains.push(desert);
exports.terrains.push(forest);
exports.terrains.push(grassland);
exports.terrains.push(mountains);
exports.terrains.push(plains);


