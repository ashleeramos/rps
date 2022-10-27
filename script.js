var game = 0;
var cWins = 0;
var uWins = 0;
var roundNum = 0;
var outOf = 0;

function main() {
  newGame();
  let again = stats();
  if (again == true) {
    newGame();
  }
  else alert("thank you for playing rps!");
}

function newGame() {
  let roundNum = 0;
  game++;
  outOf = prompt("best out of?");
  while (roundNum < outOf) {
    roundNum++;
    newRound();
  }
}

function newRound() {
  let cPlay = cTurn();
  let uPlay = uTurn();
  showRound(cPlay, uPlay);
  findWinner(cPlay, uPlay);
}

function showRound(cPlay, uPlay) {
  alert("i picked " + cPlay + ". you picked " + uPlay + ".");
}

function cTurn(cPlay) {
  var plays = ["r", "p", "s", "q"];
  let cNum = Math.floor(Math.random() * 3);
  cPlay = plays[cNum];
  return cPlay;
}

function uTurn() {
  let uPlay = prompt("r,p,s?");
  return uPlay;
}

function findWinner(cPlay, uPlay) {
  let i = 0;
  if (cPlay == uPlay) {
    alert("it's a tie!");
    roundNum--; // not working
  }
  else {
    let key = cPlay + uPlay;
    let winFinder = [["ps", "you"], ["sp", "i"], ["rp", "you"], ["pr", "i"], ["sr", "you"], ["rs", "i"]]
    while (i < winFinder.length) {
      if (winFinder[i][0] == key) {
        winner = winFinder[i][1];
        if (winner == "i") {
          cWins++;
        }
        else uWins++;
      }
      i++;
    }
    alert(winner + " won.\ni won " + cWins + ". you won " + uWins + ".");
    return winner;
  }
}

function stats() {
  if (uWins > cWins) alert("you won best out of " + outOf);
  else alert("i won best out of " + cWins + ".");
  let again = confirm("do you want to play again?")
  return again;
}