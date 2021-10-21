document.addEventListener('keypress', function onEvent(e) {
    if (e.keyCode === 32) { // space -> main menu
        start_game();
    }
});

// Click main menu message to go to main menu
document.getElementById("clicking").addEventListener('click', function onEvent(e) {
    start_game()
}); 


// Array Sorting and filling in table

// get scores fetch
fetch("/api/topTen/scores").then(function(res) {
    if(res.status != 200) {
        console.log(res.status + " msg: " + res.value);
        return;
    }
    res.text().then(function(data) {
        console.log("recieved back" + data);
        
        var scores = JSON.parse(data);
        // Sort the array and only include the top ten scores
        scores.sort(function(a, b){return b.score - a.score});
        scores = scores.slice(0,10);

        fillTableContents(scores);
        fillTableContents([]);
    })
})




// Fill in table contents
function fillTableContents(scores) {
    var table = document.getElementById("contents"); // tbody
    scores.forEach(function(item, i) { // iterate through array (need i for rank)
        // insert a new row on end of table
        let row = table.insertRow(-1);
        // insert first cell and put in rank
        let rank = row.insertCell(0);
        rank.innerHTML = i + 1;
        // insert second cell and put in name
        let name = row.insertCell(1);
        name.innerHTML = item.userName;
        // insert third cell and put in score
        let score = row.insertCell(2);
        score.innerHTML = item.score;
        // insert fourth cell and put in date
        let date = row.insertCell(3);
        date.innerHTML = item.date;
    });
}




