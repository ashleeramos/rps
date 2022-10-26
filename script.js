var game = 0;
var cWins = 0;
var uWins = 0;
var roundNum = 0;
var outOf = 0;
var screen = document.getElementById("screen");
var monitor = document.getElementById("monitor");
var instruct = document.getElementById("instruct");
var plays = ["r", "p", "s", "q"];
var second = 3;
var countWords = ["shoot!", "scissors", "paper", "rock"];
var playButton = document.getElementById("play");

function instructions() {
  // playButton.setAttribute("onclick", "countdown('3');");
  let instructs = "<p>FirstPara</p><p>best out of how many?</p><input type=\"text\" id=\"howMany\" name=\"games\"><br>";
  instructs += "Enter number of games and press play to start!";
  instruct.innerHTML = instructs;
}

function shoot() {
  screen.classList.add("shoot");
}

function notShoot() {
  screen.classList.remove("shoot");
}

function displayCD(count) {
  screen.innerHTML = "<H1>" + countWords[count] + "</H1>";
  notShoot();
}

var count = 3;                  //  set your counter to 1

function countdown() {
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called

    count--;                    //  increment the counter
    if (count >= 0) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 500)
}

function getScore() {
  outOf = document.getElementById("howMany").value;
  roundNum++;
  let scoreBox = document.getElementById("score");
  scoreBox.innerHTML = roundNum + " out of " + outOf;
  scoreBox.classList.add("shoot");
  countdown(3);
}

function countdown(count) {
  playButton.setAttribute("onclick", "countdown('3');");
  notShoot();
  screen.innerHTML = "<H1>" + countWords[count] + "</H1>";
  var interval = setInterval(function() {
    if (count <= 1) clearInterval(interval); //break the interval
    count--;
    if (count == 0) {
      shoot();
    }
    screen.innerHTML = "<H1>" + countWords[count] + "</H1>";
  }, 500); //time in milliseconds to wait
}

function uTurn(uPlay) {
  let cPlay = cTurn();
  let text = showRound(cPlay, uPlay) + "<br><br>";
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

/* function newGame() {
  roundNum = 0;
  game++;
  outOf = prompt("best out of?");
  while (roundNum < outOf) {
    roundNum++;
    newRound();
  }
} */

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
    alert("it's a tie!" + roundNum);
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
    return "round " + roundNum + ": " + winner + " won.\ni won " + cWins + ". you won " + uWins + ".";
  }
}

function stats() {
  if (uWins > cWins) alert("you won best out of " + outOf);
  else alert("i won best out of " + cWins + ".");
  let again = confirm("do you want to play again?")
  return again;
}