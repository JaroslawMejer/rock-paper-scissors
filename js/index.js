'use strict';
var PAPER = 'papier';
var ROCK = 'kamien';
var SCISSORS = 'nozyce';

var PLAYER = 'Gracz';
var REMIS = 'Remis';
var COMPUTER = 'Komputer';

var scores = {
  pc: 0,
  player: 0
};

var playerName;

//Poniżej opisuję wybór przycisków przez gracza
var elemOutput = document.querySelector('#output'); // pierwszy znaleziony
var playerResult = document.querySelector('#playerResultContainer');
var pcResult = document.querySelector('#pcResultContainer');
var result = document.querySelector('#result');
var pickRock = document.getElementById(ROCK);
var pickPaper = document.getElementById(PAPER);
var pickScissors = document.getElementById(SCISSORS);

// Nasłuchiwanie przycisków wyboru dla gracza
pickRock.addEventListener('click', function () {
    playerMove(ROCK)
});

pickPaper.addEventListener('click', function () {
    playerMove(PAPER)
});

pickScissors.addEventListener('click', function () {
    playerMove(SCISSORS)
});

// OPIS DZIAŁANIA PRZYCISKU NEWGAME

document.querySelector('#newGame_layer button')
  .addEventListener('click', function(){
    var inputEl = document.querySelector('#newGame_layer input')
    console.log('Utworzenie nowej gry', inputEl, inputEl.value)
    playerName = inputEl.value
    var gameLayer = document.querySelector('#game')
    gameLayer.style.display = 'block'
    var nameSelectLayer = document.querySelector('#newGame_layer')
    nameSelectLayer.style.display = 'none'
    document.querySelector('#new-game').style.display= 'none'
  });
document.querySelector('#new-game')
  .addEventListener('click', function(){
    var gameLayer = document.querySelector('#game')
    gameLayer.style.display = 'none'
    var nameSelectLayer = document.querySelector('#newGame_layer')
    nameSelectLayer.style.display = 'block'
    scores = {
      pc: 0,
      player: 0
    }
    elemOutput.innerHTML = ''
    playerResult.innerHTML = ''
    pcResult.innerHTML = ''
    result.innerHTML = ''
  
    result.appendChild (playerResult)
    result.appendChild (pcResult)
    document.querySelector('.dismiss')
    .style.display = 'flex'
    document.querySelector('#output')
    .style.display = 'block'
})


// Opis funkcji pcMove
function getPCMove() {
  var rand = Math.floor((Math.random() * 10) % 3);
  // 0 1 2
  switch(rand) {
    case 0: return ROCK;
    case 1: return SCISSORS;
    case 2: return PAPER;
  }
}
// OPiS FUNKCJI SPRAWDZAJĄCEJ WYNIK ROZGRYWKI
function resultOfTheGame(){
  if (scores.pc === 5){
  result.innerHTML = 'Wygrał komputer';
  document.querySelector('#new-game')
    .style.display = 'block'
  document.querySelector('.dismiss')
    .style.display = 'none'
  document.querySelector('#output')
    .style.display = 'none'
  }
  else if (scores.player === 5){
  result.innerHTML = 'Wygrał ' + playerName;
  document.querySelector('#new-game')
    .style.display = 'block'
  document.querySelector('.dismiss')
    .style.display = 'none'
  document.querySelector('#output')
    .style.display = 'none'
  }
}

// Opis funkcji playerMove
var playerMove = function(playerPick) {
  var winner = COMPUTER;
  var winnerLabel = 'Komputer'
  var pcPick = getPCMove();
  
  console.clear();
  console.log(playerPick + ' vs. ' + pcPick);
  
  if (playerPick === pcPick) {
    winner = REMIS;
    winnerLabel = REMIS;
  } else {
    // GRACZ WYGRA GDY
    if (
      (playerPick === ROCK && pcPick === SCISSORS)
      || (playerPick === SCISSORS && pcPick === PAPER)
      || (playerPick === PAPER && pcPick === ROCK)
    ) {
      winner = PLAYER;
      winnerLabel = playerName;
    }
    
  }
  
  
  console.log('winner ' + winner);
  
  elemOutput.innerHTML = 'Wygrał: ' + winnerLabel + '<br>' + playerName + ' wybrał: ' + playerPick + '<br>Komputer wybrał: ' + pcPick;
  
  if (winner === COMPUTER){
  scores.pc += 1
  }
  else if (winner === PLAYER){
    scores.player += 1
  }
  
  watchingScore();
 
  resultOfTheGame();
}

// Sprawdzanie wyniku rozrywki:

function watchingScore(){
  playerResult.innerHTML = 'Wynik gracza: ' + scores.player;
  pcResult.innerHTML = 'Wynik komputera: ' + scores.pc;
}