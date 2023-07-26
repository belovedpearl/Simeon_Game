let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    turnNumber : 0,
    choices: ["button1", "button2", "button3", "button4"],
    lastButton: "",
    turnInProgress: false
};

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress){
                    let move = e.target.getAttribute("id");
                    game.lastButton = move
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            })
            circle.setAttribute("data-listener", "true")
        }
    }
    game.score = 0;
    showScore();
    addTurn();
}

function playerTurn(){
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong Move!")
    }
}

function addTurn(){
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random()*4))]);
    showTurns()
}

function showTurns() {
    game.turnInProgress = true 
    game.turnNumber = 0;
    let turns = setInterval(function () {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false
        }
    }, 800);
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add(circ+"light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove(circ+"light");
    }, 400);
}
function showScore() {
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };