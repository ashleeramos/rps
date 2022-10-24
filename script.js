var game = 0;
var cWins = 0;
var uWins = 0;
var roundNum = 0;
var outOf = 0;
var screen = document.getElementById("monitor");
var plays = ["r", "p", "s", "q"];

function instructions() {
  let instruct = "<p>FirstPara</p><p>SecondPara</p>";
  instruct += "<br><br> press play to start!";
  screen.innerHTML = instruct;
}

function countdown() {
  let screen = document.getElementById("monitor");
  for (let count = 3; count >= 0; count--) {
    screen.innerHTML = "<H1>" + count + "</H1>";
  }
}

function uTurn(uPlay){
  alert(uPlay);
  let cPlay = cTurn();
  let text = showRound(cPlay, uPlay)+"<br><br>";
  text += findWinner(cPlay, uPlay);
  screen.innerHTML = text;
}

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
  return "i picked " + cPlay + ". you picked " + uPlay + ".";
}

function cTurn() {
  let cNum = Math.floor(Math.random() * 3);
  let cPlay = plays[cNum];
  return cPlay;
}

/* function uTurn.old() {
  let uPlay = prompt("r,p,s?");
  return uPlay;
} */

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
    return winner + " won.\ni won " + cWins + ". you won " + uWins + ".";
  }
}

function stats() {
  if (uWins > cWins) alert("you won best out of " + outOf);
  else alert("i won best out of " + cWins + ".");
  let again = confirm("do you want to play again?")
  return again;
}